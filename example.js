var neverDull = require('./build/index.js');

var server = new neverDull.Server();
var modules = neverDull.getDefaultModules();
server.launch(modules);
