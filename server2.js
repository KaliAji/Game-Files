// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');var app = express();
var server = http.Server(app);
var io = socketIO(server);app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index2.html'));
});// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});
// Add the WebSocket handlers
io.on('connection', function(socket) {
});
setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);
var player1 = {};
io.on('connection', function(socket) {
  socket.on('new player', function() {
    player1[socket.id] = {
      rock:false,
      paper:false,
      scissors:false,
      score:0
    };
  });
  socket.on('choice', function(data) {
    var player = player1[socket.id] || {};
    if (data.rock) {
      player1.rock=true;
    }
    if (data.paper) {
      player1.paper = true;
    }
    if (data.scissors) {
      player1.scissors = true;
    }


    
  });
  var player2 = {};
io.on('connection', function(socket) {
  socket.on('new player', function() {
    player2[socket.id] = {
      rock:false,
      paper:false,
      scissors:false,
      score:0
    };
  });
  socket.on('choice', function(data) {
    var player = player2[socket.id] || {};
    if (data.rock) {
      player2.rock=true;
    }
    if (data.paper) {
      player2.paper = true;
    }
    if (data.scissors) {
      player2.scissors = true;
    }
  
});
  });

});
