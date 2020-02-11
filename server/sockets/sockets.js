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
        let next = ticketCtrl.nextTicket();
        console.log(` new ticket ${next}`);
        callback(next);
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
    })
});