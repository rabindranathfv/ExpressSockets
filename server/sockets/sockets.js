const { io } = require('../server');
const { TicketCtrl } = require('../controllers/ticket.ctrl');

let ticketCtrl = new TicketCtrl();

io.on('connection', function(socketClient) {
    console.log('a user connected');

    socketClient.emit('sendMessageServer', {
        user: 'admin',
        message: 'administrador conectado'
    });

    socketClient.on('disconnect', () => {
        console.log('a user disconnected')
    });

    // listen client
    socketClient.on('nextTicket', (socketData, callback) => {
        let nextTck = ticketCtrl.nextTicket();
        console.log(` new ticket ${next}`);
        callback(nextTck);
    });

    socketClient.emit('currentState', {
        ticketId: ticketCtrl.getLastTicket(),
        currentTicket: `Ticket ${ticketCtrl.getLastTicket()}`,
        latestTickets: ticketCtrl.getlatestTickets()
    });

    socketClient.on('recieveTicket', (socketData, callback) => {
        console.log('socket event recieveTicket', socketData);
        if (!socketData.desk) {
            return callback({
                err: true,
                message: 'the desk is mandatory'
            });
        }

        let grabTicket = ticketCtrl.takeTicket(socketData.desk);
        callback(grabTicket);

        // you can use emit in (1)
        socketClient.broadcast.emit('latestTickets', {
            currentTicket: `Ticket ${ticketCtrl.getLastTicket()}`,
            latestTickets: ticketCtrl.getlatestTickets()
        });

    });

    // this (1) work the same instead using with broadcast
    // socketClient.emit('latestTickets', {
    //     currentTicket: `Ticket ${ticketCtrl.getLastTicket()}`,
    //     latestTickets: ticketCtrl.getlatestTickets()
    // });

});