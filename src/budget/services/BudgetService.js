const ServiceSolicitationModel = require('../../service_solicitation/model/ServiceSolicitationModel');
const ServiceSolicitationRepository = require('../../service_solicitation/repository/ServiceSolicitationRepository');
const ServiceSolicitationService = require('../../service_solicitation/services/ServiceSolicitationService');

const ServiceModel = require('../../service/model/ServiceModel');
const ServiceRepository = require('../../service/repository/ServiceRepository');
const ServicesService = require('../../service/services/ServicesService');

class BudgetService
{
    constructor(repository, budget) {
        this._repository = repository;
        this._budget = budget;
    }

    async create() {
        return await this._repository.insert(this._budget);
    }

    async update(id, budget)
    {
        try {
            const budgetData = await this._repository.findById(id);
            
            const { 
                id_service_solicitation, 
                id_user, 
                valor, 
                data_inicial, 
                data_final, 
                observacao, 
                status 
            } = budgetData[0];
    
            const data = {
                'user': id_user, 
                'servico': id_service_solicitation, 
                'valor': valor, 
                'data_inicial': data_inicial,
                'data_final': data_final,
                'observacao': observacao,
                'status': status
            };
            const budgetModel = new this._budget(data);
            budgetModel.update(budget);
            return await this._repository.update(id, budget);
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async getAll() {
        return await this._repository.findAll();
    }

    async getById(id) {
        return await this._repository.findById(id);
    }

    async getByUser(user) {
        return await this._repository.findByUser(user);
    }

    async getBySolicitation(id) {
        let results = await this._repository.findBySolicitation(id);
        return results;
    }
    
    async statusChange(id, newStatus) {
        const budgetData = await this._repository.findById(id);
        
        const { 
            id_service_solicitation, 
            id_user, 
            valor, 
            data_inicial, 
            data_final, 
            observacao, 
            status 
        } = budgetData[0];

        const data = {
            'user': id_user, 
            'servico': id_service_solicitation, 
            'valor': valor, 
            'data_inicial': data_inicial,
            'data_final': data_final,
            'observacao': observacao,
            'status': status
        };
        try {
            const budgetModel = new this._budget(data);

            budgetModel.statusChange(newStatus);
            console.log("rapaaa " + id);
            const budgetUpdated = await this._repository.update(id, budgetModel);
          
            if(budgetModel.getStatus() == "APROVADO") {
                await this._repository.closeBudget(budgetModel.getServico());
                const schemaService = await this.generateServiceSchema(budgetModel);
                await this.createService(schemaService);
            }
            return budgetUpdated;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async generateServiceSchema(budgetModel) {
        const serviceSolicitationService = new ServiceSolicitationService(ServiceSolicitationRepository, ServiceSolicitationModel);
        await serviceSolicitationService.concludeServiceSolicitation(budgetModel.getServico());

        const serviceSolcitationCurrent = await serviceSolicitationService.getById(budgetModel.getServico());
        const serviceSolicitationCurrentModel = new ServiceSolicitationModel();
        await serviceSolicitationCurrentModel._constructor(serviceSolcitationCurrent[0]);
        // console.log('***************');
        // console.log(serviceSolicitationCurrentModel);
        // console.log('***************');
        const serviceSchema = {
            "id_solicitacao": budgetModel.getServico(),
            "id_contratante": serviceSolicitationCurrentModel.user,
            "id_prestador": budgetModel.getUser(),
            "data_inicio": budgetModel.getDataInicial(),
            "valor": budgetModel.getValor()                    
        };

        /*
        {
            "id_solicitacao": 1 => budget.getServico(),
            "id_contratante": 1 => serviceSolicitation.getUser(),
            "id_prestador": 1 => budget.getUser(),
            "data_inicio": "2022-04-22 10:00:00" => budget.dataInicial(),
            "valor": 100 => budget.getValor()
        }
        */
        return serviceSchema;
    }

    async createService(schema) {
        const servicesService = new ServicesService(ServiceRepository, ServiceModel);
        await servicesService.create(schema);
    }

}

module.exports = BudgetService;
