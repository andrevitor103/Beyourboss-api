const knex = require('knex');
const connection = require('../infra/database');

class AvaliarPrestadorService {
    async create(req, res) {
        try {
            const ranking = req.body;
            const id_prestador = ranking.id_prestador;
            const result = await connection('avaliacao_prestadores').insert({
                'id_service':   ranking.id_service,
                'comentario':   ranking.comentario,
                'nivel':        ranking.nivel,
                'id_prestador': ranking.id_prestador
            });

            let mediaAvaliacao =  await connection('avaliacao_prestadores').avg('avaliacao_prestadores.nivel as nivel')
            .where('avaliacao_prestadores.id_prestador', id_prestador)
            .groupBy('avaliacao_prestadores.id_prestador');

            console.log(mediaAvaliacao);

            const avaliacao = await connection('user').where('id', id_prestador).update({
            'avaliacao_prestador': mediaAvaliacao[0].nivel
            });
            
            return res.status(200).json("Avaliação registrada com sucesso");

        } catch (error) {
            console.log(error);
            return res.status(400).json({ "erro": "erro ao registrar ranking" });
        }
    }

    async avaliar(id_prestador) {

        const result = await connection('avaliacao_prestadores')
                            .avg('nivel as nivel')
                            .groupBy('id_prestador')
                            .where('id_prestador', id_prestador);
        
        return result;
    }

    async listarAvaliacoes(req, res) {
        try {
            const id = req.params.id;

            const result = await connection('avaliacao_prestadores')
                                .select(
                                    'services.*', 'avaliacao_prestadores.comentario', 'avaliacao_prestadores.nivel',
                                    'user.nome'
                                 )
                                 .innerJoin('services', 'avaliacao_prestadores.id_service', 'services.id')
                                .innerJoin('user', 'services.id_contratante', 'user.id')
                                .where('avaliacao_prestadores.id_prestador', id);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ "erro": "erro ao buscar perfil" });
        }
    }

    async atualizarAvaliacao(id_prestador, value) {

        return await connection('user').where('id', id_prestador).update({
            'avaliacao_prestador': value
        });
    }
}

module.exports = new AvaliarPrestadorService();
