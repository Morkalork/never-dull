'use strict';

var Ajax = require('simple-ajax');


function getChallanges() {
  var url = '/challanges';
  var request = new Ajax({
    url: url,
    method: 'GET',
    dataType: 'JSON',
    contentType: 'content/json'
  });

  request.on('success', (e, data) => {
    console.log(e);
    console.log(data);
  });

  request.send();
}

(function() {
  getChallanges();
}());
