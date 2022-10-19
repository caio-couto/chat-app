const routes = require('express').Router();
const { createChanel, getAllChanels, editChanel, deleteChanel } = require('../controllers/chanelController');

routes.get('/chanel', getAllChanels);
routes.post('/chanel', createChanel);
routes.put('/chanel/:id', editChanel);
routes.delete('/chanel/:id', deleteChanel);

module.exports = routes;