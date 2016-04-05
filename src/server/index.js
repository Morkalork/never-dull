'use strict';

var express = require('express');

import _ from 'lodash';
import extend from 'extend';
import bodyParser from 'body-parser';
import multer from 'multer';

function loadModules(server, modules) {

  var upload = multer();
  server.use(bodyParser.json()); // For application/json
  server.use(bodyParser.urlencoded({ // For parsing urlencoded application
    extended: true
  }));

  _.forEach(modules, module => {
    console.log('Adding module ' + module.name);
    server.get('/' + module.name, module.get);
    server.post('/' + module.name, upload.array(), module.post);
    server.put('/' + module.name, module.put);
    server.delete('/' + module.name, module.delete);
  });
}

export class NeverDullServer {
  constructor(port) {
    this.port = port || 8080;
  }

  launch(modules) {
    if (!modules || modules.length <= 0) {
      throw new Error('No modules supplied, I cannot work without modules!');
    }

    var server = express();

    loadModules(server, modules);

    var server = server.listen(this.port, function() {
      console.log('Never dull server running...');
    });
  }
}
