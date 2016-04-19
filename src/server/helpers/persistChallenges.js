'use strict';

var _ = require('lodash');

export default function(challenges, db) {
  db.getAllChallenges()
    .then(existingChallenges => {
      _.forEach(challenges, challenge => {
        var exists = _.some(existingChallenges, x => {
          return x.name === challenge.module.name;
        });

        if (exists) {
          console.log(' -> Challenge ' + challenge.module.name + ' will not be persisted, ' +
            'it already exists.');
          return;
        }

        db.insertChallenge(challenge);
      });
    });
}
