const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const db = require('./dataBase/connction');

const path = require('path');
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.static(path.join(__dirname, 'public')));

if(process.env.NODE_ENV != 'development')
{
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.join(__dirname, 'client/build/index.html', (error) =>  {res.status(500).send(error)}));
    });
}

const AuthRoutes = require('./api/auth');
const UserRoutes = require('./api/user');
const ServerRoutes = require('./api/server');
const ChannelRoutes = require('./api/channel');
const MessageRoutes = require('./api/message');
const DirectRoutes = require('./api/direct');

const verifyToken = require('./middleware/verifyToken');

app.use('/api/auth/', AuthRoutes);
app.use('/api/user/', verifyToken, UserRoutes);
app.use('/api/server/', verifyToken, ServerRoutes);
app.use('/api/channel/', verifyToken, ChannelRoutes);
app.use('/api/message/', verifyToken, MessageRoutes);
app.use('/api/direct/', verifyToken, DirectRoutes);

app.get('/', (req, res) =>
{
    res.send('sucesso');
});

app.listen(port, () =>
{
    console.log(`Servidor iniciado http://localhost:${port}/`);
});