'use strict';

import random from 'random-number';

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
    return '**Simple Sorter** is a module that will require you to sort a large set of numbers ' +
      'and return them in a nice ordered fashion.\n' +
      'Collect the numbers from below and return them in a put request to this module. ' +
      'You will get a response that tells you whether you succeeded or failed. \n\n' +
      ' > ' + this.numbers.join(', ');
  }

  get instructions() {}

  get difficulty() {}

  get type() {}

  get(request, response) {
    response.send('I don\'t do very much...');
  }

  post(request, response) {
    // This is the only valid request in this module
    console.log(req.body);
  }

  put(request, response) {
    response.send('I don\'t do very much...');
  }

  delete(request, response) {
    response.send('I don\'t do very much...');
  }
}
