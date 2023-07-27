const connection = require('../infra/database');

class ContactService {
    async create(data) {
        try {
            const contact = data;
            const isValid = await this.contactValidation(contact);
        
            if (!isValid) {
                throw new Error("Contato inválido");
            }
            const contactRecord = await this.createContact(contact);
            return contactRecord;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async contactValidation(contact) {
        return true;
    }

    async createContact(contact) {

        const result = await connection('contato').insert({
            'contato': contact.nome,
            'numero_contato': contact.numero_contato,
        });
        
        return result;
    }

    async updateContact(contact, id_contact) {

        const result = await connection('contato').update({
            'contato': contact.nome,
            'numero_contato': contact.numero_contato,
        })
        .where('id', id_contact)
        
        return result;
    }
}

module.exports = ContactService;
