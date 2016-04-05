'use strict';

var random = require('random-number');

function generateNumbers() {
  var numbers = [];
  var randomOptions = {
    min: 10000,
    max: 99999,
    integer: true
  };

  for (var i = 0; i < 1000; i++) {
    numbers.push(random(randomOptions));
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

export default class {
  constructor() {
    this.numbers = generateNumbers();
  }

  get name() {
    return 'simple-sorting';
  }

  get description() {
    return '# Description\n' +
      '**Simple Sorter** is a module that will require you to sort a large set of numbers ' +
      'and return them in a nice ordered fashion.';
  }

  get instructions() {
    return '# Instructions\n' +
      'Collect the numbers from below and return them in a put request to this module.\n ' +
      'You will get a response that tells you whether you succeeded or failed. \n\n' +
      ' > ' + this.numbers.join(', ');
  }

  get difficulty() {
    return 1;
  }

  get type() {
    return 'Sorting';
  }

  get(request, response) {
    response.send(this.description() + '\n\n' + this.instructions());
  }

  post(request, response) {
    // This is the only valid request in this module
    console.log(request.body);
  }

  put(request, response) {
    response.send('I don\'t do very much...');
  }

  delete(request, response) {
    response.send('I don\'t do very much...');
  }
}
