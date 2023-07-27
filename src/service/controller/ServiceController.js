const ServiceModel = require('../model/ServiceModel');
const ServiceRepository = require('../repository/ServiceRepository');
const ServicesService = require('../services/ServicesService');

class ServiceController {
    /**
     {
        "solicitacao": 4,
        "contratante": 2,
        "prestador": 2,
        "data_inicio": "2022-04-20 10:00:00",
        "data_conclusao": "2022-04-20 15:00:00",
        "valor": 100.00,
        "status": "em andamento|concluido|cancelado", // todo serviço quando criado, será criado com status "em andamento",
        "observacao": "serviço muito bem realizado"
     }
     */

     /**
      * deve ter opção de mudar status do serviço: para mudar para concluido/cancelado deve ter a confirmação de ambas as partes
      * quando mudado o status para concluido/cancelado deve ser adicionado data_conclusão (OK)
      */

      async getAll(request, response)
      {
          try {
              const servicesService = new ServicesService(ServiceRepository, null);
              let serviceCollection = await servicesService.getAll();
              return response.status(200).json(serviceCollection);
          } catch (error) {
              return response.status(400).json({'erro': error.message });
          }
      }

      async getById(request, response)
      {
          try {
              const { id } = request.params;
              const servicesService = new ServicesService(ServiceRepository, null);
              let serviceSelected = await servicesService.getById(id);
              return response.status(200).json(serviceSelected);
          } catch (error) {
              return response.status(400).json({'erro': error.message });
          }
      }

      async getByContractingUser(request, response)
      {
          try {
              const { user } = request.headers;
              const servicesService = new ServicesService(ServiceRepository, null);
              let selectedServiceCollection = await servicesService.getByContractingUser(user);
              return response.status(200).json(selectedServiceCollection);
          } catch (error) {
              return response.status(400).json({'erro': error.message });
          }
      }

      async getByProvideringUser(request, response)
      {
          try {
              const { user } = request.headers;
              const servicesService = new ServicesService(ServiceRepository, null);
              let selectedServiceCollection = await servicesService.getByProvideringUser(user);
              return response.status(200).json(selectedServiceCollection);
          } catch (error) {
              return response.status(400).json({'erro': error.message });
          }
      }

     async create(request, response) {
         /**
          * quando um orçamento é aceito, uma solicitação de serviço deve ter seu status alterado para encerrado
          * e deve ser criado um serviço
          * soluções
          * 1 - quando encerrado solicitação de serviço, chamar "service" responsavel por criar serviço
          * problemas da solução 1: solicitação ficaria acoplada ao "service" da solicitação de serviço
          * 2 - quando encerrado solicitação de serviço, gerar um evento, onde serviço estaria ouvindo
          * e receberia os dados necessários para criar um serviço
          * problemas da solução 2: aumentaria a complexidade da aplicação, adicionando pub/sub
          */
         //deve receber dados pela request e chamar service
        try {
            const service = request.body;
            
            const servicesService = new ServicesService(ServiceRepository, ServiceModel);
            const serviceServiceCreated = await servicesService.create(service);
            return response.status(201).json(serviceServiceCreated);   
        } catch (error) {
            return response.status(400).json({ 'erro': error.message });
        }
     }

     async concludeService(request, response) {
        // recuperar orçamento, chamar modelo e atualizar status
        try {
            const { id } = request.params;

            const servicesService = new ServicesService(ServiceRepository, ServiceModel);

            const serviceConcluded = await servicesService.concludeService(id);
    
            return response.status(200).json(serviceConcluded);

        } catch (error) {
            return response.status(400).json({ 'erro': error.message });
        }
     }

     async cancelService(request, response) {
        // recuperar orçamento, chamar modelo e atualizar status
        try {
            const { id } = request.params;

            const servicesService = new ServicesService(ServiceRepository, ServiceModel);

            const serviceCanceled = await servicesService.cancelService(id);
    
            return response.status(200).json(serviceCanceled);

        } catch (error) {
            return response.status(400).json({ 'erro': error.message });
        }
     }
}

module.exports = new ServiceController();
