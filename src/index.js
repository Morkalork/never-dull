'use strict';

//var SimpleSortings = require('./plugins/SimpleSortings.js');
//var NeverDullServer = require('./server');

import SimpleSortings from './modules/SimpleSortings';
import SimpleReversing from './modules/SimpleReversing';
import NeverDullServer from './server/NeverDullServer.js';
import Challenge from './helpers/Challenge';

module.exports = {
  Server: NeverDullServer,
  getDefaultModules: function() {
    return {
      SimpleSortings: new SimpleSortings(),
      SimpleReversing: new SimpleReversing()
    };
  },
  buildChallenge: function(module, parent, children) {
    return new Challenge(module, parent, children);
  }
}
