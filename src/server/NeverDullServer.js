'use strict';

var express = require('express');

var _ = require('lodash');
var extend = require('extend');
var bodyParser = require('body-parser');
var multer = require('multer');

import buildWelcomeRoute from './buildWelcomeRoute';

function loadModules(server, moduleNodes) {

  var upload = multer();
  server.use(bodyParser.json()); // For application/json
  server.use(bodyParser.urlencoded({ // For parsing urlencoded application
    extended: true
  }));

  _.forEach(moduleNodes, moduleNode => {
    var module = moduleNode.module;
    console.log(' -> Adding module ' + module.name);

    // We need to run the VERB calls in lambdas to avoid fucking up the context.
    // Express sets the calling context to something odd when using the callback
    // and that means the context of the method call is no longer the object of the method.
    // Using a lambda expression here negates that effect.
    server.get('/' + module.name, (req, res) => module.get(req, res));
    server.post('/' + module.name, upload.array(), (req, res) => module.post(req, res));
    server.put('/' + module.name, (req, res) => module.put(req, res));
    server.delete('/' + module.name, (req, res) => module.delete(req, res));
  });
}

export default class {
  constructor(port) {
    this.port = port || 8080;
  }

  /**
   *  The start page builder is responsible for creating the start page of Never Dull
   *  @param {func} val - A function that can build a start page. Gets all modules as argument.
   */
  set startPageBuilder(val) {
    this.startPage = val;
  }

  launch(moduleNodes) {
    if (!moduleNodes || moduleNodes.length <= 0) {
      throw new Error('No modules supplied, I cannot work without modules!');
    }

    var server = express();
    buildWelcomeRoute(server, moduleNodes);
    loadModules(server, moduleNodes);

    var listener = server.listen(this.port, function(e) {
      var addressInfo = listener.address();
      console.log('Never dull server running on "http://localhost:' + addressInfo.port + '"');
    });
  }
}
