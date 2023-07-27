
class ServiceSolicitationValidation {
    validation() {
        return {
            'id_usuario': 'required',
            'id_categoria': 'required',
            'titulo': 'required|max:100',
            'descricao': 'required|min:10',
            'nivel_prioridade': 'required|in:ALTA,MEDIA,BAIXA'
        };
    }
}

module.exports = new ServiceSolicitationValidation;