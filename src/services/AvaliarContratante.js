const connection = require('../infra/database');

class AvaliarPrestadorService {
    async create(req, res) {
        try {
            const ranking = req.body;
            const id_contratante = ranking.id_contratante;

            const result = await connection('avaliacao_contratantes').insert({
                'id_service':   ranking.id_service,
                'comentario':   ranking.comentario,
                'nivel':        ranking.nivel,
                'id_contratante': ranking.id_contratante
            });

            let mediaAvaliacao =  await connection('avaliacao_contratantes').avg('avaliacao_contratantes.nivel as nivel')
            .where('avaliacao_contratantes.id_contratante', id_contratante)
            .groupBy('avaliacao_contratantes.id_contratante');

            console.log(mediaAvaliacao);

            const avaliacao = await connection('user').where('id', id_contratante).update({
            'avaliacao_contratante': mediaAvaliacao[0].nivel
            });
            
            return res.status(201).json("Avaliação registrada com sucesso");

        } catch (error) {
            console.log(error);
            return res.status(400).json({ "erro": "erro ao registrar ranking" });
        }
    }

    static async avaliar(ranking) {

        const result = await connection('avaliacao_contratantes').insert({
            'id_service':   ranking.id_service,
            'comentario':   ranking.comentario,
            'nivel':        ranking.nivel,
            'id_contratante': ranking.id_contratante
        });
        
        return result;
    }

    async listarAvaliacoes(req, res) {
        try {
            const id = req.params.id;

            const result = await connection('avaliacao_contratantes')
                                .select(
                                    'avaliacao_contratantes.comentario', 'avaliacao_contratantes.nivel',
                                    'user.nome'
                                 )
                                 .innerJoin('services', 'avaliacao_contratantes.id_service', 'services.id')
                                .innerJoin('user', 'services.id_prestador', 'user.id')
                                .where('avaliacao_contratantes.id_contratante', id);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ "erro": "erro ao buscar perfil" });
        }
    }
}

module.exports = new AvaliarPrestadorService();
