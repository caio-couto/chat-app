const routes = require('express').Router();
const { createChannel, getAllChannels, editChannel, deleteChannel, getServerChannels, getOneChannel } = require('../controllers/channelController');

routes.get('/channel', getAllChannels);
routes.get('/channel/:id', getOneChannel);
routes.get('/channel/server/:id', getServerChannels);
routes.post('/channel', createChannel);
routes.put('/channel/:id', editChannel);
routes.delete('/channel/:id', deleteChannel);

module.exports = routes;