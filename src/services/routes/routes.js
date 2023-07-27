const express = require('express');

const routes = express.Router();

const CategoriesService = require('../CategoriesService');
const RankingService = require('../RankingService');
const ProfileService = require('../ProfileService');
const AvaliacaoPrestadoresService = require('../AvaliarPrestador');
const AvaliacaoContratanteService = require('../AvaliarContratante');

routes.get('/categories', CategoriesService.getCategories);
routes.get('/profile/:user', ProfileService.getProfile);
routes.get('/avaliar_contratante/:id', AvaliacaoContratanteService.listarAvaliacoes);
routes.get('/avaliar_prestador/:id', AvaliacaoPrestadoresService.listarAvaliacoes);
routes.post('/ranking', RankingService.getByIdRoute);
routes.post('/ranking', RankingService.create);
routes.post('/avaliar_prestador', AvaliacaoPrestadoresService.create);
routes.post('/avaliar_contratante', AvaliacaoContratanteService.create);

module.exports = routes;
