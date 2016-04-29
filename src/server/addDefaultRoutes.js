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

  server.get('/challenges', (req, res) => {
    var db = new DatabaseManager();
    db.getAllChallenges()
      .then(challenges => res.json(challenges))
      .catch(errorHandler);
  });

  server.get('/challenge', (req, res) => {
    var db = new DatabaseManager();
    var challengeName = req.query.name;
    db.getChallengeByName(challengeName)
      .then(challenge => {
        res.json(challenge);
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
      challenge: '',
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

  server.get('/teams/challenge', (req, res) => {
    console.log(req.body);
    var db = new DatabaseManager();
    db.getTeamByChallenge(req.body.challenge || '')
      .then(teams => {
        res.json(teams);
      })
      .catch(errorHandler);
  });
}
