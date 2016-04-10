var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers;

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

var _class = function () {
  function _class() {
    babelHelpers.classCallCheck(this, _class);

    this.numbers = generateNumbers();
  }

  babelHelpers.createClass(_class, [{
    key: 'get',
    value: function get(request, response) {
      response.send(this.description() + '\n\n' + this.instructions());
    }
  }, {
    key: 'post',
    value: function post(request, response) {
      // This is the only valid request in this module
      console.log(request.body);
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
      return '# Description\n' + '**Simple Sorter** is a module that will require you to sort a large set of numbers ' + 'and return them in a nice ordered fashion.';
    }
  }, {
    key: 'instructions',
    get: function get() {
      return '# Instructions\n' + 'Collect the numbers from below and return them in a put request to this module.\n ' + 'You will get a response that tells you whether you succeeded or failed. \n\n' + ' > ' + this.numbers.join(', ');
    }
  }, {
    key: 'difficulty',
    get: function get() {
      return 1;
    }
  }, {
    key: 'type',
    get: function get() {
      return 'Sorting';
    }
  }]);
  return _class;
}();

var random$1 = require('random-number');

var words = ['cat', 'dog', 'hamster', 'pie', 'must', 'take', 'the', 'lotion', 'and', 'put', 'it', 'in', 'the', 'basket', 'where', 'does', 'death', 'defecate', 'maybee', 'in', 'silence', 'haha', 'whales', 'are', 'evil', 'but', 'oppressed', 'beings', 'though', 'giant', 'sea', 'buddhas', 'wohoo', 'whence', 'fence', 'rince', 'chins', 'chipmunk', 'buttock', 'testing', 'patiance', 'now', 'live'];

function createRandomString() {
  var bigString = '';
  var tmpWords = words.slice();
  while (tmpWords.length) {
    var i = random$1({
      min: 0,
      max: words.length,
      integer: true
    });
    var word = tmpWords.splice(i, 1);
    bigString += word;
  }

  return bigString;
}

