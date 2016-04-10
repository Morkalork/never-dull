'use strict';

//var SimpleSortings = require('./plugins/SimpleSortings.js');
//var NeverDullServer = require('./server');

import SimpleSortings from './modules/SimpleSortings';
import SimpleReversing from './modules/SimpleReversing';
import NeverDullServer from './server/NeverDullServer.js';
import Challange from './helpers/Challange';

module.exports = {
  Server: NeverDullServer,
  getDefaultModules: function() {
    return {
      SimpleSortings: new SimpleSortings(),
      SimpleReversing: new SimpleReversing()
    };
  },
  buildChallange: function(module, parent, children) {
    return new Challange(module, parent, children);
  }
}
