const connection = require('../infra/database');

class RankingService {
    async create(req, res) {
        try {
            const ranking = req.body;
            const isValid = await this.rankingValidation(ranking);
        
            if (!isValid) {
                throw new Error("Ranking inválido");
            }
            const contactRecord = await this.rankingValidation(ranking);
            return res.status(200).json("Avaliação registrada com sucesso");

        } catch (error) {
            return res.status(400).json({ "erro": "erro ao registrar ranking" });
        }
    }

    async rankingValidation(ranking) {
        return true;
    }

    async rankingValidation(ranking) {

        const result = await connection('contato').insert({
            'ranking': ranking.ranking,
            'id_service': ranking.id_service
        });
        
        return result;
    }

    async getByIdRoute(req, res) {
        try {
            const user = req.body;

            const id = user.id_prestador;
            let result = await connection('ranking')
            .select("id_prestador")
            .avg("ranking as ranking")
            .innerJoin('services', 'services.id', 'ranking.id_service')
            .groupBy('services.id_prestador')
            .where('services.id_prestador', id);

            if(result.length) {
                result[0].ranking = Math.round(result[0].ranking);
            }
            
            return res.status(200).json(result ?? 0);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }

    async getById(user) {
        const id = user;
        let result = await connection('ranking')
        .select("id_prestador")
        .avg("ranking as ranking")
        .innerJoin('services', 'services.id', 'ranking.id_service')
        .groupBy('services.id_prestador')
        .where('services.id_prestador', id);
        
        if(result.length) {
            result[0].ranking = Math.round(result[0].ranking);
        }

        return result ?? 0;
    }
}

module.exports = new RankingService();
