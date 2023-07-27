const jwt = require('jsonwebtoken');
const { AuthenticationModel } = require('../model/authenticationModel');
const userRepository = require('../../user/repository/UserRepository');

function tokenGenerate(user) {
    const payload = { id: user.id };
    const token = jwt.sign(payload, "0e5946cf15261bd704b42d86c2a59ff6  -");
    return `Bearer ${token}`;
}

class AuthenticationController {

    async Authentication(request, response)
    {
        /**
         * Deve receber email e senha, validar se existe no banco e gerar token jwt
         */
        try {
            const authenticationModel = new AuthenticationModel(userRepository);
            const user  = request.body;
            const currentUser = await authenticationModel.findByEmailAndPassword(user);
            const token = tokenGenerate(currentUser);
            await userRepository.ativar(currentUser?.id_usuario);

            return response.status(202).json({ user: currentUser, token: token });
        } catch (error) {
            return response.status(401).json(error.message);
        }
    }
}

module.exports = new AuthenticationController();
