'use strict';

var bodyParser = require('body-parser');
var multer = require('multer');
var _ = require('lodash');

export default function (server, challanges) {

  var upload = multer();
  server.use(bodyParser.json()); // For application/json
  server.use(bodyParser.urlencoded({ // For parsing urlencoded application
    extended: true
  }));

  _.forEach(challanges, challange => {
    var module = challange.module;
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