const BudgetModel = require('../model/BudgetModel');
const BudgetService = require('../services/BudgetService');
const BudgetRepository = require('../repository/BudgetRepository');

class BudgetController {
    //usuário pode enviar orçamento em serviços
    /*
        "orçamento": {
            "solicitacao_servico": 10,
            "user": 2,
            "valor": 120.00,
            "data_inicial": "2022-04-08 10:00:00",
            "data_final": "2022-04-08 14:00:00",
            "observacao": "estou a disposição para ir amanhã",
            "status": "pendente|aprovado|recusado"
        }
    */


        async getAll(request, response)
        {
            try {
                const budgetService = new BudgetService(BudgetRepository, null);
                let budgetCollection = await budgetService.getAll();
                return response.status(200).json(budgetCollection);
            } catch (error) {
                return response.status(400).json({'erro': error.message });
            }
        }

        async getById(request, response)
        {
            try {
                const { id } = request.params;
                const budgetService = new BudgetService(BudgetRepository, null);
                let budgetSelectioned = await budgetService.getById(id);
                return response.status(200).json(budgetSelectioned);
            } catch (error) {
                return response.status(400).json({'erro': error.message });
            }
        }

        async getByUser(request, response)
        {
            try {
                const { user } = request.headers;
                const budgetService = new BudgetService(BudgetRepository, null);
                let selectedBudgetCollection = await budgetService.getByUser(user);
                return response.status(200).json(selectedBudgetCollection);
            } catch (error) {
                return response.status(400).json({'erro': error.message });
            }
        }

        async getBySolicitation(request, response)
        {
            try {
                const { id } = request.params;
                const budgetService = new BudgetService(BudgetRepository, null);
                let selectedBudgetCollection = await budgetService.getBySolicitation(id);
                // let results = selectedBudgetCollection.map((data) => data);
                // console.log({ 'result': results });
                return response.status(200).json(selectedBudgetCollection);
            } catch (error) {
                return response.status(400).json({'erro': error.message });
            }
        }
        
        async create(request, response)
        {
            //pegar corpo da requisição, passar para modelo, retornar dados
            try {
                const budgetModel = new BudgetModel(request.body);
                const budgetService = new BudgetService(BudgetRepository, budgetModel);
                const budgetCreated = await budgetService.create();
                return response.status(201).json(budgetCreated);
            } catch (error) {
                return response.status(400).json({'erro': error.message });
            }
        }

        async update(request, response)
        {
            try {
                const { id } = request.params;
                //const budgetModel = new BudgetModel(request.body);
                const budgetService = new BudgetService(BudgetRepository, BudgetModel);
                const budgetUpdated = await budgetService.update(id, request.body);
                return response.status(200).json(budgetUpdated);
            } catch (error) {
                return response.status(400).json({ 'erro': error.message });
            }
        }

        async statusChange(request, response) 
        {
            //pensar em uma solução
            // 1 solução - receber novo status, buscar por id do orçamento e realizar alteração
            // 2 solução - recuperar modelo do repositorio pelo id e realizar update com status novo
            try {
                const { id } = request.params;
                const { status } = request.query;
                const budgetService = new BudgetService(BudgetRepository, BudgetModel);
                let budgetCreated = await budgetService.statusChange(id, status);
                return response.status(200).send();
            } catch (error) {
                console.log(error);
                return response.status(400).json({'erro': error.message });
            }
        }
}

module.exports = new BudgetController();
