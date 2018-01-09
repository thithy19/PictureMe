-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Mar 09 Janvier 2018 à 16:15
-- Version du serveur :  5.5.42
-- Version de PHP :  7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `test`
--

-- --------------------------------------------------------

--
-- Structure de la table `friends`
--

CREATE TABLE `friends` (
  `id_user` int(25) NOT NULL,
  `id_friend` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `friends`
--

INSERT INTO `friends` (`id_user`, `id_friend`) VALUES
(2, 1),
(2, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Structure de la table `photos`
--

CREATE TABLE `photos` (
  `id_photo` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  `id_user` text NOT NULL,
  `photo_url` varchar(250) NOT NULL,
  `dateHeure` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `photos`
--

INSERT INTO `photos` (`id_photo`, `description`, `id_user`, `photo_url`, `dateHeure`) VALUES
('76i7q1', 'wahooooo', '3', 'uploads/myImage-1515494271126.jpeg', '2018-01-09 10:37:51'),
('80aso3', 'Mickey il est beau', '3', 'uploads/myImage-1515494290325.png', '2018-01-09 10:38:10'),
('fxehep', 'Photo prise en 2017', '2', 'uploads/myImage-1515493912268.jpg', '2018-01-09 10:31:52'),
('gbsch8', 'Game of Throne 1', '1', 'uploads/myImage-1515494144873.jpeg', '2018-01-09 10:35:44'),
('ilt57k', 'il a froid', '1', 'uploads/myImage-1515494178139.jpeg', '2018-01-09 10:36:18'),
('jyhjfr', 'Durant mes vacances de 2015', '2', 'uploads/myImage-1515509268709.jpg', '2018-01-09 14:47:48'),
('o4m6ki', 'Je l''ai prise de notre rosier', '2', 'uploads/myImage-1515493885756.jpg', '2018-01-09 10:31:25'),
('qsa8n6', 'J''ai peur', '1', 'uploads/myImage-1515494168979.jpeg', '2018-01-09 10:36:08'),
('ri0gg7', 'Les oiseaux chez moi !', '2', 'uploads/myImage-1515507488979.jpg', '2018-01-09 14:18:08'),
('sa761z', 'Elle est trop belle', '1', 'uploads/myImage-1515494157274.jpeg', '2018-01-09 10:35:57'),
('teddbk', 'hihihihihi', '3', 'uploads/myImage-1515494248101.jpeg', '2018-01-09 10:37:28'),
('vq5cdw', 'je les adoressss', '3', 'uploads/myImage-1515494262054.jpeg', '2018-01-09 10:37:42');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(32) NOT NULL,
  `mail` varchar(25) DEFAULT NULL,
  `password` text NOT NULL,
  `name` varchar(25) NOT NULL,
  `pseudo` varchar(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id_user`, `mail`, `password`, `name`, `pseudo`) VALUES
(1, 'wassim-ajili@hotmail.fr', '$2a$10$W1mvsulsbMXkY3yith5ZyOQd9WHYKwcvAmANjlc3Wexn5SLn9.htS', 'Wassim Ajili', 'wass'),
(2, 'kt@gmail.com', '$2a$10$Olr6FtjXtSgmi4r8v8p5LOEc8df/6G2g2Tix21YuG61yNUdJ0L75m', 'Thiepthy KANAGASABAI', 'thithy91'),
(3, 'jena@gmail.com', '$2a$10$6mqaxL0MaaJ.741ZhZzZm.F5rN3XFV1xPZYo4oYg24qVKEsasyQom', 'Jenourthika JEYAKUMAR', 'jena'),
(4, 'ami@hotmail.fr', '$2a$10$SsvmEAFXZxvkmuInbIf5auqTD8bossuKBXHDOZYSvZrW8OaA5qLce', 'Aminata CISSE', 'amidado');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id_friend`);

--
-- Index pour la table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id_photo`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(32) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
