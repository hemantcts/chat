const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: true
});

const PORT = 5000;

app.use(cors());

io.on('connection', (socket) => {
    socket.on('join room', (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`);
    });

    socket.on('chat-message', ({ room, message }) => {
        console.log(message, room)
        socket.to(room).emit('chat-message', message);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
