const validation = require('../validation/UserValidation');
const validator = require('../../validator/validator');

async function userMiddleware(req, res, next)
{
    const data = req.body;
    const names = {
            'cep': 'cep',
            'estado': 'estado',
            'uf': 'UF',
            'cidade': 'cidade',
            'bairro': 'bairro',
            'rua': 'rua',
            'email': 'email',
            'nome': 'nome',
            'nome_usuario': 'usuario',
            'senha': 'senha',
            'contato': 'nome contato',
            'numero_contato': 'numero'
        }
    const errors = await validator.resolve(validation.validation(), data, names);

    if(errors.length > 0) {
        return res.status(422).json(errors);
    }

    next()
}

module.exports = { userMiddleware };
