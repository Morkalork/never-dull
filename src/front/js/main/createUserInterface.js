'use strict';

var Snap = require('snapsvg');
var _ = require('lodash');

function buildConfig() {
  var mainArea = document.getElementById('main-area');
  var svgSize = mainArea.getBoundingClientRect();
  var generalSize = Math.round(svgSize.width / 20);

  return {
    challanges: null,
    svgWidth: svgSize.width,
    svgHeight: svgSize.height,
    svgCenterX: Math.round(svgSize.width / 2),
    svgCenterY: Math.round(svgSize.height / 2),
    challangeSize: generalSize,
    startSize: Math.round(svgSize.width / 15),
    fontSize: Math.round((svgSize.width / 15) / 5),
    borderWidth: 4,
    lengthBetween: Math.round(generalSize * 3),
    content: {
      start: null
    },
    elements: {
      rectangles: [],
      texts: [],
      lines: []
    }
  };
}

function reRender(snap, config) {
  snap.clear();
  var group = snap.g();
  _.forEach(config.elements.lines, line => {
    group.add(line);
  });

  _.forEach(config.elements.rectangles, rectangle => {
    group.add(rectangle);
  });

  _.forEach(config.elements.texts, text => {
    group.add(text);
  });
}

function addTextToRectangle(snap, config, rect, text, textInside) {
  var rectX = rect.getBBox().x;
  var rectY = rect.getBBox().y;
  var fontSize = config.fontSize;

  var textX = rectX + (config.borderWidth * 2);
  var textY = rectY;

  if (textInside) {
    textY += Math.round(config.startSize / 2) + (config.fontSize / 2)
  } else {
    textY += rect.getBBox().height + Math.round(config.borderWidth * 3);
  }

  var t = snap.text(textX, textY, text)
    .attr({
      'font-size': fontSize,
      'font-family': 'monospace',
      stroke: '#000'
    });

  config.elements.texts.push(t);
}

function addStartSpot(snap, config) {

  var halfSize = Math.round(config.startSize / 2);
  var rectX = config.challangeSize;
  var rectY = config.svgCenterY - halfSize;

  var start = snap.rect(rectX, rectY, config.startSize, config.startSize, 10)
    .attr({
      stroke: '#000',
      strokeWidth: 4,
      fill: '#FF0000'
    })
    .click(() => {

    });

  config.content.start = start;
  config.elements.rectangles.push(start);

  addTextToRectangle(snap, config, start, 'Start', true);
}

function addChallange(snap, config, challange, parent, startX, startY) {
  var rect = snap.rect(startX, startY, config.challangeSize, config.challangeSize)
    .attr({
      stroke: '#000',
      strokeWidth: config.borderWidth,
      fill: '#FFF'
    });

  config.elements.rectangles.push(rect);
  addTextToRectangle(snap, config, rect, challange.name);

  var lineX1 = parent.getBBox().cx;
  var lineY1 = parent.getBBox().cy;
  var lineX2 = rect.getBBox().cx;
  var lineY2 = rect.getBBox().cy;
  var line = snap.line(lineX1, lineY1, lineX2, lineY2)
    .attr({
      stroke: '#000',
      strokeWidth: 2
    });
  line.toBack();
  config.elements.lines.push(line);

  _.forEach(config.challanges, c => {
    if (c.parentId === challange.name) {
      var nextStartX = startX + config.lengthBetween;
      addChallange(snap, config, c, rect, nextStartX, startY);
    }
  });
}

function addChallanges(snap, config, challanges, parent, yLevel) {

  var standardLineLength = Math.round(config.challangeSize * 2.5);
  var parentBBox = parent.getBBox();
  _.forEach(starterChallanges, starterChallange => {
    var startX = parentBBox.x2;
    var startY = yLevel;

    addChallange(
      snap,
      config,
      starterChallange,
      parent,
      startX,
      startY);

    count++;
  });
}

module.exports = function(challanges) {
  var config = buildConfig();
  config.challanges = challanges;
  var snap = Snap('#main-area');

  addStartSpot(snap, config);

  var starterChallangesFounder = 0;
  var startY = config.content.start.getBBox().cy;
  var starterChallanges = _.filter(challanges, challange => {
    if (!challange.parentId) {
      var x = config.lengthBetween;
      var y = startY;
      if (challange === 1) y = Math.round(startY / 2);
      if (challange === 2) y = Math.round(startY / 2) + startY;

      addChallange(snap, config, challange, config.content.start, x, y);
    }
  });

  reRender(snap, config);
}
