const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');

const publicPath = path.join(__dirname,'../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('New User Connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('Message Created', message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));
  });

  socket.on('disconnect', () => console.log('User Disconnected'));
});

server.listen(3000, () => {
  console.log('App started on port 3000');
});
