'use strict';

var path = require('path');

export default function(server, modules) {

  server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/front/views/main.html'));
  });

  server.get('/admin', (req, res) => {

  });


}
