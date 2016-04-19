'use strict';

var Datastore = require('nedb');

export default class {
  constructor() {
    // Challanges

    this.db = {};
    this.db.challanges = new Datastore({
      filename: 'db/challanges.db',
      autoload: true
    });

    // Teams
    this.db.teams = new Datastore({
      filename: 'db/teams.db',
      autoload: true
    });

    // Results
    this.db.results = new Datastore({
      filename: 'db/results.db',
      autoload: true
    });
  }

  insertChallange(challange) {
    var module = challange.module;
    var doc = {
      parentId: (challange.parent) ? challange.parent.name : '',
      name: module.name,
      description: module.description,
      instructions: module.instructions,
      difficulty: module.difficulty,
      type: module.type
    };

    this.db.challanges.insert(doc);
  }

  getChallanges(selector) {
    return new Promise((resolve, reject) => {
      this.db.challanges.find(selector, (err, docs) => {
        if (err) {
          reject(err);
        }

        resolve(docs);
      });
    });
  }

  getAllChallanges() {
    return this.getChallanges({});
  }

  getChallangeByName(name) {
    return this.getChallanges({ name: name });
  }

  insertTeam(team) {
    var doc = {
      name: team.name,
      challange: team.challange,
      avatar: team.avatar,
      points: team.points
    };

    this.db.teams.insert(doc);
  }

  updateTeam(id, newTeam) {
    this.db.update({ _id: id }, newTeam);
  }

  getTeam(selector) {
    return new Promise((resolve, reject) => {
      this.db.teams.find(selector, (err, docs) => {
        if (err) {
          reject(err);
        }

        console.log('Found teams by ', selector);
        resolve(docs);
      });
    });
  }

  getTeamByName(name) {
    return this.getTeam({ name: name });
  }

  getTeamByChallange(challange) {
    return this.getTeam({ challange: challange });
  }

  getTeams() {
    return this.getTeam({});
  }
}
