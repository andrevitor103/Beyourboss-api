const express = require('express');
const routes = express.Router();

const ProfileController = require('../controller/ProfileController');

routes.get('/profile', ProfileController.getProfile);
routes.post('/profile', ProfileController.create);
routes.patch('/profile', ProfileController.actualize);
routes.patch('/profile/picture', ProfileController.pictureActulize);

module.exports = routes;
