const ServiceSolicitationModel = require('../model/ServiceSolicitationModel');
const ServiceSolicitationRepository = require('../repository/ServiceSolicitationRepository');
const ServiceSolicitationService = require('../services/ServiceSolicitationService');

class ServiceSolicitationController {
    /*
      ServiceSolicitation: 
      {
          "user": 2,
          "categorias": ["Carpinteiro", "Jardineiro"],
          "titulo": "Procuro alguém disposto a carpi lote",
          "descricao": "Procuro alguém que esteja disposto a carpi lote",
          "endereco": 2,
          "contato": 2,
          "nivel_prioridade": "baixo|medio|alto",
          "valor": "100.00",
          "status": "ativo|encerrado|cancelado"
      }
     */

      /**
       * toda a solicitação de serviço, quando criada deve ter o status de ativo (OK)
       * o status de uma solicitação só muda para encerrado quando um orçamento é aceito (OK)
       * uma solicitação só pode ser cancelada se o status estiver como ativo (OK)
       * uma solicitação só pode ser alterada quando seu status estiver como ativo (OK)
       * uma solicitação só pode alterar informações que não interfiram nos orçamentos realizados
       * para ele [descricao, nivel_prioridade, contato, titulo] (OK)
       */
        
    async index(request, response) {
        //deve receber a página por queryString e chamar serviço passando limite por página e a página atual
        //e salvar o total de registros no header
        try {

            const {page = 1} = request.query;
            const limit = 5;
            
            const serviceSolicitationService = new ServiceSolicitationService(ServiceSolicitationRepository, ServiceSolicitationModel);
            const detailsRecords = await serviceSolicitationService.getAll(limit, page);
    
            response.header('X-total-Count', detailsRecords.total_registros);
    
            return response.status(200).json(detailsRecords.registros);   
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }

    async indexFilter(request, response) {
        //deve receber a página por queryString e chamar serviço passando limite por página e a página atual
        //e salvar o total de registros no header
        try {
            const serviceSolicitationService = new ServiceSolicitationService(ServiceSolicitationRepository, ServiceSolicitationModel);
            const detailsRecords = await serviceSolicitationService.getAllFilter();
    
            return response.status(200).json(detailsRecords);   
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }

    async getById(request, response)
        {
            try {
                const { id } = request.params;
                const serviceSolicitationService = new ServiceSolicitationService(ServiceSolicitationRepository, null);
                let serviceSolicitationSelected = await serviceSolicitationService.getById(id);
                return response.status(200).json(serviceSolicitationSelected);
            } catch (error) {
                return response.status(400).json({'erro': error.message });
            }
        }

        async getByUser(request, response)
        {
            try {
                const { user } = request.headers;
                const serviceSolicitationService = new ServiceSolicitationService(ServiceSolicitationRepository, null);
                let selectedServiceSolicitationCollection = await serviceSolicitationService.getByUser(user);
                return response.status(200).json(selectedServiceSolicitationCollection);
            } catch (error) {
                return response.status(400).json({'erro': error.message });
            }
        }

        async getBudgetBySolicitation(request, response)
        {
            try {
                const { id } = request.params;
                const serviceSolicitationService = new ServiceSolicitationService(ServiceSolicitationRepository, null);
                let serviceSolicitationSelected = await serviceSolicitationService.getByBudgetSolicitation(id);
                return response.status(200).json(serviceSolicitationSelected);
            } catch (error) {
                return response.status(400).json({'erro': error.message });
            }
        }


    async create(request, response) {
        //deve receber dados pela request e chamar service
        try {
            const serviceSolicitation = request.body;
        
            const serviceSolicitationModel = ServiceSolicitationModel.create(serviceSolicitation);
            
            const serviceSolicitationService = new ServiceSolicitationService(ServiceSolicitationRepository, serviceSolicitationModel);
            const serviceSolicitationCreated = await serviceSolicitationService.create();
            return response.status(201).json(serviceSolicitationCreated);   
        } catch (error) {
            return response.status(400).json({ 'erro': error.message });
        }
    }

    async update(request, response) {
        // recuperar orçamento, pegar novos dados da requisição e chamar modelo, atualizar dados
        try {
            const { id } = request.params;
            const data = request.body;
            console.log({'data': data});
            const serviceSolicitationService = new ServiceSolicitationService(ServiceSolicitationRepository, ServiceSolicitationModel);
            const serviceSolicitationUpdated = await serviceSolicitationService.update(id, data);

            return response.status(200).json(serviceSolicitationUpdated);
        } catch (error) {
            return response.status(400).json({ 'erro': error.message });   
        }
    }

    async statusChangeForCanceled(request, response) {
        // recuperar orçamento, chamar modelo e atualizar status
        try {
            const { id } = request.params;

            const serviceSolicitationService = new ServiceSolicitationService(ServiceSolicitationRepository, ServiceSolicitationModel);

            const serviceSolicitationCanceled = await serviceSolicitationService.cancelServiceSolicitation(id);
    
            return response.status(200).json(serviceSolicitationCanceled);

        } catch (error) {
            return response.status(400).json({ 'erro': error.message });
        }
    }

};

module.exports = new ServiceSolicitationController();
