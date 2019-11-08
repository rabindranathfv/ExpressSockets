const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

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
        console.log(socketData);
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

http.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`server running on port ${ port }`);

});