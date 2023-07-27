const express = require('express');
const routes = express.Router();

const UserController = require('../controller/UserController');
const userMiddleware = require('../middlewares/UserMiddleware');

routes.get('/usuario/user/inativar', UserController.inativar);
routes.get('/usuario/user', UserController.getByUser);
routes.post('/usuario/update', UserController.update);
routes.post('/usuario', userMiddleware.userMiddleware ,UserController.create);
// routes.delete('/usuario', UserController.delete);

module.exports = routes;
