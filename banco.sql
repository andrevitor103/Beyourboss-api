-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.28-0ubuntu0.20.04.3 - (Ubuntu)
-- OS do Servidor:               Linux
-- HeidiSQL Versão:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para beyourboss
CREATE DATABASE IF NOT EXISTS `beyourboss` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `beyourboss`;

-- Copiando estrutura para tabela beyourboss.budget
CREATE TABLE IF NOT EXISTS `budget` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_service_solicitation` int NOT NULL,
  `id_user` int NOT NULL,
  `valor` float NOT NULL DEFAULT '0',
  `data_inicial` date NOT NULL,
  `data_final` date NOT NULL,
  `observacao` text,
  `status` enum('PENDENTE','APROVADO','RECUSADO') NOT NULL DEFAULT 'PENDENTE',
  PRIMARY KEY (`id`),
  KEY `fk_solicitation_service_budget` (`id_service_solicitation`),
  CONSTRAINT `fk_solicitation_service_budget` FOREIGN KEY (`id_service_solicitation`) REFERENCES `service_solicitation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela beyourboss.budget: ~20 rows (aproximadamente)
/*!40000 ALTER TABLE `budget` DISABLE KEYS */;
INSERT INTO `budget` (`id`, `id_service_solicitation`, `id_user`, `valor`, `data_inicial`, `data_final`, `observacao`, `status`) VALUES
	(1, 1, 1, 120, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'RECUSADO'),
	(2, 1, 1, 120, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'RECUSADO'),
	(3, 1, 1, 120, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'RECUSADO'),
	(4, 1, 1, 400, '2022-04-24', '2022-04-24', 'nova descrição showw rapaa', 'APROVADO'),
	(5, 1, 1, 120, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'RECUSADO'),
	(6, 1, 1, 120, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'RECUSADO'),
	(7, 2, 1, 120, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'PENDENTE'),
	(8, 2, 1, 120, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'PENDENTE'),
	(9, 2, 1, 120, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'PENDENTE'),
	(10, 2, 1, 120, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'PENDENTE'),
	(11, 16, 1, 100, '2022-04-08', '2022-04-09', 'nova descrição showw rapaa', 'RECUSADO'),
	(12, 16, 1, 100, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'APROVADO'),
	(13, 16, 1, 100, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'RECUSADO'),
	(14, 16, 1, 100, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'RECUSADO'),
	(15, 16, 1, 100, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'PENDENTE'),
	(16, 16, 1, 100, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'PENDENTE'),
	(17, 16, 1, 100, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'PENDENTE'),
	(18, 16, 1, 100, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'PENDENTE'),
	(19, 16, 1, 100, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'PENDENTE'),
	(20, 16, 1, 100, '2022-04-08', '2022-04-09', 'Posso ir semana que vem ok', 'PENDENTE');
/*!40000 ALTER TABLE `budget` ENABLE KEYS */;

-- Copiando estrutura para tabela beyourboss.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela beyourboss.categoria: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` (`id`, `categoria`) VALUES
	(1, 'carpinteiro'),
	(2, 'jardineiro');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;

-- Copiando estrutura para tabela beyourboss.conta
CREATE TABLE IF NOT EXISTS `conta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela beyourboss.conta: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `conta` DISABLE KEYS */;
/*!40000 ALTER TABLE `conta` ENABLE KEYS */;

