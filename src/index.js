'use strict';

//var SimpleSortings = require('./plugins/SimpleSortings.js');
//var NeverDullServer = require('./server');

import SimpleSortings from './modules/SimpleSortings';
import SimpleReversing from './modules/SimpleReversing';
import NeverDullServer from './server/NeverDullServer.js';
import ModuleNode from './helpers/ModuleNode';

module.exports = {
  Server: NeverDullServer,
  getDefaultModules: function() {
    return {
      SimpleSortings: new SimpleSortings(),
      SimpleReversing: new SimpleReversing()
    };
  },
  buildModuleNode: function(module, parent, children) {
    return new ModuleNode(module, parent, children);
  }
}
