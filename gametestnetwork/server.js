// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

var players = {};

const myModule = require('./playerserver');
//myModule.playerServer()

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});
// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

// Add the WebSocket handlers

io.on('connection', function(socket) 
{
    socket.on('new player', myModule.newPlayer(socket, players)); 
    
    socket.on('movement', myModule.playerMove(data, players));
});

setInterval(function() 
{
  io.sockets.emit('state', players); // Inifinite loop
}, 1000 / 60);


