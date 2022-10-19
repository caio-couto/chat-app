const routes = require('express').Router();
const { createServer, getAllServers, editServer, deleteServer, newUserServer, newChanelServer, deleteChanelServer, deleteUserServer } = require('../controllers/serverController');

routes.get('/server', getAllServers);
routes.post('/server', createServer);
routes.put('/server/newuser/:id', newUserServer);
routes.put('/server/newchanel/:id', newChanelServer);
routes.put('/server/deletechanel/:id', deleteChanelServer);
routes.put('/server/deleteuser/:id', deleteChanelServer);
routes.put('/server/:id', editServer);
routes.delete('/server/:id', deleteServer);

module.exports = routes;