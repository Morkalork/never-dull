'use strict';

var path = require('path');

import DatabaseManager from '../database/DatabaseManager';

function errorHandler(error) {
  console.log(' -> ERROR: ', error);
}

export default function(server, modules) {

  server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/front/views/main.html'));
  });

  server.get('/challanges', (req, res, next) => {
    var db = new DatabaseManager();
    db.getAllChallanges()
      .then(challanges => res.json(challanges))
      .catch(errorHandler);
  });

  server.get('/challange', (req, res) => {
    var db = new DatabaseManager();
    var challangeName = req.query.name;
    db.getChallangeByName(challangeName)
      .then(challange => {
        res.json(challange);
      })
      .catch(errorHandler);
  });
}
