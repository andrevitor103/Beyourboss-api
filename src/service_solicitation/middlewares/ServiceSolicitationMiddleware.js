const validation = require('../validation/ServiceSolicitationValidation');
const validator = require('../../validator/validator');

async function serviceSolicitationMiddleware(req, res, next)
{
    const data = req.body;
    const names = {
        'id_usuario': 'usuario', 'id_categoria': 'categoria', 
        'titulo': 'titulo', 'descricao': 'descricao',
        'nivel_prioridade': 'prioridade', 'valor': 'valor'
        }
    const errors = await validator.resolve(validation.validation(), data, names);

    if(errors.length > 0) {
        return res.status(422).json(errors);
    }

    next()
}

module.exports = { serviceSolicitationMiddleware };
