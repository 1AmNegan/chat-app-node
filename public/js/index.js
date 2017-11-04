socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('newMessage', function (message) {
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var li = $('<li></li>');
  li.text(`${message.from}: `);
  var a = $('<a target="_blank">My current location</a>');
  a.attr('href', message.url);
  li.append(a);
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

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, function() {
    alert('Unable to ftch you location');
  });
});
