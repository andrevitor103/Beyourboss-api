const connection = require('../../infra/database');

class AuthenticationRepository {

    async findByEmailAndPassword(credentials)
    {
        const { email, senha } = credentials;
        const user = await connection('user')
                           .where('email', email)
                           .where('senha', senha)
                           .innerJoin('endereco', 'user.id_endereco', 'endereco.id')
                           .select('*', 'user.id as id_usuario');    
        return user;
    }
}

module.exports = new AuthenticationRepository();
