socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'Balaji',
  //   text: 'Hi everyone'
  // });

});

socket.on('newMessage', function (message) {
  console.log('New Message', message);
});

socket.on('disconnect', function () {
  console.log('Disconnect to server');
});
