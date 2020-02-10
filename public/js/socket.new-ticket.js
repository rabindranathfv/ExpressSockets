var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connection', function() {
    console.log('connecting to server');
});

socket.on('disconnect', function() {
    console.log('disconnecting to server');
});

socket.on('currentState', function(data) {
    console.log('grab currentState');
    console.log('data from socket', data.currentTicket);
    label.text(data.currentTicket);
});

$('button').on('click', function() {
    console.log('generate a new ticket');
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });
});