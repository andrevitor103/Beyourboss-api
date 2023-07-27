const validation = require('../validation/BudgetValidation');
const validator = require('../../validator/validator');

async function budgetMiddleware(req, res, next)
{
    const data = req.body;
    const names = {
        'servico': 'servico', 'user': 'user', 
        'valor': 'valor', 'data_inicial': 'dataInicial', 
        'data_final': 'dataFinal', 'observacao': 'observacao'
        }
    const errors = await validator.resolve(validation.validation(), data, names);

    if(errors.length > 0) {
        return res.status(422).json(errors);
    }

    next()
}

module.exports = { budgetMiddleware };
