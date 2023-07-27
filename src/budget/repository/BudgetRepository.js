const connection = require('../../infra/database');
const AvaliacaoPrestadoresServices = require('../../services/AvaliarPrestador');

class BudgetRepository {
    async insert( budget ) 
    {
        try {
            
            const {
                servico,
                user,
                valor,
                dataInicial,
                dataFinal,
                observacao,
                status
            } = budget;

            const budgetResult = await connection('budget').insert({
                'id_service_solicitation': servico,
                'id_user': user,
                'valor': valor,
                'data_inicial': dataInicial,
                'data_final': dataFinal,
                'observacao': observacao,
                'status': status
            });

            return budgetResult;

        } catch (error) {
            throw new Error(error.message);
        }

    }

    async update( id, budget ) {
           const {
                valor,
                dataInicial,
                dataFinal,
                observacao,
                status
            } = budget;
        const result = await connection('budget')
                             .where('id', id)
                             .where('status', 'PENDENTE')
                             .update({
                                'valor': valor,
                                'data_inicial': dataInicial,
                                'data_final': dataFinal,
                                'observacao': observacao,
                                'status': status
                            });
        return result;
    }

    async closeBudget(serviceId) {
        const successfulCloseBudget = await connection('budget')
        .where('id_service_solicitation', serviceId)
        .whereNotIn('status', ['APROVADO'])
        .update({
            'status': 'RECUSADO'
        });

        return successfulCloseBudget;
    }

    async findAll() {
        return await connection('budget').select('*');
    }

    async findById(id) {
        return await connection('budget').select('*')
                                        .innerJoin('user', 'user.id', 'budget.id_user')
                                        .where('budget.id', id)
                                        .where('user.inativo', null);
    }

    async findByUser(user) {
        return await connection('budget').select('*', 'budget.status as budget_status',
        'budget.id as budget_id', 'budget.valor as budget_valor',
        'service_solicitation.*', 'user.nome')
        .innerJoin('service_solicitation', 'budget.id_service_solicitation', 'service_solicitation.id')
        .innerJoin('user', 'service_solicitation.id_usuario', 'user.id')
        .innerJoin('endereco', 'user.id_endereco', 'endereco.id')
        .where('budget.id_user', user)
        .orderBy('budget.status', 'asc')
    }

    async findBySolicitation(id) {
        let results = await connection('budget').select('*', 'budget.status as budget_status',
        'budget.id as budget_id', 'budget.id_user as budget_user',
        'budget.valor as budget_valor',
        'service_solicitation.*', 'user.id as user_id')
        .innerJoin('service_solicitation', 'budget.id_service_solicitation', 'service_solicitation.id')
        .innerJoin('user', 'user.id', 'budget.id_user')
        .where('id_service_solicitation', id)
        .where('user.inativo', null)
        .orderBy('user.avaliacao_prestador', 'desc');

        const filterPriority = (a, b) => {
            if(a.status == 'PENDENTE') {
            return -1;
        }   
        if(a.status == 'RECUSADO') {
            return 1;
        }
        return 0;
    }

    const filterPriorityLow = (a, b) => {
        if(a.budget_status == 'APROVADO') {
            return -1;
        }
        if(a.budget_status == 'APROVADO' && b.budget_status == 'RECUSADO') {
            return -1;
        }
        if(a.budget_status == 'PENDENTE') {
        return 1;
    }
    return 0;
    }
    // console.log({ results: results });
    results = results.sort(filterPriority);
    results = results.sort(filterPriorityLow);

    return results;
    }

       adicionarStar(data) {
        return new Promise(async (resolve, reject) => {
            let results =  await connection('avaliacao_prestadores').avg('avaliacao_prestadores.nivel as nivel')
            .where('avaliacao_prestadores.id_prestador', data.budget_user)
            .groupBy('avaliacao_prestadores.id_prestador');
            // console.log(results[0].nivel);
            data.nivel = results[0]?.nivel ? results[0]?.nivel : 1;
            resolve(data);
        });
    }
}

module.exports = new BudgetRepository();
