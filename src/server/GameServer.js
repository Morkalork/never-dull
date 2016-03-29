'use strict';

var http = require('http');
import RequestManager from './RequestManager.js';

const PORT = 8080;

export default class {
  start() {
    var requestManager = new RequestManager();
    var server = http.createServer(requestManager.handleRequest);
    server.listen(PORT, () => console.log('listening...'));
  }
}
