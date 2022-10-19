const routes = require('express').Router();
const { createMessage, getAllMessages, editMessage, deleteMessage } = require('../controllers/messageController');

routes.get('/message', getAllMessages);
routes.post('/message', createMessage);
routes.put('/message/:id', editMessage);
routes.delete('/message/:id', deleteMessage);

module.exports = routes;