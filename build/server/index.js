'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NeverDullServer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');

function loadModules(server, modules) {

  var upload = (0, _multer2.default)();
  server.use(_bodyParser2.default.json()); // For application/json
  server.use(_bodyParser2.default.urlencoded({ // For parsing urlencoded application
    extended: true
  }));

  _lodash2.default.forEach(modules, function (module) {
    console.log('Adding module ' + module.name);
    server.get('/' + module.name, module.get);
    server.post('/' + module.name, upload.array(), module.post);
    server.put('/' + module.name, module.put);
    server.delete('/' + module.name, module.delete);
  });
}

var NeverDullServer = exports.NeverDullServer = function () {
  function NeverDullServer(port) {
    _classCallCheck(this, NeverDullServer);

    this.port = port || 8080;
  }

  _createClass(NeverDullServer, [{
    key: 'launch',
    value: function launch(modules) {
      if (!modules || modules.length <= 0) {
        throw new Error('No modules supplied, I cannot work without modules!');
      }

      var server = express();

      loadModules(server, modules);

      var server = server.listen(this.port, function () {
        console.log('Never dull server running...');
      });
    }
  }]);

  return NeverDullServer;
}();