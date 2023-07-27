const connection = require('../infra/database');

class AddressService {
    async create(data) {
        try {
            const address = data;
            const isValid = await this.addressValidate(address);
        
            if (!isValid) {
                throw new Error("Endereço inválido");
            }
            const addressRecord = await this.createAddress(address);
            return addressRecord;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addressValidate(address) {
        return true;
    }

    async createAddress(address) {

        const result = await connection('endereco').insert({
            'cep': address.cep,
            'estado': address.estado,
            'uf': address.uf,
            'cidade': address.cidade,
            'bairro': address.bairro,
            'rua': address.rua,
        });
        
        return result;
    }

    async updateAddress(address, id_address) {
        console.log(id_address ?? 'eitaaa');
        const result = await connection('endereco').update({
            'cep': address.cep,
            'estado': address.estado,
            'uf': address.uf,
            'cidade': address.cidade,
            'bairro': address.bairro,
            'rua': address.rua,
        })
        .where('id', id_address);
        
        return result;
    }
}

module.exports = AddressService;
