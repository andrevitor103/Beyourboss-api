const connection = require('../../infra/database');

class ServiceSolicitationRepository {
    async insert(serviceSolicitation) {
        try {
            const {
                user,
                categorias,
                titulo,
                descricao,
                nivelPrioridade,
                status,
                imagens
            } = serviceSolicitation;

            console.log(serviceSolicitation);
            
            const serviceSolicitationResult = await connection('service_solicitation').insert({
                'id_usuario': user,
                'id_categoria': categorias,
                'titulo': titulo,
                'descricao': descricao,
                'nivel_prioridade': nivelPrioridade,
                'status': status,
                'imagens': imagens
            });
            
            return serviceSolicitationResult;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update( id, serviceSolicitation ) {
        console.log(serviceSolicitation);
        const {
            user,
            categorias,
            titulo,
            descricao,
            nivelPrioridade,
            status,
            imagens
        } = serviceSolicitation;

     return await connection('service_solicitation').where('id', id).update({
        'id_usuario': user,
        'id_categoria': categorias,
        'titulo': titulo,
        'descricao': descricao,
        'nivel_prioridade': nivelPrioridade,
        'status': status,
        'imagens': imagens
     });
 }
    async findAllAndPaginate(limit, pageCurrent) {
        try {
            const [count] = await connection('service_solicitation').count();
            
            let solicitations = await connection('service_solicitation')
                .select("service_solicitation.titulo","service_solicitation.descricao as detalhes", 
                    "service_solicitation.nivel_prioridade" , "categoria.categoria",
                    "user.nome as nome_contratante", "endereco.estado", "endereco.UF as uf",
                    "endereco.cidade", "endereco.bairro", "service_solicitation.imagens",
                     "service_solicitation.date_ad as data_adicao", "service_solicitation.id as solicitation_id",
                     "user.id as id_usuario")
                     .innerJoin('categoria', 'service_solicitation.id_categoria', 'categoria.id')
                     .innerJoin('user', 'service_solicitation.id_usuario', 'user.id')
                     .innerJoin('endereco', 'user.id_endereco', 'endereco.id')
                     .innerJoin('contato', 'user.id_contato', 'contato.id')
                     .where('STATUS', 'ATIVO')
                     .orderBy('service_solicitation.id', 'desc');

            const recordsTotal = count['count(*)'];

            const filterPriority = (a, b) => {
                if(a.nivel_prioridade == 'ALTA') {
                return -1;
            }
            if(a.nivel_prioridade == 'MEDIA') {
                return 1;
            }
            return 0;
        }

        const filterPriorityLow = (a, b) => {
            if(a.nivel_prioridade == 'ALTA') {
                return -1;
            }
            if(a.nivel_prioridade == 'MEDIA' && b.nivel_prioridade == 'BAIXA') {
                return -1;
            }
            if(a.nivel_prioridade == 'BAIXA') {
            return 1;
        }
        return 0;
    }
        console.log({'solicitações': solicitations});
        // console.log(solicitations.sort(mySort));
        solicitations = solicitations.sort(filterPriority);
        solicitations = solicitations.sort(filterPriorityLow);
        

          return {'total_registros': recordsTotal, 'registros': solicitations};  
        } catch (error) {
           throw new Error(error.message);    
         }   
    }


    async findAllFilter() {
        try {

            const solicitations = await connection('service_solicitation')
                .select("*", "service_solicitation.id as solicitation_id")
                .innerJoin('user', 'service_solicitation.id_usuario', 'user.id')
                .innerJoin('endereco', 'user.id_endereco', 'endereco.id')
                .innerJoin('contato', 'user.id_contato', 'contato.id')
                .innerJoin('categoria', 'service_solicitation.id_categoria', 'categoria.id')

          return solicitations;  
        } catch (error) {
           throw new Error(error.message);    
         }   
    }

    async findById(id) {
        return await connection('service_solicitation').select('*').where('id', id);
    }

    async findByUser(user) {
        let servicesResult = await connection('service_solicitation').select('*').where('id_usuario', user);
        const filterPriority = (a, b) => {
            if(a.status == 'ATIVO') {
            return -1;
        }
        if(a.status == 'PENDENTE') {
            return 1;
        }
        return 0;
    }

    const filterPriorityLow = (a, b) => {
        if(a.status == 'ATIVO') {
            return -1;
        }
        if(a.status == 'PENDENTE' && b.status == 'ENCERRADO') {
            return -1;
        }
        if(a.status == 'ENCERRADO') {
        return 1;
    }
    return 0;
    }
    console.log({ servicesResult: servicesResult });
    servicesResult = servicesResult.sort(filterPriority);
    servicesResult = servicesResult.sort(filterPriorityLow);
    return servicesResult;
    }
    
    async findByBudgetSolicitation(id) {
        return await connection('service_solicitation').select('*').where('id', id);
    }

    async findSolicitationActived(id) {
        const result = await connection('service_solicitation').select('*')
                                                               .where('id_usuario', id)
                                                               .where('status', 'ATIVO');
        console.log(result);
        if(result.length > 0) {
            return true;
        }
        return false;
    }
}

module.exports = new ServiceSolicitationRepository();
