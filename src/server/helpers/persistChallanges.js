'use strict';

var _ = require('lodash');

export default function(challanges, db) {
  db.getAllChallanges()
    .then(existingChallanges => {
      _.forEach(challanges, challange => {
        var exists = _.some(existingChallanges, x => {
          return x.name === challange.module.name;
        });

        if (exists) {
          console.log(' -> Challange ' + challange.module.name + ' will not be persisted, ' +
            'it already exists.');
          return;
        }

        db.insertChallange(challange);
      });
    });
}
