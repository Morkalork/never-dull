'use strict';

var Snap = require('snapsvg');

module.exports = function() {
  Snap.plugin(function(Snap, Element, Paper, glob) {
    var elproto = Element.prototype;
    elproto.toFront = function() {
      this.prependTo(this.paper);
    };
    elproto.toBack = function() {
      console.log(this);
      this.appendTo(this.paper);
    };
  });
}
