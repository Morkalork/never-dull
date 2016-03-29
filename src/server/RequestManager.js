'use strict';

var dispatcher = require('httpdispatcher');

export default class {
  handleRequest(request, response) {
    try {
      console.log(request.url);
      dispatcher.dispatch(request, response);
    } catch (error) {
      console.error(error);
    }
  }
};
