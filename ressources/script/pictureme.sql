-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 11 déc. 2017 à 10:42
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pictureme`
--

-- --------------------------------------------------------

--
-- Structure de la table `photos`
--

DROP TABLE IF EXISTS `photos`;
CREATE TABLE IF NOT EXISTS `photos` (
  `mail` varchar(25) NOT NULL,
  `image` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `photos`
--

INSERT INTO `photos` (`mail`, `image`) VALUES
('test@gmail.com', 'test N°1'),
('tt@gmail.com', 'test N°1'),
('test@gmail.com', 'test N°2'),
('tt@gmail.com', 'test N°2');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `AdresseMail` varchar(25) NOT NULL,
  `MotDePasse` text NOT NULL,
  `Nom` varchar(25) NOT NULL,
  `Prénom` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `AdresseMail`, `MotDePasse`, `Nom`, `Prénom`) VALUES
(1, 'test@gmail.com', 'tested', 'kana', 'thithy'),
(2, 'thithy@gmail.com', 'dgdgf', 'tatoo', 'thth'),
(3, 'wassim-ajili@hotmail.fr', '$2a$10$vD44uOPk4k56wdznTrGgdOvWX8TTAjiT5uvo/wM.oxvK376.tloiy', 'Wassim Ajili', 'Wassim Ajili');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
