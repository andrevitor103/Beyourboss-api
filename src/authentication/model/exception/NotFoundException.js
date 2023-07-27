class NotFoundException extends Error 
{
    constructor(mensagem) {
        super(mensagem);
        this.name = 'NotFoundException';
      }
}

module.exports = {
        NotFoundException
};
