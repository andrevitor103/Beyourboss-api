const connection = require('../../infra/database');

class ServiceRepository {
    async insert(service) {
        try {
            
            const {
                solicitacao,
                contratante,
                prestador,
                dataInicio,
                dataConclusao,
                valor,
                status,
                observacao
            } = service;
            
            const serviceResult = await connection('services').insert({
                'id_solicitacao': solicitacao,
                'id_contratante': contratante,
                'id_prestador': prestador,
                'data_inicio': dataInicio,
                'data_conclusao': dataConclusao,
                'valor': valor,
                'status': status,
                'observacao': observacao
            });
            
            return serviceResult;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update( id, service ) {
        const {
            solicitacao,
            contratante,
            prestador,
            dataInicio,
            dataConclusao,
            valor,
            status,
            observacao
        } = service;

     return await connection('services').where('id', id).update({
        'id_solicitacao': solicitacao,
        'id_contratante': contratante,
        'id_prestador': prestador,
        'data_inicio': dataInicio,
        'data_conclusao': dataConclusao,
        'valor': valor,
        'status': status,
        'observacao': observacao
     });
 }

    async findById(id) {
        return await connection('services').select('*').where('id', id);
    }

    async findAllAndPaginate(limit, pageCurrent) {
        try {
            const [count] = await connection('services').count();
            
            const solicitations = await connection('services')
                .limit(limit)
                .offset((pageCurrent-1)*limit)
                .select("*");

            const recordsTotal = count['count(*)'];

          return {'total_registros': recordsTotal, 'registros': solicitations};  
        } catch (error) {
           throw new Error(error.message);    
         }   
    }

    async findAll() {
        return await connection('services').select('*');
    }

    async findById(id) {
        return await connection('services').select('*').where('id', id);
    }

    async findByContractingUser(user) {
        let servicesResult = await connection('services').select('*', 'services.id as services_id', 'services.status as status_services',
        'service_solicitation.id as solicitation_id',
        'user.nome as nome_prestador', 'services.valor as service_valor',
        'service_solicitation.descricao as descricao')
        .innerJoin('service_solicitation', 'services.id_solicitacao', 'service_solicitation.id')
        .innerJoin('user', 'services.id_prestador','user.id')
        .where('id_contratante', user)
        .orderBy('services.status', 'asc');

        const filterPriority = (a, b) => {
            if(a.status == 'EM ANDAMENTO') {
            return -1;
        }
        if(a.status == 'CONCLUIDO') {
            return 1;
        }
        return 0;
    }

    const filterPriorityLow = (a, b) => {
        if(a.status == 'EM ANDAMENTO') {
            return -1;
        }
        if(a.status == 'CONCLUIDO' && b.status == 'CANCELADO') {
            return -1;
        }
        if(a.status == 'CANCELADO') {
        return 1;
    }
    return 0;
    }
    console.log({ servicesResult: servicesResult });
    servicesResult = servicesResult.sort(filterPriority);
    servicesResult = servicesResult.sort(filterPriorityLow);
    return servicesResult;
    }

    async findByProvideringUser(user) {
        let servicesResult = await connection('services').select('*', 'services.id as services_id', 'services.status as status_services',
        'service_solicitation.id as solicitation_id', 'contato.id as contato_id',
        'user.nome as nome_contratante',
        'services.valor as service_valor')
        .innerJoin('service_solicitation', 'services.id_solicitacao', 'service_solicitation.id')
        .innerJoin('user', 'services.id_contratante','user.id')
        .innerJoin('contato', 'user.id_contato', 'contato.id')
        .where('id_prestador', user)
        .orderBy('services.status', 'asc');

        const filterPriority = (a, b) => {
            if(a.status == 'EM ANDAMENTO') {
            return -1;
        }
        if(a.status == 'CONCLUIDO') {
            return 1;
        }
        return 0;
    }

    const filterPriorityLow = (a, b) => {
        if(a.status == 'EM ANDAMENTO') {
            return -1;
        }
        if(a.status == 'CONCLUIDO' && b.status == 'CANCELADO') {
            return -1;
        }
        if(a.status == 'CANCELADO') {
        return 1;
    }
    return 0;
    }
    console.log({ servicesResult: servicesResult });
    servicesResult = servicesResult.sort(filterPriority);
    servicesResult = servicesResult.sort(filterPriorityLow);
    return servicesResult;
    }

    async findServiceActived(id) {
        const result = await connection('services').select('*')
                                                    .where('id_contratante', id)
                                                    .orWhere('id_prestador', id)
                                                    .where('status', 'EM ANDAMENTO');
        console.log(result.length);
        if(result.length > 0) {
            return true;
        }
        return false;
    }
}

module.exports = new ServiceRepository();
