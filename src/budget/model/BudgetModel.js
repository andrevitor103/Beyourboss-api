const InvalidDate = require('./exception/InvalidDate');

class BudgetModel {

    PENDENTE = 'PENDENTE';
    APROVADO = 'APROVADO';
    RECUSADO = 'RECUSADO';

    constructor(budget)
    {
        this.servico = budget.servico;
        this.user = budget.user;
        this.valor = budget.valor;
        this.dataInicial = budget.data_inicial;
        this.dataFinal = budget.data_final;
        this.observacao = budget.observacao;
        this.status = budget.status ?? this.PENDENTE;
        this.estimativa = this._calcularEstimativa();
        this._validate();
    }

    getServico() {
        return this.servico;
    }

    getUser() {
        return this.user;
    }

    getValor() {
        return this.valor;
    }

    getDataInicial() {
        return this.dataInicial;
    }

    getDataFinal() {
        return this.dataFinal;
    }

    getObservacao() {
        return this.observacao;
    }

    getStatus() {
        return this.status;
    }

    statusChange(status) {
        
        if(this.status != this.PENDENTE) {
            throw new Error('Orçamentos devem estar pendentes para mudarem de status');
        }

        switch(status) {
            case this.APROVADO: 
                this.statusChangeToAcceted();
                break;
            case this.RECUSADO:
                this.statusChangeToDeclined();
                break;
        }
    }

    statusChangeToAcceted() {
        this.status = this.APROVADO;
    }

    statusChangeToDeclined() {   
        this.status = this.RECUSADO;
    }

    update(data) {
        if(data.status) {
            this.statusChange(data.status);
        }
    }

    _calcularEstimativa() {
        return this.dataFinal - this.dataInicial;
    }

    _validate() {
        if(!this.servico) {
            throw new Error("ID do serviço obrigatório");
        }    
        if(this.dataFinal < this.dataInicial) {
            throw new InvalidDate(this.dataInicial, this.dataFinal);
        }        
    }
}

module.exports = BudgetModel;
