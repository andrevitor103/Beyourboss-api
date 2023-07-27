const connection = require('../infra/database');
const RankingService = require('./RankingService');

class ProfileService {
    async getProfile(req, res) {
        try {
            const profile = req.params.user;
            
            const result = await connection('user')
                             .select("user.id as id_user", "user.nome", "user.foto", "user.descricao", "endereco.cep", "endereco.estado", "endereco.UF", "endereco.cidade" ,"endereco.bairro", "endereco.rua", "contato.contato", "contato.numero_contato")
                             .where("user.id", profile)
                             .innerJoin('endereco', 'endereco.id', 'id_endereco')
                             .innerJoin('contato', 'contato.id', 'id_contato');
            if (!result) {
                throw new Error("Perfil inválido");
            }
            console.log(result);
            result[0].ranking = await RankingService.getById(result[0].id_user);

            return res.status(200).json(result);

        } catch (error) {
            return res.status(400).json(error.message);
        }
    }

    async contactValidation(profile) {
        return true;
    }       

    async getById(user) {

        const result = await connection('user')
                             .select("*");
                            //  .innerJoin('endereco', 'id', 'id_endereco');
        
        return result;
    }
}

module.exports = new ProfileService();
