const express = require('express');
const routes = express.Router();

const BudgetController = require('../controller/BudgetController');
const budgetMiddleware = require('../middlewares/BudgetMiddleware');

routes.get('/budget/solicitations/:id', BudgetController.getBySolicitation);
routes.get('/budget', BudgetController.getAll);
routes.get('/budget/user', BudgetController.getByUser);
routes.get('/budget/:id', BudgetController.getById);

routes.get('/budget/status/:id', BudgetController.statusChange);

routes.post('/budget', budgetMiddleware.budgetMiddleware ,BudgetController.create);

routes.patch('/budget/:id', BudgetController.update);

module.exports = routes;
