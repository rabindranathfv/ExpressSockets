const { io } = require('../server');

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
    socketClient.on('sendMessage', (socketData, callback) => {
        console.log(` socket data ${socketData.user} ${socketData.message}`);

        /* socketClient.broadcast.emit('sendMessage', socketData);
        console.log('despues del broadcast'); */
        if (socketData.user) {
            callback({
                ok: true,
                resp: 'process sucessfully'
            });
        } else {
            callback({
                ok: false,
                resp: 'something wrong'
            });
        }
    });
});