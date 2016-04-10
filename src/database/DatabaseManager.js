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

    // Users
    this.db.users = new Datastore({
      filename: 'db/users.db',
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
}
