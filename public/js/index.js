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
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('disconnect', function () {
  console.log('Disconnect to server');
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  });
});
