const express = require('express');

const routes = express.Router();

const serviceSolicitationController = require('../controller/ServiceSolicitationController');
const serviceSolicitationMiddleware = require('../middlewares/ServiceSolicitationMiddleware');

routes.get('/service_solicitation', serviceSolicitationController.index);
routes.get('/service_solicitation/filter', serviceSolicitationController.indexFilter);
routes.get('/service_solicitation/budget/:id', serviceSolicitationController.getBudgetBySolicitation);
routes.get('/service_solicitation/user', serviceSolicitationController.getByUser);
routes.get('/service_solicitation/:id', serviceSolicitationController.getById);

routes.post('/service_solicitation', serviceSolicitationMiddleware.serviceSolicitationMiddleware, serviceSolicitationController.create);
routes.patch('/service_solicitation/:id', serviceSolicitationController.update);

routes.get('/service_solicitation/canceled/:id', serviceSolicitationController.statusChangeForCanceled);

module.exports = routes;
