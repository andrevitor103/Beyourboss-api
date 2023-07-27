const addressService = require('../../services/AddressService');
const contactService = require('../../services/ContactService');
const serviceSolicitation = require('../../service_solicitation/repository/ServiceSolicitationRepository');
const service = require('../../service/repository/ServiceRepository');

class UserService {
    constructor(repository, user) {
        this._repository = repository;
        this._user = user;
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

    async getById(id) {
        try {
            const selectedUser = await this._repository.findById(id);
            
            return selectedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id, user) {
        try {

            const selectedUser = await this._repository.findById(id);

            // console.log(selectedUser);
            const address = new addressService();
            const addressCreated = await address.updateAddress(user, selectedUser[0].id_endereco);

            const contact = new contactService();
            const contactCreated = await contact.updateContact(user, selectedUser[0].id_contato);
            
            user.id_endereco = selectedUser[0].id_endereco;
            user.id_contato = selectedUser[0].id_contato;

            //console.log(user);

            //const userValid = await this._user.update(user);

            const result = await this._repository.update(selectedUser[0].id_user, user);

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async inativar(user) {
        try {

            const solicitationsActived = await serviceSolicitation.findSolicitationActived(user);
            const servicesActived = await service.findServiceActived(user);
            console.log(solicitationsActived, servicesActived);
            if(solicitationsActived || servicesActived) {
                throw new Error("Não pode inativar conta, enquanto possui solicitações ou serviços em aberto");
            }

            const result = await this._repository.inativar(user);
            
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async ativar(user) {
        try {

            const result = await this._repository.ativar(id);

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(user) {
        try {
            const address = new addressService();
            const addressCreated = await address.create(user);

            const contact = new contactService();
            const contactCreated = await contact.create(user);
            
            user.id_endereco = addressCreated[0];
            user.id_contato = contactCreated[0];

            console.log(user);

            const userValid = await this._user.create(user);

            const result = await this._repository.insert(userValid);

            return result;
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
            
            const serviceSolicitationModel = new this._serviceSolicitation(serviceSolicitationCurrent[0]);
            await serviceSolicitationModel.statusChangeForClosed();
            const serviceSolicitationUpdated = await this._repository.update(id, serviceSolicitationModel);

            return serviceSolicitationUpdated;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = UserService;
