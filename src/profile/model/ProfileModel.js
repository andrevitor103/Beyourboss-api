
class ProfileModel {
    
    /*
                        Perfil
        nome, endereco, contato, ranking, foto, descricao, id_conta
        - cadastrar
        - editar nome, alterar endereco, editar contatos, descrição e foto
        - deletar
        - servico para calcular ranking
    */

    constructor(profile) {
        this.name = profile.name;
        this.picture = profile.picture;
        this.biographfy = profile.biographfy;
        this.ranking = profile.ranking;//receber por um serviço
        this.contacts = profile.contacts;//conjunto de contatos? 1 usuario <--> n contatos
        this.address = profile.id_address;
        this.account = profile.id_account;
    }

    static create(data) {
        const profile = new ProfileModel(data);
        profile.ranking = 0;
        return profile;
    }

    profileActualize(updates) {
        const fieldsEditValid = this.fieldsValidForEdit();
        const labels = { 'name': 'name', 'picture': 'picture', 'biographfy': 'biographfy', 'contacts': 'contacts', 'address': 'address' };

        fieldsEditValid.forEach((field) => {
            const value = updates[field];
            if(value) {
                const fieldName = labels[field];
                this[fieldName] = value;
            }
        });
    }

    fieldsValidForEdit() {
        return ['name', 'picture', 'biographfy', 'contacts', 'address'];
    }

    pictureActualize(picture) {
        //salvar imagem
        const newNamePicture = `${this.name}-${new Date('Y-m-d h:m:s').toString()}`;
        this.picture = newNamePicture;
    }

}

module.exports = ProfileModel;
