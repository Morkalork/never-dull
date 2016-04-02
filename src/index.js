'use strict';

import GameServer from './server/GameServer.js';

var server = new GameServer();

var test_modules = [{
  name: 'parse-numbers',
  get: (req, res) => { console.log('Get!'); },
  post: (req, res) => { console.log('Get!'); },
  put: (req, res) => { console.log('Get!'); },
  delete: (req, res) => { console.log('Get!'); },
}];

server.start(test_modules);
