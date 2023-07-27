const connection = require('../../infra/database');

class UserRepository {
    async insert(user) {
        try {
            
            const {
                nome,
                nome_usuario,
                email,
                senha,
                endereco,
                contato
            } = user;

            const result = await connection('user').insert({
                'nome': nome,
                'nome_usuario': nome,
                'email': email,
                'senha': senha,
                'id_endereco': endereco,
                'id_contato': contato,
                'foto': "https://i.pinimg.com/originals/3c/14/71/3c147108b75f74b3eae82639f2a0e15b.jpg"
            });

            return result;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update( id, user ) {
        console.log(user);
        const {
            nome,
            nome_usuario,
            email,
            senha,
            id_endereco,
            id_contato
        } = user;

        return await connection('user').where('id', id).update({
            nome,
            nome_usuario,
            email,
            senha,
            id_endereco,
            id_contato
        });
    }

    async inativar( user ) {
        
        return await connection('user').where('id', user).update({
            inativo: new Date()
        });
    }

    async ativar( user ) {
        console.log("ativando conta... " + user);
        return await connection('user').where('id', user).update({
            inativo: null
        });
    }

    async findById(id) {
        return await connection('user').select('*', 'contato.contato as nome_contato', 'user.id as id_user')
                            .where('user.id', id)
                            .innerJoin('endereco', 'user.id_endereco', 'endereco.id')
                            .innerJoin('contato', 'user.id_contato', 'contato.id');
    }

//     async findAllAndPaginate(limit, pageCurrent) {
//         try {
//             const [count] = await connection('service_solicitation').count();
            
//             const solicitations = await connection('service_solicitation')
//                 .limit(limit)
//                 .offset((pageCurrent-1)*limit)
//                 .select("*");

//             const recordsTotal = count['count(*)'];

//           return {'total_registros': recordsTotal, 'registros': solicitations};  
//         } catch (error) {
//            throw new Error(error.message);    
//          }
        
//     }
}

module.exports = new UserRepository();
