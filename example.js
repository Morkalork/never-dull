var neverDull = require('./public/index.js');
var path = require('path');

var server = new neverDull.Server();
var defaultModules = neverDull.getDefaultModules();

var moduleNodes = [];
var simpleSortingsModuleNode = neverDull.buildModuleNode(
  defaultModules.SimpleSortings,
  null, // First module
  defaultModules.SimpleReversing);
moduleNodes.push(simpleSortingsModuleNode);

var simpleReversingModuleNode = neverDull.buildModuleNode(
  defaultModules.SimpleReversing,
  defaultModules.SimpleSortings,
  null); // Last module
moduleNodes.push(simpleReversingModuleNode);

server.launch(moduleNodes);
