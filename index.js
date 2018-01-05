/**
 * Created by pawan.venugopal on 3/20/17.
 */
"use strict";

require('dotenv').config();

var Botkit= require('botkit'),
    os = require('os'),
    http = require('http'),
    request = require('request'),
    watson = require('watson-developer-cloud'),
    fs = require('fs');

var accessToken = "";
var platform = null;

if (!process.env.GLIP_CLIENT_ID || !process.env.GLIP_CLIENT_SECRET || !process.env.GLIP_PORT) {
    console.log('Error: Specify clientId clientSecret and port in environment');
    process.exit(1);
}

var controller = Botkit.glipbot({
    debug: true
}).configureGlipApp({
    clientId: process.env.GLIP_CLIENT_ID,
    clientSecret: process.env.GLIP_CLIENT_SECRET,
    redirectUri: process.env.OAUTH_REDIRECT_URI,
    apiRoot: process.env.GLIP_SERVER
});

readAccessToken()

function readAccessToken(){
  try {
    fs.accessSync('token.dat');
    accessToken = fs.readFileSync('token.dat', 'utf8');
  }catch (e) {
    accessToken = ""
  }
}

function storeAccessToken(accessToken){
  fs.writeFile('token.dat', accessToken, function(err) {
    if(err)
      console.log(err)
  })
}

var bot = controller.spawn({});

controller.setupWebserver(process.env.GLIP_PORT || 3000, function(err, webserver){
    controller.createWebhookEndpoints(webserver, bot,  function () {
        console.log("Online");
    });

    controller.createOauthEndpoints(webserver, bot, accessToken, function(err, req, res, token) {
        if(err) {
            res.status(500).send('ERROR: ' + err);
        } else {
            platform = controller.getRCPlatform();
            storeAccessToken(token);
            //res.send('Success!');
        }
    })

});

var personality_insight = watson.personality_insights({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: process.env.WATSON_URL,
    version: process.env.WATSON_VERSION,
    version_date: process.env.WATSON_VERSION_DATE
});

controller.hears(['watson: analyze'], 'message_received', function (bot,message) {

    console.log("In Hears:" + JSON.stringify(message));

    controller.getRCPlatform().get('/glip/posts',{groupId: message.channel}).then(function(history) {
        console.log("History: " + history.json());
        var messages = [];
        var data = history.json();
        for(var i=0; i < data.records.length; i++){
            messages.push(data.records[i].text);
        }

        var corpus = messages.join("\n");
        console.log(corpus);

        personality_insight.profile(
            {
                text: corpus,
                language: 'en'
            },
            function (err, response) {
                if(err){
                    console.log('error:', err)
                }else{
                    controller.startTask(bot, message, function (task, convo) {
                        var top5 = response.personality;

                        for (var c = 0; c <  top5.length; c++) {

                           convo.say('This channel has ' + Math.round(top5[c].percentile*100) + '% ' + top5[c].name);

                        }

                    })
                }
            }
        )
    });
});
