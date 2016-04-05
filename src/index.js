'use strict';

//var SimpleSortings = require('./plugins/SimpleSortings.js');
//var NeverDullServer = require('./server');

import SimpleSortings from './plugins/SimpleSortings';
import { NeverDullServer } from './server/index.js';

module.exports = {
  Server: NeverDullServer,
  getDefaultModules: function() {
    return [
      new SimpleSortings()
    ];
  }
}
