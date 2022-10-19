const express = require('express');
const app = express();
const path = require('path');
const port = 5000;
require('dotenv').config();
const http = require('http');
const io = require('socket.io')(http);
const db = require('./dataBase/connction');
const Chanels = require('./model/Chanel');
const UserRoutes = require('./routes/UserRoutes');
const ServerRoutes = require('./routes/ServerRoutes');
const ChanelRoutes = require('./routes/ChanelRoutes');
const MessageRoutes = require('./routes/MessageRoutes');
const cors = require('cors');

const corsOptions =
{
    origin: 'http://localhost:3000'
}

http.createServer(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors(corsOptions));

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
app.use('/', ChanelRoutes);
app.use('/', MessageRoutes);

app.listen(port, () =>
{
    console.log(`Servidor iniciado http://localhost:${port}/`);
});