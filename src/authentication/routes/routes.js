const express = require('express');
const routes = express.Router();

const authenticationController = require('../controller/authenticationController');

routes.post('/authentication', authenticationController.Authentication);

module.exports = routes;
