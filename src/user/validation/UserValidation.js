
class UserValidation {
    validation() {
        return {
            'cep': 'required',
            'estado': 'required',
            'uf': 'required',
            'cidade': 'required',
            'bairro': 'required',
            'rua': 'required',
            'email': 'required|email',
            'nome': 'required',
            'nome_usuario': 'required',
            'senha': 'required',
            'contato': 'required',
            'numero_contato': 'required'
        };
    }
}

module.exports = new UserValidation;