const routes = require('express').Router();
const { getAllServers, getOneServer, getUserServers, newChannel, newUser, createServer} = require('../controllers/serverController');

routes.get('/server', getAllServers);
routes.get('/server/:id', getOneServer);
routes.get('/server/user/:id', getUserServers);
routes.post('/server', createServer);
routes.put('/server/user/new/:id', newUser);
routes.put('/server/channel/new/:id', newChannel);

module.exports = routes;