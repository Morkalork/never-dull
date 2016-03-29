'use strict';

import GameServer from './server/GameServer.js';

var moduleArg = process.argv[2];
var module;

switch (moduleArg) {
  case 'server':
  default:
    module = new GameServer();
}

module.start();
