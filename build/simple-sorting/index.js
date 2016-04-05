'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomNumber = require('random-number');

var _randomNumber2 = _interopRequireDefault(_randomNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function generateNumbers() {
  var numbers = [];
  var randomOptions = {
    min: 10000,
    max: 99999,
    integer: true
  };

  for (var i = 0; i < 1000; i++) {
    numbers.push((0, _randomNumber2.default)(randomOptions));
  }

  return numbers;
}

function check(possiblyCorrectAnswer, definitelyCorrectAnswer) {
  for (var i = 0; i < definitelyCorrectAnswer.length; i++) {
    if (possiblyCorrectAnswer[i] !== definitelyCorrectAnswer[i]) {
      return false;
    }
  }

  return true;
}

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.numbers = generateNumbers();
  }

  _createClass(_class, [{
    key: 'get',
    value: function get(request, response) {
      response.send('I don\'t do very much...');
    }
  }, {
    key: 'post',
    value: function post(request, response) {
      // This is the only valid request in this module
      console.log(req.body);
    }
  }, {
    key: 'put',
    value: function put(request, response) {
      response.send('I don\'t do very much...');
    }
  }, {
    key: 'delete',
    value: function _delete(request, response) {
      response.send('I don\'t do very much...');
    }
  }, {
    key: 'name',
    get: function get() {
      return 'simple-sorting';
    }
  }, {
    key: 'description',
    get: function get() {
      return '**Simple Sorter** is a module that will require you to sort a large set of numbers ' + 'and return them in a nice ordered fashion.\n' + 'Collect the numbers from below and return them in a put request to this module. ' + 'You will get a response that tells you whether you succeeded or failed. \n\n' + ' > ' + this.numbers.join(', ');
    }
  }, {
    key: 'instructions',
    get: function get() {}
  }, {
    key: 'difficulty',
    get: function get() {}
  }, {
    key: 'type',
    get: function get() {}
  }]);

  return _class;
}();

exports.default = _class;