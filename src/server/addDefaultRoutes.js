'use strict';

var path = require('path');
var multer = require('multer');
var upload = multer(); // For multipart/form-data

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

  server.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname + '/front/views/admin.html'));
  });

  server.post('/admin/add', upload.array(), (req, res) => {
    var name = req.body.name;
    var avatar = req.body.avatar;

    var db = new DatabaseManager();
    db.insertTeam({
      name: req.body.name,
      avatar: req.body.avatar,
      challange: '',
      points: req.body.points
    });
  });

  server.get('/teams', (req, res) => {
    var db = new DatabaseManager();
    db.getTeams()
      .then(teams => {
        res.json(teams);
      })
      .catch(errorHandler);
  });

  server.get('/teams/challange', (req, res) => {
    console.log(req.body);
    var db = new DatabaseManager();
    db.getTeamByChallange(req.body.challange || '')
      .then(teams => {
        res.json(teams);
      })
      .catch(errorHandler);
  });
}
