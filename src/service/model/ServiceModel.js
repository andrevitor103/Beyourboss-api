
class ServiceModel {

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
    
    STATUS_EM_ANDAMENTO = 'EM ANDAMENTO';
    STATUS_CONCLUIDO = 'CONCLUIDO';
    STATUS_CANCELADO = 'CANCELADO';

    constructor(service) {
        console.log(service);
        this.solicitacao = service.id_solicitacao;
        this.contratante = service.id_contratante;
        this.prestador = service.id_prestador;
        this.dataInicio = service.data_inicio;
        this.dataConclusao = service.data_conclusao;
        this.valor = service.valor;
        this.status = service.status;
        this.observacao = service.observacao;

    }

    static create(service) {
        const instance = new ServiceModel(service);
        instance.status = instance.STATUS_EM_ANDAMENTO;
        console.log(instance);
        return instance; 
    }

    statusChangeForConcluded() {
        
        this.statusCanBeChange();
        this.addConcludedDate();

        this.status = this.STATUS_CONCLUIDO;
    }

    statusChangeForCanceled() {
        
        this.statusCanBeChange();
        this.addConcludedDate();
        
        this.status = this.STATUS_CANCELADO;
    }
    
    addConcludedDate() {
        this.dataConclusao = new Date();
    }

    statusCanBeChange() {
        if(!this.isActivated()) {
            throw new Error('Não pode alterar serviços finalizados');
        }
    }
    
    isActivated() {
        return this.status == this.STATUS_EM_ANDAMENTO;
    }
}

module.exports = ServiceModel;