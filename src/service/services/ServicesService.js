
class ServicesService {
    constructor(repository,service) {
        this._repository = repository;
        this._service = service;
    }

    async getAll() {
        return await this._repository.findAll();
    }

    async getById(id) {
        return await this._repository.findById(id);
    }

    async getByContractingUser(user) {
        return await this._repository.findByContractingUser(user);
    }

    async getByProvideringUser(user) {
        return await this._repository.findByProvideringUser(user);
    }

    async create(service) {
        try {
            const serviceModel = this._service.create(service);

            const result = await this._repository.insert(serviceModel);

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async concludeService(id) {
        try {
            const serviceCurrent = await this._repository.findById(id);
            console.log(serviceCurrent, id);
            const serviceModel = new this._service(serviceCurrent[0]);
            await serviceModel.statusChangeForConcluded();
            
            const serviceUpdated = await this._repository.update(id, serviceModel);

            return serviceUpdated;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async cancelService(id) {
        try {
            
            const serviceCurrent = await this._repository.findById(id);

            const serviceModel = new this._service(serviceCurrent[0]);
            await serviceModel.statusChangeForCanceled();
            
            const serviceUpdated = await this._repository.update(id, serviceModel);

            return serviceUpdated;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = ServicesService;
