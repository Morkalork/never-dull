'use strict';

var express = require('express');

import _ from 'lodash';
import extend from 'extend';

const PORT = 8080;

function loadModules(server, modules) {
  _.forEach(modules, module => {

    server.get('/' + module.name, module.get);
    server.post('/' + module.name, module.post);
    server.put('/' + module.name, module.put);
    server.del('/' + module.name, module.delete);
  });
}

export default class {
  constructor() {}

  start(modules) {
    if (!modules || modules.length <= 0) {
      throw new Error('No modules supplied, I cannot work without modules!');
    }

    var server = express();

    loadModules(server, modules);

    var server = server.listen(PORT, function() {
      console.log('Never dull server running...');

    })
  }
}
