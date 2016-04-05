var neverDull = require('./dist/rollup/index.js');

var server = new neverDull.Server();
var modules = neverDull.getDefaultModules();
server.launch(modules);
