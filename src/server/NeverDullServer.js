'use strict';

var express = require('express');
var path = require('path');

import addDefaultRoutes from './addDefaultRoutes';
import DatabaseManager from '../database/DatabaseManager';
import persistChallanges from './helpers/persistChallanges';
import loadChallanges from './helpers/loadChallanges';

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
   *  @param {object[]} challanges - An array of challanges (<- good documentation!)
   */
  launch(challanges) {
    if (!challanges || challanges.length <= 0) {
      throw new Error('No modules supplied, I cannot work without modules!');
    }

    persistChallanges(challanges, this.db);

    var server = express();
    setStaticContentPaths(server);

    addDefaultRoutes(server, challanges);

    loadChallanges(server, challanges);

    var listener = server.listen(this.port, function(e) {
      var addressInfo = listener.address();
      console.log('Never dull server running on "http://localhost:' + addressInfo.port);
    });
  }
}
