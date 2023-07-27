
class InvalidDate extends Error {
    
    constructor(dataInicial, dataFinal) {
        super();
        this.name = 'InvalidDate';
        this.message = `Data final [${dataFinal}] não pode ser menor que data incial [${dataInicial}]`;
    }

}

module.exports = InvalidDate;
