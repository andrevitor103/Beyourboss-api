const express = require('express');

const routes = express.Router();

const ServiceController = require('../controller/ServiceController');


routes.get('/service', ServiceController.getAll);

routes.get('/service/contratante', ServiceController.getByContractingUser);
routes.get('/service/prestador', ServiceController.getByProvideringUser);

routes.get('/service/:id', ServiceController.getById);

routes.get('/service/conclude/:id', ServiceController.concludeService);
routes.get('/service/cancel/:id', ServiceController.cancelService);

routes.post('/service', ServiceController.create);

module.exports = routes;
