'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = undefined;
exports.getDefaultModules = getDefaultModules;

var _simpleSorting = require('./simple-sorting');

var _simpleSorting2 = _interopRequireDefault(_simpleSorting);

var _server = require('./server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDefaultModules() {
  return [new _simpleSorting2.default()];
}

exports.Server = _server.NeverDullServer;