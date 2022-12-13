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
const Channel = require('./model/Channel');
const User = require('./model/User');
const ServerClient = require('./model/Server');


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
    socket.on('user', ({user}) =>
    {
        console.log(user);
    });
    socket.on('disconnect', async () =>
    {
        console.log(`${socket.id} disconectado`);
    });
    socket.on('join-room', async ({locate}) =>
    {
        socket.join(locate);
        const history = await Message.find().where({channel: locate}).populate('sender');
        io.of(socket.nsp.name.split('/')[1]).to(locate).emit('history', history);
        io.of(socket.nsp.name.split('/')[1]).to(locate).emit('room-connection', `usuário ${socket.id}, conectado a room ${locate} rooms totais ${JSON.stringify(socket.rooms)}`);
        console.log(socket.rooms);
    });
    socket.on('add-server-user', (directs, serverId, serverName, sender) =>
    {
        directs.forEach( async (direct) =>
        {
            const saveMessage = await (await Message.create({content: 'Convite', sender, channel: direct, isInvite: true, inviteInfo: {serverId, serverName}})).populate('sender');
            const senderName = {name:saveMessage.sender.name};
            io.of('direct').to(direct).emit('server-message', {content: 'Convite', inviteInfo: {serverId, serverName}, sender:senderName, channel: direct, isInvite: true});
        });
    });
    socket.on('client-message', async ({content, sender, channel}) =>
    {
        const saveMessage = await (await Message.create({content, sender, channel})).populate('sender');
        const senderName = {name:saveMessage.sender.name};
        io.of(socket.nsp.name.split('/')[1]).to(channel).emit('server-message', {content, sender:senderName , channel})
    });
    socket.on('delete-message', async ({messageId, locate }) =>
    {
        const deleteMessage = await Message.findByIdAndDelete(messageId);
        const history = await Message.find().where({channel: locate}).populate('sender');
        io.of(socket.nsp.name.split('/')[1]).to(locate).emit('history', history);
    });
    socket.on('user-acepted', (serverId, user) =>
    {
        io.of(serverId).emit('new-user', user);
    });
    socket.on('new-channel', async ({newChannel}) =>
    {
        io.of(socket.nsp.name.split('/')[1]).emit('new-channel', {newChannel});
    })
});

server.listen(port, () =>
{
    console.log(`Servidor iniciado http://localhost:${port}/`);
});