-- Copiando estrutura para tabela beyourboss.contato
CREATE TABLE IF NOT EXISTS `contato` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contato` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `numero_contato` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela beyourboss.contato: ~18 rows (aproximadamente)
/*!40000 ALTER TABLE `contato` DISABLE KEYS */;
INSERT INTO `contato` (`id`, `contato`, `numero_contato`) VALUES
	(1, '42998718769', 'André Vitor'),
	(2, 'testee', NULL),
	(3, 'testee', '1224'),
	(4, 'testee', '1224'),
	(5, 'testee', '1224'),
	(6, 'testee', '1224'),
	(7, 'testee', '1224'),
	(8, 'testee', '1224'),
	(9, 'testee', '1224'),
	(10, 'testee', '1224'),
	(11, 'testee', '1224'),
	(12, 'testee', '1224'),
	(13, 'testee', '1224'),
	(14, 'testee', '1224'),
	(15, 'testee', '1224'),
	(16, 'testee', '1224'),
	(17, 'testee', '1224'),
	(18, 'testee', '1224');
/*!40000 ALTER TABLE `contato` ENABLE KEYS */;

-- Copiando estrutura para tabela beyourboss.endereco
CREATE TABLE IF NOT EXISTS `endereco` (
  `id` int NOT NULL AUTO_INCREMENT,
  `CEP` varchar(8) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `UF` char(2) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `rua` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela beyourboss.endereco: ~37 rows (aproximadamente)
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` (`id`, `CEP`, `estado`, `UF`, `cidade`, `bairro`, `rua`) VALUES
	(1, '84430000', 'parana', 'PR', 'Imbituva', 'Centro', 'Rua João Guilherme Pugsley'),
	(2, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(3, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(4, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(5, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(6, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(7, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(8, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(9, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(10, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(11, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(12, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(13, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(14, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(15, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(16, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(17, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(18, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(19, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(20, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(21, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(22, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(23, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(24, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(25, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(26, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(27, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(28, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(29, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(30, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(31, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(32, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(33, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(34, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(35, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(36, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley'),
	(37, '84430000', 'Parana', 'PR', 'Imbituva', 'Jardim Paraiso', 'Rua João Guilherme Pugsley');
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;

-- Copiando estrutura para tabela beyourboss.ranking
CREATE TABLE IF NOT EXISTS `ranking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ranking` int NOT NULL,
  `id_service` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_service_ranking` (`id_service`),
  CONSTRAINT `fk_service_ranking` FOREIGN KEY (`id_service`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela beyourboss.ranking: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `ranking` DISABLE KEYS */;
INSERT INTO `ranking` (`id`, `ranking`, `id_service`) VALUES
	(1, 4, 28),
	(2, 4, 20),
	(3, 2, 26),
	(4, 4, 24),
	(5, 4, 14),
	(6, 4, 12);
/*!40000 ALTER TABLE `ranking` ENABLE KEYS */;

-- Copiando estrutura para tabela beyourboss.services
CREATE TABLE IF NOT EXISTS `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_solicitacao` int NOT NULL,
  `id_contratante` int NOT NULL,
  `id_prestador` int NOT NULL,
  `data_inicio` datetime NOT NULL,
  `data_conclusao` datetime DEFAULT NULL,
  `valor` float NOT NULL DEFAULT '0',
  `status` enum('EM ANDAMENTO','CONCLUIDO','CANCELADO') NOT NULL DEFAULT 'EM ANDAMENTO',
  `observacao` text,
  PRIMARY KEY (`id`),
  KEY `fk_service_solicitation_services` (`id_solicitacao`) USING BTREE,
  KEY `FK_services_user` (`id_contratante`),
  KEY `FK_services_user_2` (`id_prestador`),
  CONSTRAINT `fk_service_solicitation_services` FOREIGN KEY (`id_solicitacao`) REFERENCES `service_solicitation` (`id`),
  CONSTRAINT `FK_services_user` FOREIGN KEY (`id_contratante`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_services_user_2` FOREIGN KEY (`id_prestador`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela beyourboss.services: ~27 rows (aproximadamente)
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` (`id`, `id_solicitacao`, `id_contratante`, `id_prestador`, `data_inicio`, `data_conclusao`, `valor`, `status`, `observacao`) VALUES
	(1, 1, 1, 1, '2022-04-22 00:00:00', NULL, 100, 'EM ANDAMENTO', ''),
	(2, 1, 2, 1, '2022-04-22 00:00:00', '2022-04-23 10:13:16', 100, 'EM ANDAMENTO', ''),
	(3, 1, 1, 1, '2022-04-22 00:00:00', NULL, 100, 'EM ANDAMENTO', ''),
	(4, 1, 1, 1, '2022-04-22 00:00:00', '2022-04-23 10:13:20', 100, 'CANCELADO', ''),
	(5, 1, 1, 1, '2022-04-22 00:00:00', NULL, 100, 'EM ANDAMENTO', ''),
	(6, 1, 1, 1, '2022-04-22 00:00:00', '2022-04-22 00:00:00', 100, 'CANCELADO', NULL),
	(7, 1, 1, 1, '2022-04-22 00:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(8, 1, 1, 2, '2022-04-22 00:00:00', '2022-04-22 21:37:06', 100, 'CANCELADO', NULL),
	(9, 1, 1, 1, '2022-04-22 00:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(12, 1, 1, 1, '2022-04-22 00:00:00', '2022-04-22 21:37:50', 100, 'CONCLUIDO', NULL),
	(13, 1, 1, 1, '2022-04-22 00:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(14, 1, 1, 1, '2022-04-22 00:00:00', '2022-04-22 21:38:07', 100, 'CONCLUIDO', NULL),
	(15, 1, 1, 1, '2022-04-22 10:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(16, 1, 1, 1, '2022-04-22 10:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(17, 1, 1, 1, '2022-04-22 10:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(18, 1, 1, 1, '2022-04-22 10:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(19, 1, 1, 1, '2022-04-22 10:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(20, 1, 1, 1, '2022-04-22 10:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(21, 1, 1, 1, '2022-04-22 10:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(22, 1, 1, 1, '2022-04-22 10:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(23, 1, 1, 1, '2022-04-22 10:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(24, 1, 1, 1, '2022-04-22 10:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(25, 1, 2, 1, '2022-04-24 00:00:00', NULL, 400, 'EM ANDAMENTO', NULL),
	(26, 1, 2, 1, '2022-04-24 00:00:00', NULL, 400, 'EM ANDAMENTO', NULL),
	(27, 16, 1, 1, '2022-04-08 00:00:00', NULL, 100, 'EM ANDAMENTO', NULL),
	(28, 1, 2, 1, '2022-04-24 00:00:00', NULL, 400, 'EM ANDAMENTO', NULL),
	(29, 16, 1, 1, '2022-04-08 00:00:00', NULL, 100, 'EM ANDAMENTO', NULL);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;

-- Copiando estrutura para tabela beyourboss.service_solicitation
CREATE TABLE IF NOT EXISTS `service_solicitation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_categoria` int NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `nivel_prioridade` varchar(100) NOT NULL,
  `valor` float NOT NULL DEFAULT '0',
  `status` enum('ATIVO','ENCERRADO','CANCELADO') NOT NULL DEFAULT 'ATIVO',
  PRIMARY KEY (`id`),
  KEY `FK_service_solicitation_user` (`id_usuario`),
  KEY `fk_service_solicitation_categoria` (`id_categoria`),
  CONSTRAINT `fk_service_solicitation_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_service_solicitation_user` FOREIGN KEY (`id_usuario`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela beyourboss.service_solicitation: ~26 rows (aproximadamente)
/*!40000 ALTER TABLE `service_solicitation` DISABLE KEYS */;
INSERT INTO `service_solicitation` (`id`, `id_usuario`, `id_categoria`, `titulo`, `descricao`, `nivel_prioridade`, `valor`, `status`) VALUES
	(1, 2, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ENCERRADO'),
	(2, 1, 2, 'Procura-se carpinteiro', 'boaa rapaa', 'MEDIA', 100, 'ATIVO'),
	(3, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(4, 2, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'CANCELADO'),
	(5, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(6, 1, 2, 'Procura-se carpinteiro', 'boaa rapaa', 'MEDIA', 100, 'ATIVO'),
	(7, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(8, 2, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ENCERRADO'),
	(9, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(10, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ENCERRADO'),
	(11, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(12, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(13, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(14, 15, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(15, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(16, 15, 2, 'Procura-se carpinteiro', 'boaa rapaasss', 'MEDIA', 120, 'ENCERRADO'),
	(17, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(18, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(19, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(20, 16, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(21, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(22, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(23, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(24, 16, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(25, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO'),
	(26, 1, 2, 'Procura-se carpinteiro', 'Procuro um carpinteiro bom', 'MEDIA', 100, 'ATIVO');
/*!40000 ALTER TABLE `service_solicitation` ENABLE KEYS */;

-- Copiando estrutura para tabela beyourboss.status
CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` enum('PENDENTE','APROVADO','RECUSADO') DEFAULT 'PENDENTE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela beyourboss.status: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` (`id`, `descricao`) VALUES
	(1, 'PENDENTE');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;

-- Copiando estrutura para tabela beyourboss.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `nome_usuario` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `id_endereco` int NOT NULL,
  `id_contato` int NOT NULL,
  `foto` varchar(100) NOT NULL,
  `descricao` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela beyourboss.user: ~16 rows (aproximadamente)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `nome`, `nome_usuario`, `email`, `senha`, `id_endereco`, `id_contato`, `foto`, `descricao`) VALUES
	(1, 'André Vitor', 'andrevitor103', 'andrevitor103@gmail.com', '1234', 16, 6, 'https://i.pinimg.com/originals/3c/14/71/3c147108b75f74b3eae82639f2a0e15b.jpg', NULL),
	(2, 'carlos', 'carlos', 'carlos@gmail.com', '1234', 0, 0, '', ''),
	(3, 'testee', 'testee', 'teste@gmail.com', '1234', 15, 0, '', ''),
	(4, 'testee', 'testee', 'teste@gmail.com', '1234', 16, 0, '', ''),
	(5, 'testee', 'testee', 'teste@gmail.com', '1234', 17, 0, '', ''),
	(6, 'testee', 'testee', 'teste@gmail.com', '1234', 18, 0, '', ''),
	(7, 'testee', 'testee', 'teste@gmail.com', '1234', 19, 0, '', ''),
	(8, 'testee', 'testee', 'teste@gmail.com', '1234', 24, 5, 'https://i.pinimg.com/originals/3c/14/71/3c147108b75f74b3eae82639f2a0e15b.jpg', NULL),
	(9, 'testee', 'testee', 'teste@gmail.com', '1234', 25, 6, 'https://i.pinimg.com/originals/3c/14/71/3c147108b75f74b3eae82639f2a0e15b.jpg', NULL),
	(10, 'testee', 'testee', 'teste@gmail.com', '1234', 26, 7, 'https://i.pinimg.com/originals/3c/14/71/3c147108b75f74b3eae82639f2a0e15b.jpg', NULL),
	(11, 'testee', 'testee', 'teste@gmail.com', '1234', 27, 8, 'https://i.pinimg.com/originals/3c/14/71/3c147108b75f74b3eae82639f2a0e15b.jpg', NULL),
	(12, 'testee', 'testee', 'teste@gmail.com', '1234', 28, 9, 'https://i.pinimg.com/originals/3c/14/71/3c147108b75f74b3eae82639f2a0e15b.jpg', NULL),
	(13, 'testee', 'testee', 'teste@gmail.com', '1234', 32, 13, 'https://i.pinimg.com/originals/3c/14/71/3c147108b75f74b3eae82639f2a0e15b.jpg', NULL),
	(14, 'testee', 'testee', 'teste@gmail.com', '1234', 33, 14, 'https://i.pinimg.com/originals/3c/14/71/3c147108b75f74b3eae82639f2a0e15b.jpg', NULL),
	(15, 'testee', 'testee', 'teste@gmail.com', '1234', 36, 17, 'https://i.pinimg.com/originals/3c/14/71/3c147108b75f74b3eae82639f2a0e15b.jpg', NULL),
	(16, 'testee', 'testee', 'teste@gmail.com', '1234', 37, 18, 'https://i.pinimg.com/originals/3c/14/71/3c147108b75f74b3eae82639f2a0e15b.jpg', NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Copiando estrutura para tabela beyourboss.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  `telefone` varchar(40) DEFAULT NULL,
  `cep` varchar(8) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `uf` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela beyourboss.usuario: ~45 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `telefone`, `cep`, `cidade`, `uf`) VALUES
	(1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(3, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(5, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(6, 'André Vitor', NULL, NULL, NULL, NULL, NULL, NULL),
	(7, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(8, 'André Vitor', NULL, NULL, NULL, NULL, NULL, NULL),
	(9, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(10, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(11, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(12, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(13, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(14, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(16, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(18, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(19, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(20, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(21, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(22, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(23, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(24, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(25, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(26, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(27, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(28, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(29, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(30, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(31, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(32, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(33, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(34, 'André Vitor', 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(36, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(38, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(40, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(41, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(42, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(43, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(44, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(46, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(48, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(50, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(52, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(53, NULL, 'andrevitor@gmail.com', '1234', NULL, NULL, NULL, NULL),
	(54, NULL, 'andrevitor@gmail.com', '123456', NULL, NULL, NULL, NULL),
	(55, NULL, 'andrevitor@gmail.com', '123456', NULL, NULL, NULL, NULL),
	(56, NULL, 'andrevitor@gmail.com', '123456', NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
