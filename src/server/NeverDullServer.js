'use strict';

var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

import addDefaultRoutes from './addDefaultRoutes';
import DatabaseManager from '../database/DatabaseManager';
import persistChallenges from './helpers/persistChallenges';
import loadChallenges from './helpers/loadChallenges';

function setStaticContentPaths(server) {
  var jsPath = path.join(__dirname, '/front/js');
  var cssPath = path.join(__dirname, '/front/css');
  var assetPath = path.join(__dirname, '/front/assets');

  server.use('/js', express.static(jsPath));
  server.use('/css', express.static(cssPath));
  server.use('/assets', express.static(assetPath));
}

/**
 *  This is the main server. This will let you launch a new game with a bunch of
 *  module nodes.
 */
export default class {
  constructor(port) {
    this.port = port || 8080;
    this.db = new DatabaseManager();
  }

  /**
   *  The start page builder is responsible for creating the start page of Never Dull
   *  @param {func} val - A function that can build a start page. Gets all modules as argument.
   */
  set startPageBuilder(val) {
    this.startPage = val;
  }

  /**
   *  Launch a new game based on whatever nodes you've selected.
   *  The nodes can create multiple paths of designed correctly and may contain various
   *  paths that the consumers may chose.
   *
   *  @param {object[]} challenges - An array of challenges (<- good documentation!)
   */
  launch(challenges) {
    if (!challenges || challenges.length <= 0) {
      throw new Error('No modules supplied, I cannot work without modules!');
    }

    persistChallenges(challenges, this.db);

    var server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    setStaticContentPaths(server);

    addDefaultRoutes(server, challenges);

    loadChallenges(server, challenges);

    var listener = server.listen(this.port, function(e) {
      var addressInfo = listener.address();
      console.log('Never dull server running on "http://localhost:' + addressInfo.port);
    });
  }
}
