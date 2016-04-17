'use strict';

var Ajax = require('simple-ajax');
var createUserInterface = require('./createUserInterface');
var Plugins = require('../Plugins');

function loadChallanges() {
  var url = '/challanges';
  var request = new Ajax({
    url: url,
    method: 'GET',
    dataType: 'JSON',
    contentType: 'content/json'
  });

  request.on('success', (e, challanges) => {
    createUserInterface(challanges);
  });

  request.send();
}

(function() {
  Plugins();
  loadChallanges();

}());
