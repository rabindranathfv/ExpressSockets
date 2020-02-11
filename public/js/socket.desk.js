var socket = io();

var searchParams = new URLSearchParams(window.location.search);

console.log(searchParams);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('you need a desk');
}

var desk = searchParams.get('escritorio');
console.log(desk);

var title = $('h1').text('Escritorio ' + desk);
var label = $('small');

$('button').on('click', function() {
    socket.emit('recieveTicket', { desk: desk }, function(resp) {
        console.log(resp);
        if (!resp.ticketNumber) {
            label.text('no more tickets');
            alert('no more tickets');
        }
        label.text('Ticket ' + resp.ticketNumber);
    });
});