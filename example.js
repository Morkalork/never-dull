var neverDull = require('./public/index.js');
var path = require('path');

var server = new neverDull.Server();
var defaultModules = neverDull.getDefaultModules();

var moduleNodes = [];
var simpleSortingsModuleNode = neverDull.buildChallenge(
  defaultModules.SimpleSortings,
  null // First module
);
moduleNodes.push(simpleSortingsModuleNode);

var simpleReversingModuleNode = neverDull.buildChallenge(
  defaultModules.SimpleReversing,
  defaultModules.SimpleSortings); // Last module
moduleNodes.push(simpleReversingModuleNode);

server.launch(moduleNodes);
