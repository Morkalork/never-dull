'use strict';

var Ajax = require('simple-ajax');

function loadTeams() {
  var ajax = new Ajax({
    url: '/teams',
    method: 'GET'
  });

  ajax.on('success', (e, data) => {
    var teams = JSON.parse(data);
    var scoreBoard = document.getElementById('scoreboard');
    scoreBoard.innerHTML = '';
    for (var i = 0; i < teams.length; i++) {
      var team = teams[i];
      var li = document.createElement('li');
      li.innerHTML = team.name + ', ' + team.points + ' points';

      scoreBoard.appendChild(li);
    }
  });

  ajax.send();
}

function saveTeam() {
  var name = document.getElementById('add-team-name').value;
  var avatar = document.getElementById('add-team-avatar').value;

  var data = {
    name: name,
    avatar: avatar,
    points: 0
  };

  var ajax = new Ajax({
    url: '/admin/add',
    method: 'POST',
    data: JSON.stringify(data)
  });

  ajax.on('success', e => {
    document.getElementById('add-team-name').value = '';
    document.getElementById('add-team-avatar').value = '';
    loadTeams();
  });

  ajax.send();
}

function bindButtons() {
  document
    .getElementById('add-team-name-submit')
    .addEventListener('click', () => {
      saveTeam();
    });
}

function init() {
  bindButtons();
  loadTeams();
}

(function() {
  init();
}());