function check$1(answer, correct) {
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

var _class$1 = function () {
  function _class() {
    babelHelpers.classCallCheck(this, _class);

    this.bigString = createRandomString();
  }

  /****************************************
   *  PROPERTIES
   ***************************************/

  /** 
   *    @type   {string}    The name of the plugin, used as REST base (such as http://localhost/never-dull/NAME)
   */


  babelHelpers.createClass(_class, [{
    key: 'get',


    /****************************************
     *  METHODS
     ***************************************/

    /**
     *    Handle get requests
     *
     *    @param {object} request - A http request object with the player data
     *    @param {object} response - A http response object to communicate back to the player
     */
    value: function get(request, response) {
      response.send(this.description + '\n\n' + this.instructions);
    }

    /**
     *    Handle post requests
     *
     *    @param {object} request - A http request object with the player data
     *    @param {object} response - A http response object to communicate back to the player
     */

  }, {
    key: 'post',
    value: function post(request, response) {
      if (request.body.answer) {
        if (check$1(request.body.answer, this.bigString)) {
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

  }, {
    key: 'put',
    value: function put(request, response) {
      response.send('I don\'t do very much...');
    }

    /**
     *    Handle delete requests
     *
     *    @param {object} request - A http request object with the player data
     *    @param {object} response - A http response object to communicate back to the player
     */

  }, {
    key: 'delete',
    value: function _delete(request, response) {
      response.send('I don\'t do very much...');
    }
  }, {
    key: 'name',
    get: function get() {
      return 'simple-reversing';
    }

    /**
     *    @type   {string}    The description for the plugin
     */

  }, {
    key: 'description',
    get: function get() {
      return '# Description\n' + '**Simple Reversing** is a module that will require you to reverse a string and ' + 'return it.';
    }

    /**
     *    @type   {string}    Instructions for this plugin, can use line break (\n) and markdown
     */

  }, {
    key: 'instructions',
    get: function get() {
      return '# Instructions\n' + 'Take the string below and return it in completely reverse order (as in ABC becomes CBA).\n' + ' > ' + this.bigString + '\n' + 'The string must be returned as a POST request with **one** key/value pair: answer=YOURANSWER';
    }

    /**
     *    @type   {int}   The difficulty level of the challange on a scale of 1 to 10. 
     *    Novice=1, Beginner=2, Basic=3, Medium=4, Hard=5, Tough=6, Very Hard=7, Insane=8, Extreme=9, Impossible=10
     */

  }, {
    key: 'difficulty',
    get: function get() {
      return 1;
    }

    /**
     *    @type   {string[]}  An array of (thought through) types to further describe this challange
     *    ex. Mathematical, String Parsing, Logical, Brute Force, Encoding, Graph Theory, etc
     */

  }, {
    key: 'type',
    get: function get() {
      return 'Sorting';
    }
  }]);
  return _class;
}();

var path$1 = require('path');

function addDefaultRoutes (server, modules) {

  server.get('/', function (req, res) {
    res.sendFile(path$1.join(__dirname + '/front/views/main.html'));
  });

  server.get('/admin', function (req, res) {});
}

var express = require('express');
var path = require('path');

var _ = require('lodash');
var extend = require('extend');
var bodyParser = require('body-parser');
var multer = require('multer');

function loadModules(server, moduleNodes) {

  var upload = multer();
  server.use(bodyParser.json()); // For application/json
  server.use(bodyParser.urlencoded({ // For parsing urlencoded application
    extended: true
  }));

  _.forEach(moduleNodes, function (moduleNode) {
    var module = moduleNode.module;
    console.log(' -> Adding module ' + module.name);

    // We need to run the VERB calls in lambdas to avoid fucking up the context.
    // Express sets the calling context to something odd when using the callback
    // and that means the context of the method call is no longer the object of the method.
    // Using a lambda expression here negates that effect.
    server.get('/' + module.name, function (req, res) {
      return module.get(req, res);
    });
    server.post('/' + module.name, upload.array(), function (req, res) {
      return module.post(req, res);
    });
    server.put('/' + module.name, function (req, res) {
      return module.put(req, res);
    });
    server.delete('/' + module.name, function (req, res) {
      return module.delete(req, res);
    });
  });
}

function setStaticContentPaths(server) {
  var jsPath = path.join(__dirname, '/front/js');
  var cssPath = path.join(__dirname, '/front/css');
  var image = path.join(__dirname, '/front/image');

  server.use('/js', express.static(jsPath));
  server.use('/css', express.static(jsPath));
  server.use('/images', express.static(jsPath));
}

/**
 *  This is the main server. This will let you launch a new game with a bunch of
 *  module nodes.
 */

var _class$2 = function () {
  function _class(port) {
    babelHelpers.classCallCheck(this, _class);

    this.port = port || 8080;
  }

  /**
   *  The start page builder is responsible for creating the start page of Never Dull
   *  @param {func} val - A function that can build a start page. Gets all modules as argument.
   */


  babelHelpers.createClass(_class, [{
    key: 'launch',


    /**
     *  Launch a new game based on whatever nodes you've selected.
     *  The nodes can create multiple paths of designed correctly and may contain various
     *  paths that the consumers may chose.
     *
     *  @param {object[]} moduleNodes - An array of module nodes
     */
    value: function launch(moduleNodes) {
      if (!moduleNodes || moduleNodes.length <= 0) {
        throw new Error('No modules supplied, I cannot work without modules!');
      }

      var server = express();
      setStaticContentPaths(server);

      addDefaultRoutes(server, moduleNodes);
      loadModules(server, moduleNodes);

      var listener = server.listen(this.port, function (e) {
        var addressInfo = listener.address();
        console.log('Never dull server running on "http://localhost:' + addressInfo.port);
      });
    }
  }, {
    key: 'startPageBuilder',
    set: function set(val) {
      this.startPage = val;
    }
  }]);
  return _class;
}();

/**
 *	This class represents a node in the module cluster. 
 */

var _class$3 =
/**
 *	Create a module node
 *
 *	@param {object} module - A Never Dull (ND) module
 *	@param {object} parent - The parent ND module to which this node comes from. It set to
 *	null this node will be considered a starting node.
 *	@param {object[]} children - An array of ND modules to which a successful player
 *	can move after completing the node module.
 */
function _class(module, parent, children) {
  babelHelpers.classCallCheck(this, _class);

  this.module = module;
  this.parent = parent;
  this.children = children;
};

module.exports = {
  Server: _class$2,
  getDefaultModules: function getDefaultModules() {
    return {
      SimpleSortings: new _class(),
      SimpleReversing: new _class$1()
    };
  },
  buildModuleNode: function buildModuleNode(module, parent, children) {
    return new _class$3(module, parent, children);
  }
};