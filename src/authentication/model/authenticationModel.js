const AuthenticationRepository = require('../repository/AuthenticationRepository');
const {} = require('../model/exception/ErrorCredentials');
const { NotFoundException  } = require('./exception/NotFoundException');
class AuthenticationModel {
    
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async findByEmailAndPassword(user)
    {
        const { email, senha } = user;
        
        if(!email || !senha)
        {
            throw new ErrorCredentials('Email e senha devem ser passados');
        }

        const userExist = await AuthenticationRepository.findByEmailAndPassword(user);
        
        if(userExist.length <= 0)
        {
            throw new NotFoundException('Erro usuário não existe');
        }
        return userExist[0];
    }
}

module.exports = { AuthenticationModel };
