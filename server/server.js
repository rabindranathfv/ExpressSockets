const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
module.exports.io = require('socket.io')(http);


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

require('./sockets/sockets.js');

http.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`server running on port ${ port }`);

});