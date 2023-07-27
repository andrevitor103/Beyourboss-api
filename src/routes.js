const express = require('express');
const routes = express.Router();

const routesUser = require('./user/routes/routes');
const routesAuthentication = require('./authentication/routes/routes');
const routesBudget = require('./budget/routes/routes');
const routesServiceSolicitation = require('./service_solicitation/routes/routes');
const routesService = require('./service/routes/routes');
const routesProfile = require('./profile/routes/routes');
const routesServices = require('./services/routes/routes');

module.exports = { routesUser, routesAuthentication, routesBudget, routesServiceSolicitation, routesService, routesProfile, routesServices };
