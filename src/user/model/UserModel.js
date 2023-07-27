
class UserModel {

    constructor(user) {
        this.nome = user.nome;
        this.nomeUsuario = user.nome_usuario;
        this.email = user.email;
        this.senha = user.senha;
        this.endereco = user.id_endereco;
        this.contato = user.id_contato;
        this.foto = user?.foto;
        this.descricao = user?.descricao;
        /*
        "nome": "carlos santos",
        "nome_usuario": "carlos"
        "email": "carlos@mail.com",
        "senha": "1234",
        */
       /*
                            Perfil
            nome, endereco, contato, ranking, foto, descricao, id_conta
            - cadastrar
            - editar nome, alterar endereco, editar contatos, descrição e foto
            - deletar
            - servico para calcular ranking

                            Conta
            nome_usuario, senha, email, id_gmail
            - cadastrar
            - editar nome_usuario, senha, email
            - realizar login
            - realizar login com gmail
            - recuperar conta (passando código por email)

            - Solução controle de ranking: criar uma tabela onde em todo serviço finalizado,
            - deve-se solicitar para o contratante avaliar de 0 a 5 o serviço prestado
            - e registrar o código do prestador e avaliação na tabela de ranking, com essa
            - tabela pode ser tirado a média desse prestador
       */
    }

     static async create(data) {
        this.validation();
        const user = new UserModel(data);
        return user;
    }

    static validation() {
        return true;
    }
}

module.exports = UserModel;
