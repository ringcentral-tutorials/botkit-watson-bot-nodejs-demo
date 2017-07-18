/**
 * Created by pawan.venugopal on 3/20/17.
 */
"use strict";

require('dotenv').config();

var Botkit= require('botkit'),
    os = require('os'),
    http = require('http'),
    request = require('request'),
    watson = require('watson-developer-cloud');

var controller = Botkit.glipbot({
    debug: false
});

var bot = controller.spawn({
    server: process.env.GLIP_SERVER,
    appKey: process.env.GLIP_APPKEY,
    appSecret: process.env.GLIP_APPSECRET,
    username: process.env.GLIP_USERNAME,
    password: process.env.GLIP_PASSWORD,
    extension: process.env.GLIP_EXTENSION
}).startRTM();

controller.setupWebserver(process.env.port || 3000, function(err, webserver){

    if(!err){
        console.log('error' + err);
    }

    webserver.get('/', function (req ,res) {
        res.send(':)');
    });


    controller.createWebhookEndpoints(webserver, bot);

});

var personality_insight = watson.personality_insights({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: process.env.WATSON_URL,
    version_date:process.env.WATSON_VERSION_DATE,
    version: process.env.WATSON_VERSION
});

controller.hears(['watson'], 'message_received', function (bot, message) {
    bot.reply(message, "hi, this is watson, How can I help you ? ");
});

controller.hears(['analyze'], 'message_received', function (bot,message) {
    bot.api.posts().get({groupId: message.channel}).then(function(history) {

        var messages = [];
        for(var i=0; i < history.records.length; i++){
            messages.push(history.records[i].text);
        }

        var corpus = messages.join("\n");

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

