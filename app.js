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
const { use } = require('./routes/UserRoutes');


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


io.of(/^\/\w+$/).on('connection', (socket) =>
{
    console.log(socket.id);
    socket.on('join-room', async(roomName) =>
    {
        socket.rooms.forEach((room) =>
        {
            socket.leave(room)
        });
        socket.join(roomName);
        const history = await Message.find().where(roomName);
        io.of(socket.nsp.name.split('/')[1]).to(roomName).emit('history', history);
    });
    socket.on('client-message', async ({content, sender, channel}) =>
    {
        const saveMessage = await (await Message.create({content, sender, channel})).populate('sender');
        const senderName = {name:saveMessage.sender.name};
        io.of(socket.nsp.name.split('/')[1]).to(channel).emit('server-message', {content, sender:senderName , channel})
    });
    socket.on('delete-message', async ({ messageId }) =>
    {
        const deleteMessage = await Message.findByIdAndDelete(messageId);
    });
});

server.listen(port, () =>
{
    console.log(`Servidor iniciado http://localhost:${port}/`);
});


