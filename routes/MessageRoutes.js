const routes = require('express').Router();
const { createMessage, getAllMessages, editMessage, deleteMessage, getChannelMessages } = require('../controllers/messageController');

routes.get('/message', getAllMessages);
routes.get('/message/:id', getChannelMessages);
routes.post('/message', createMessage);
routes.put('/message/:id', editMessage);
routes.delete('/message/:id', deleteMessage);

module.exports = routes;