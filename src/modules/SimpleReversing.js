'use strict';

var random = require('random-number');

const words = ['cat', 'dog', 'hamster', 'pie', 'must', 'take', 'the', 'lotion', 'and', 'put',
  'it', 'in', 'the', 'basket', 'where', 'does', 'death', 'defecate', 'maybee', 'in', 'silence', 'haha',
  'whales', 'are', 'evil', 'but', 'oppressed', 'beings', 'though', 'giant', 'sea', 'buddhas', 'wohoo',
  'whence', 'fence', 'rince', 'chins', 'chipmunk', 'buttock', 'testing', 'patiance', 'now', 'live'
];

function createRandomString() {
  var bigString = '';
  var tmpWords = words.slice();
  while (tmpWords.length) {
    var i = random({
      min: 0,
      max: words.length,
      integer: true
    });
    var word = tmpWords.splice(i, 1);
    bigString += word;
  }

  return bigString;
}

function check(answer, correct) {
  var j = 0;
  for (var i = correct.length - 1; i >= 0; i--) {
    var answerChar = answer[j];
    var correctChar = correct[i];
    if (answerChar !== correctChar) {
      return false;
    }
    j++;
  }

  return true;
}

/**
 *  This module is only meant to be a template for new modules. Feel free to copy it
 *  and use it as a template.
 */
export default class {
  constructor() {
    this.bigString = createRandomString();
  }

  /****************************************
   *  PROPERTIES
   ***************************************/

  /** 
   *    @type   {string}    The name of the plugin, used as REST base (such as http://localhost/never-dull/NAME)
   */
  get name() {
    return 'simple-reversing';
  }

  /**
   *    @type   {string}    The description for the plugin
   */
  get description() {
    return '# Description\n' +
      '**Simple Reversing** is a module that will require you to reverse a string and ' +
      'return it.';
  }

  /**
   *    @type   {string}    Instructions for this plugin, can use line break (\n) and markdown
   */
  get instructions() {
    return '# Instructions\n' +
      'Take the string below and return it in completely reverse order (as in ABC becomes CBA).\n' +
      ' > ' + this.bigString + '\r\n' + '\n  ' +
      'The string must be returned as a POST request with **one** key/value pair: answer=YOURANSWER';
  }

  /**
   *    @type   {int}   The difficulty level of the challange on a scale of 1 to 10. 
   *    Novice=1, Beginner=2, Basic=3, Medium=4, Hard=5, Tough=6, Very Hard=7, Insane=8, Extreme=9, Impossible=10
   */
  get difficulty() {
    return 1;
  }

  /**
   *    @type   {string[]}  An array of (thought through) types to further describe this challange
   *    ex. Mathematical, String Parsing, Logical, Brute Force, Encoding, Graph Theory, etc
   */
  get type() {
    return 'Sorting';
  }


  /****************************************
   *  METHODS
   ***************************************/

  /**
   *    Handle get requests
   *
   *    @param {object} request - A http request object with the player data
   *    @param {object} response - A http response object to communicate back to the player
   */
  get(request, response) {
    response.send(this.description + '\n\n' + this.instructions);
  }


  /**
   *    Handle post requests
   *
   *    @param {object} request - A http request object with the player data
   *    @param {object} response - A http response object to communicate back to the player
   */
  post(request, response) {
    if (request.body.answer) {
      if (check(request.body.answer, this.bigString)) {
        response.send('CORRECT! By the gods, you are favored!');
      } else {
        response.send('WRONG! Your answer is not correct.');
      }
    } else {
      response.send('You failed, no answer was presented!!');
    }
  }


  /**
   *    Handle put requests
   *
   *    @param {object} request - A http request object with the player data
   *    @param {object} response - A http response object to communicate back to the player
   */
  put(request, response) {
    response.send('I don\'t do very much...');
  }


  /**
   *    Handle delete requests
   *
   *    @param {object} request - A http request object with the player data
   *    @param {object} response - A http response object to communicate back to the player
   */
  delete(request, response) {
    response.send('I don\'t do very much...');
  }

}
