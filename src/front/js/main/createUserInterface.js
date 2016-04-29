'use strict';

var Snap = require('snapsvg');
var _ = require('lodash');
var marked = require('marked');
var Ajax = require('simple-ajax');

function updateUserForChallenge(snap, config, challenge, func) {
  var ajax = new Ajax({
    url: '/teams/challenge?challenge=' + challenge,
    method: 'GET'
  });

  ajax.on('success', (e, result) => {
    var teams = JSON.parse(result);
    func(teams);
  });

  ajax.send();
}

function buildConfig() {
  var mainArea = document.getElementById('main-area');
  var svgSize = mainArea.getBoundingClientRect();
  var generalSize = Math.round(svgSize.width / 20);

  return {
    challenges: null,
    svgWidth: svgSize.width,
    svgHeight: svgSize.height,
    svgCenterX: Math.round(svgSize.width / 2),
    svgCenterY: Math.round(svgSize.height / 2),
    challengeSize: generalSize,
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
  var rectX = config.challengeSize;
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

  updateUserForChallenge(snap, config, '', teams => {
    for (var i = 0; i < teams.length; i++) {
      var team = teams[i];
      console.log(team);
    }
  });
}

function addChallenge(snap, config, challenge, parent, startX, startY) {
  var rect = snap.rect(startX, startY, config.challengeSize, config.challengeSize)
    .attr({
      stroke: '#000',
      strokeWidth: config.borderWidth,
      strokeOpacity: 0.5,
      fill: '#FFF',
      fillOpacity: 0.95,
      cursor: 'pointer'
    });

  rect.hover(() => {
    rect.attr({
      strokeOpacity: 0.9,
      fillOpacity: 1
    });
  }, () => {
    rect.attr({
      strokeOpacity: 0.5,
      fillOpacity: 0.85
    });
  }).click(() => {

    document.getElementById('popup-shade').style.display = 'block';

    var popup = document.getElementById('popup');
    var rectBBox = rect.getBBox();
    popup.style.left = rectBBox.cx + "px";
    popup.style.top = rectBBox.cy + "px";
    popup.style.display = 'block';

    var urlLink = document.getElementById('popup-link');
    var url = window.location.href + challenge.name;
    url = url.replace('#', ''); // Just in case, y'know...
    urlLink.setAttribute('href', url);
    urlLink.innerHTML = url;
    document.getElementById('popup-header').innerHTML = challenge.name;
    document.getElementById('popup-description').innerHTML = marked(challenge.description);
    document.getElementById('popup-instructions').innerHTML = marked(challenge.instructions);
  });

  config.elements.rectangles.push(rect);
  addTextToRectangle(snap, config, rect, challenge.name);

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

  _.forEach(config.challenges, c => {
    if (c.parentId === challenge.name) {
      var nextStartX = startX + config.lengthBetween;
      addChallenge(snap, config, c, rect, nextStartX, startY);
    }
  });
}

function addChallenges(snap, config, challenges, parent, yLevel) {

  var standardLineLength = Math.round(config.challengeSize * 2.5);
  var parentBBox = parent.getBBox();
  _.forEach(starterChallenges, starterChallenge => {
    var startX = parentBBox.x2;
    var startY = yLevel;

    addChallenge(
      snap,
      config,
      starterChallenge,
      parent,
      startX,
      startY);

    count++;
  });
}

module.exports = function(challenges) {

  //Bind popup close link
  document.getElementById('popup-close-link').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup-shade').style.display = 'none';
  });

  var config = buildConfig();
  config.challenges = challenges;
  var snap = Snap('#main-area');

  addStartSpot(snap, config);

  var starterChallengesFounder = 0;
  var startY = config.content.start.getBBox().cy;
  var starterChallenges = _.filter(challenges, challenge => {
    if (!challenge.parentId) {
      var x = config.lengthBetween;
      var y = startY;
      if (challenge === 1) y = Math.round(startY / 2);
      if (challenge === 2) y = Math.round(startY / 2) + startY;

      addChallenge(snap, config, challenge, config.content.start, x, y);
    }
  });

  reRender(snap, config);
}
