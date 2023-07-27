
CREATE TABLE `ranking` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`ranking` INT(10) NOT NULL,
	`id_service` INT(10) NOT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `fk_service_ranking` (`id_service`) USING BTREE,
	CONSTRAINT `fk_service_ranking` FOREIGN KEY (`id_service`) REFERENCES `beyourboss`.`services` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=3
;

CREATE TABLE services(
    id int not null PRIMARY KEY AUTO_INCREMENT,
    id_solicitation int not null,
    id_contratante int not null,
    id_prestador int not null,
    data_inicio date not null,
    data_conclusao date,
    valor float not null default 0,
    status ENUM('EM ANDAMENTO', 'CONCLUIDO', 'CANCELADO') not null default 'EM ANDAMENTO',
    observacao text,
    CONSTRAINT fk_service_solicitation_services FOREIGN KEY(id_solicitation) references service_solicitation(id),
    CONSTRAINT fk_contratante_services FOREIGN KEY(id_contrante) references usuario(id),
    CONSTRAINT fk_prestador_services FOREIGN KEY(id_prestador) references usuario(id)
);

/*
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

CREATE TABLE service_solicitation(
    id int not null PRIMARY KEY AUTO_INCREMENT,
    id_usuario int not null,
    id_categoria int not null,
    titulo varchar(100) not null,
    descricao text not null,
    id_endereco int not null,
    id_contato int not null,
    nivel_prioridade ENUM('BAIXA', 'MEDIA', 'ALTA') not null default 'BAIXA',
    valor float not null default 0,
    status ENUM('ATIVO', 'ENCERRADO', 'CANCELADO') not null default 'ATIVO',
    CONSTRAINT fk_service_solicitation_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id),
    CONSTRAINT fk_service_solicitation_categoria FOREIGN KEY(id_categoria) REFERENCES categoria(id),
    CONSTRAINT fk_service_solicitation_endereco FOREIGN KEY(id_endereco) REFERENCES endereco(id),
    CONSTRAINT fk_service_solicitation_contato FOREIGN KEY(id_contato) REFERENCES contato(id)
);

CREATE  TABLE status(
    id int PRIMARY KEY AUTO_INCREMENT,
    descricao ENUM('PENDENTE', 'APROVADO', 'RECUSADO') NOT NULL default 'PENDENTE'
);

CREATE TABLE budget(
    id int PRIMARY KEY AUTO_INCREMENT,
    id_service_solicitation int NOT NULL,
    id_user int NOT NULl,
    valor float NOT NULL default 0,
    data_inicial date NOT NULL,
    data_final date NOT NULL,
    observacao text,
    id_status int,
    CONSTRAINT fk_solicitation_service_budget FOREIGN KEY(id_service_solicitation) REFERENCES service_solicitation(id),
    CONSTRAINT fk_status_budget FOREIGN KEY(id_status) REFERENCES status(id)
);

CREATE TABLE user(
    id int NOT NULL PRIMARY KEY,
    nome varchar(100) NOT NULL,
    nome_usuario varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    senha varchar(100) NOT NULL
);

CREATE TABLE endereco(
    id int PRIMARY KEY AUTO_INCREMENT,
    CEP varchar(8) NOT NULL,
    estado varchar(100) NOT NULL,
    UF char(2) NOT NULL,
    cidade varchar(100) NOT NULL,
    bairro varchar(100) NOT NULL,
    rua varchar(100) NOT NULL,
    id_user int NOT NULL,
    CONSTRAINT fk_user_endereco FOREIGN KEY(id_user) REFERENCES user(id)
);

CREATE TABLE contato(
    id int PRIMARY KEY AUTO_INCREMENT,
    celular varchar(20) NOT NULL,
    id_user int NOT NULL,
    CONSTRAINT fk_user_contato FOREIGN KEY(id_user) REFERENCES user(id)
);

CREATE TABLE categoria(
    id int PRIMARY KEY AUTO_INCREMENT,
    categoria varchar(100) NOT NULL  
);

