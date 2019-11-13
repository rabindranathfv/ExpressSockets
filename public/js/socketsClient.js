var socket = io();

socket.on('connect', () => {
    console.log('connecting at backend');
});

socket.on('disconnect', () => {
    console.log('lost connecting');
});

// emit data to server
socket.emit('sendMessage', {
    user: 'rabindranath',
    message: 'better backend everyday'
}, (resp) => {
    console.log(resp.resp);
});

// listen data from events
socket.on('sendMessageServer', (message) => {
    console.log(`info from server ${message.message}`);
});