
class ServiceSolicitationService {
    constructor(repository,serviceSolicitation) {
        this._repository = repository;
        this._serviceSolicitation = serviceSolicitation;
    }

    async create() {
        try {
            const result = await this._repository.insert(this._serviceSolicitation);

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAll(limit, pageCurrent) {
        try {
            //se rebecer valores 0 ou negativos devem ser tratados como 1
            pageCurrent = pageCurrent <= 0 ? 1 : pageCurrent;
            const records = await this._repository.findAllAndPaginate(limit, pageCurrent);
            
            return records;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    //     async getAll(limit, pageCurrent) {
    //     try {
    //         //se rebecer valores 0 ou negativos devem ser tratados como 1
    //         pageCurrent = pageCurrent <= 0 ? 1 : pageCurrent;
    //         const records = await this._repository.findAllAndPaginate(limit, pageCurrent);
            
    //         return records;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    async getAllFilter() {
        try {
            const records = await this._repository.findAllFilter();
            
            return records;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getById(id) {
        try {
            const selectedServiceSolicitation = await this._repository.findById(id);
            
            return selectedServiceSolicitation;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getByUser(user) {
        return await this._repository.findByUser(user);
    }

    async getByBudgetSolicitation(id) {
        return await this._repository.findByBudgetSolicitation(id);
    }

    async update(id, serviceSolicitation) {
        try {
            const serviceSolicitationCurrent = await this._repository.findById(id);

            const serviceSolicitationModel = new this._serviceSolicitation();

            await serviceSolicitationModel._constructor(serviceSolicitationCurrent[0]);

            await serviceSolicitationModel.actualizeBudget(serviceSolicitation);

            const serviceSolicitationUpdated = await this._repository.update(id, serviceSolicitationModel);
            
            return serviceSolicitationUpdated;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async cancelServiceSolicitation(id) {
        try {
            const serviceSolicitationCurrent = await this._repository.findById(id);

            const serviceSolicitationModel = new this._serviceSolicitation(serviceSolicitationCurrent[0]);
            await serviceSolicitationModel.statusChangeForCanceled();
            const serviceSolicitationUpdated = await this._repository.update(id, serviceSolicitationModel);

            return serviceSolicitationUpdated;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async concludeServiceSolicitation(id) {
        try {
            const serviceSolicitationCurrent = await this._repository.findById(id);
            
            const serviceSolicitationModel = new this._serviceSolicitation();
            await serviceSolicitationModel._constructor(serviceSolicitationCurrent[0]);
            await serviceSolicitationModel.statusChangeForClosed();
            const serviceSolicitationUpdated = await this._repository.update(id, serviceSolicitationModel);

            return serviceSolicitationUpdated;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = ServiceSolicitationService;
