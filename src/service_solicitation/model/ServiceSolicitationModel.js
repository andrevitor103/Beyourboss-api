
class ServiceSolicitationModel {
    /*
      "user": 2,
      "categorias": ["Carpinteiro", "Jardineiro"],
      "titulo": "Procuro alguém disposto a carpi lote",
      "descricao": "Procuro alguém que esteja disposto a carpi lote",
      "endereco": 2,
      "contato": 2,
      "nivel_prioridade": "BAIXA|MEDIA|ALTA",
      "valor": "100.00",
      "status": "ATIVO|ENCERRADO|CANCELADO"
    */

    PRIORIDADE_BAIXA = 'BAIXA';
    PRIORIDADE_MEDIA = 'MEDIA';
    PRIORIDADE_ALTA = 'ALTA';
    
    STATUS_ATIVO = 'ATIVO';
    STATUS_ENCERRADO = 'ENCERRADO';
    STATUS_CANCELADO = 'CANCELADO';

    _constructor(serviceSolicitation) {
        this.user = serviceSolicitation.id_usuario;
        this.categorias = serviceSolicitation.id_categoria;
        this.titulo = serviceSolicitation.titulo;
        this.descricao = serviceSolicitation.descricao;
        this.nivelPrioridade = serviceSolicitation.nivel_prioridade;
        this.status = serviceSolicitation.status;
        this.imagens = serviceSolicitation.imagens;
    }

    static create(serviceSolicitation) {
        const instance = new ServiceSolicitationModel();
        instance.user = serviceSolicitation.id_usuario;
        instance.categorias = serviceSolicitation.id_categoria;
        instance.titulo = serviceSolicitation.titulo;
        instance.descricao = serviceSolicitation.descricao;
        instance.nivelPrioridade = serviceSolicitation.nivel_prioridade;
        instance.status = instance.STATUS_ATIVO;
        instance.imagens = serviceSolicitation.imagens;
        return instance;
    }

    validate(serviceSolicitation) {
        let errors = [];
        const required = ['nivel_prioridade', 'id_categoria', 'imagens'];
        const labels = { 'nivel_prioridade': 'nivel prioridade', 'id_categoria,': 'categoria', 'imagens': 'imagens' };
        errors['errors'] = required.map((field) => {
            if(!serviceSolicitation[field]) {
                return `${labels[field]} é obrigatório`; 
            }
        });
        if(errors) {
            // console.log(errors);
        }
        return errors;
    }

    actualizeBudget(updates) {
        console.log(updates);        
        this.statusCanBeChange();

        const fieldsEditValid = this.fieldsValidForEdit();
        const labels = { 'titulo': 'titulo', 'descricao': 'descricao', 'nivel_prioridade': 'nivelPrioridade', 'imagens': 'imagens' };
        fieldsEditValid.forEach((field) => {
            const value = updates[field];
            if(value) {
                const fieldName = labels[field];
                this[fieldName] = value;
            }

        });
        // console.log(this);
    }

    fieldsValidForEdit() {
        return ['titulo', 'descricao', 'nivel_prioridade', 'imagens'];
    }

    statusChangeForClosed() {
                
        this.statusCanBeChange();

        this.status = this.STATUS_ENCERRADO;
    }

    statusChangeForCanceled() {
        
        this.statusCanBeChange();

        this.status = this.STATUS_CANCELADO;
    }

    isActivated() {
        return this.status == this.STATUS_ATIVO;
    }

    statusCanBeChange() {
        if(!this.isActivated()) {
            throw new Error('Não pode alterar solicitações não ativas');
        }
    }

}

module.exports = ServiceSolicitationModel;