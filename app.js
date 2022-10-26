const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const Message = require('./model/Message');

require('dotenv').config();

const db = require('./dataBase/connction');

const UserRoutes = require('./routes/UserRoutes');
const ServerRoutes = require('./routes/ServerRoutes');
const ChannelRoutes = require('./routes/ChannelRoutes');
const MessageRoutes = require('./routes/MessageRoutes');

const path = require('path');
const port = 5000;
const cors = require('cors');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const io = new Server(server, 
{
    cors: 
    {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


if(process.env.NODE_ENV != 'development')
{
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.join(__dirname, 'client/build/index.html', (error) =>  {res.status(500).send(error)}));
    });
}

app.get('/', (req, res) =>
{
    res.send('sucesso');
});

app.use('/', UserRoutes);
app.use('/', ServerRoutes);
app.use('/', ChannelRoutes);
app.use('/', MessageRoutes);

/* io.on('connection', (socket) =>
{
    console.log('usuário conectado');
    io.emit('welcome', 'hello this is websocket')
}); */


const channel = io.of(/^\/\w+$/).on("connection", (socket) =>
{
    console.log(`usuário conectado: ${socket.id}, canal: ${socket.nsp.name}`);
    socket.on('chat-msg', async (msg) =>
    {
        const message = await Message.create(msg);
        const savedMessage = await Message.find().where({_id: message._id}).populate('sender');
        channel.emit('chat-msg', savedMessage);
    });
    socket.on('all-messages-channel', () =>
    {   
        channel.emit('chat-msg', allMessages1);
    });
    socket.on('nickname', (nickName) =>
    {
        channel.emit('chat-msg', `Usuário ${nickName} conectou.`);
        socket.nickName = nickName;
    });
    socket.on('status', (status) =>
    {
        socket.broadcast.emit('status', status);
    });
});

server.listen(port, () =>
{
    console.log(`Servidor iniciado http://localhost:${port}/`);
});


