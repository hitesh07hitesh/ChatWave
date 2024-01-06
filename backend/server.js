const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser");
const cors = require("cors");
const auth = require('./Router/auth')
const chat = require('./Router/chat')
const message = require('./Router/message')
const env = require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 2000

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/auth', auth)
app.use('/api/chat', chat)
app.use('/api/message', message)

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Data base  Connected'));

const server = app.listen(PORT, () => {
    console.log(`Server is runnint at http://127.0.0.1:${PORT}`)
})

const io = require('socket.io')(server, {
    pingTimeout: 6000,
    cors: {
        origin: "http://localhost:5173"
    }
})


io.on('connection', (socket) => {
    console.log('Connected to socket.io');

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User joined chat room ' + room);
    });

    // socket.on("typing", (room) => socket.in(room).emit("typing"));
    // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;

        if (!chat.users) return console.log('Chat users not defined');

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit('message recieved', newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("User Disconnected")
        socket.leave(userData._id)
    })
});
