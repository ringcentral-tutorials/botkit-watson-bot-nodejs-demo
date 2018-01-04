[![Build Status](https://travis-ci.org/pkvenu/botkit-watson-bot.svg?branch=master)](https://travis-ci.org/pkvenu/botkit-watson-bot)
[![Code Climate](https://img.shields.io/codeclimate/github/pkvenu/botkit-watson-bot.svg)](https://codeclimate.com/github/pkvenu/botkit-watson-bot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/pkvenu/botkit-watson-bot/blob/master/License)

# botkit-watson-bot

`botkit-watson-bot` allows you to analyze user's personality insights within Glip Team using [Botkit](https://www.github.com/howdyai/botkit) and IBM Watson.

It takes advantage of Botkit's core functionality thus allowing you to create complex conversational flows via a simple interface. It also allows you to use [custom storage methods/systems](https://github.com/howdyai/botkit/blob/master/readme.md#storing-information) to enable data persistence across sessions.

#### What is Botkit?

Here's an excerpt of Botkit's `readme.md` file:

> [[Botkit](https://www.github.com/howdyai/botkit)] provides a semantic interface to sending and receiving messages so that developers can focus on creating novel applications and experiences instead of dealing with API endpoints.

#### What is Watson Personality Insight?
[Personality Insights](https://personality-insights-livedemo.mybluemix.net/) is a service provided by IBM Watson which applies linguistic analytics and personality theory to infer attributes from a person's unstructered text.

## Installation

```bash
$ git clone https://github.com/ringcentral-tutorials/botkit-watson-bot-nodejs-demo.git
$ cd <APP_DIRECTORY>
$ npm install --save
$ mv .env.template .env
```

## Config
Update **.env** file with the credentails for the below properties:
```
GLIP_SERVER=https://platform.devtest.ringcentral.com
GLIP_CLIENT_ID=
GLIP_CLIENT_SECRET=
OAUTH_REDIRECT_URI=https://47b0d581.ngrok.io
GLIP_PORT=4000
WATSON_USERNAME=
WATSON_PASSWORD=
WATSON_URL=https://gateway.watsonplatform.net/personality-insights/api
WATSON_VERSION_DATE=2016-10-19
WATSON_VERSION=v3
```

## Run
```
$ npm start
```

## Usage
In the chat window enter the below command:
```
watson: analyze
```

**Note:** The Team should have 2000 charecthers minimum to perform Personality Insight Analysis.

## Reference

Please see `botkit`'s guide and reference document [here](https://github.com/howdyai/botkit/blob/master/readme.md#developing-with-botkit).


## Contributing

#### Bug Reports & Feature Requests

Something does not work as expected or perhaps you think this module needs a feature? Please [open an issue](https://github.com/ringcentral-tutorials/botkit-watson-bot-nodejs-demo/issues/new) using GitHub's [issue tracker](https://github.com/ringcentral-tutorials/botkit-watson-bot-nodejs-demo/issues). Please be as specific and straightforward as possible.

#### Developing

Pull Requests (PRs) are welcome. Make sure you follow the same basic stylistic conventions as the original code (i.e. ["JavaScript standard code style"](http://standardjs.com)). Your changes must be concise and focus on solving a single problem.

## License

[The MIT License (MIT)](http://opensource.org/licenses/MIT)

Copyright (c) 2016
