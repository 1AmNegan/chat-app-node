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

var messageBox = $('[name=message]');

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageBox.val()
  }, function() {
    messageBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending Location...');
  navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled').text('Send Location');
      socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, function() {
      locationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch you location');
  });
});
