const routes = require('express').Router();
const { createUser, getUser, editUser, deleteUser, newServerUser, deleteServerUser, getAllUser } = require('../controllers/userController');

routes.get('/user', getAllUser);
routes.get('/user/:id', getUser);
routes.post('/user', createUser);
routes.put('/user/:id', editUser);
routes.put('/user/newserver/:id', newServerUser);
routes.put('/user/deleteserver/:id', deleteServerUser);
routes.delete('/user/:id', deleteUser);

module.exports = routes;