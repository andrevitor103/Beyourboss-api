const connection = require('../database/database');

class UserRepository
{
    async create(user)
    {
        const {	
            nome,
            email,
            senha,
            telefone,
            cep,
            cidade,
            uf} = user;

        const newUser = await connection('usuario').insert({ 
            nome,
            email,
            senha,
            telefone,
            cep,
            cidade,
            uf
         });
         
        return newUser;
    }

    async update(id, user)
    {
        const {	
            nome,
            email,
            senha,
            telefone,
            cep,
            cidade,
            uf} = user;
            
        const userUpdated = await connection('usuario')
            .where('id', id).
            update({
                id,
                nome,
                email,
                senha,
                telefone,
                cep,
                cidade,
                uf
            });
        return userUpdated;
    }

    async delete(id)
    {
        const user = await connection('usuario').where('id', id).delete();
        return user;
    }

    async findAll()
    {
        const users = await connection('usuario').select('*');
        return users;
    }

    async findById(id)
    {
        const user = await connection('usuario')
        .where('id', id)
        .select('*');
        
        return user;
    }

    async findByEmailAndPassword(credentials)
    {
        const { email, senha } = credentials;
        const user = await connection('usuario').where('email', email).where('senha', senha).select('*');
        return user;
    }
} 

module.exports = new UserRepository()
