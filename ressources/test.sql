-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Jeu 04 Janvier 2018 à 21:07
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

-- --------------------------------------------------------

--
-- Structure de la table `photos`
--

CREATE TABLE `photos` (
  `id_photo` int(11) NOT NULL,
  `description` varchar(250) NOT NULL,
  `id_user` text NOT NULL,
  `photo_url` varchar(250) NOT NULL,
  `dateHeure` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `photos`
--

INSERT INTO `photos` (`id_photo`, `description`, `id_user`, `photo_url`, `dateHeure`) VALUES
(1, 'Voici la photo N°1', 'test', 'uploads/myImage-1515096337743.jpg', '2018-01-04 20:05:37'),
(2, 'Voici la photo N°2', 'test', 'uploads/myImage-1515096346906.jpg', '2018-01-04 20:05:46'),
(3, 'Voici la photo N°3', 'test', 'uploads/myImage-1515096381245.jpg', '2018-01-04 20:06:21'),
(4, 'Voici la photo N°4', 'test', 'uploads/myImage-1515096391693.jpg', '2018-01-04 20:06:31'),
(5, '', 'test', 'uploads/myImage-1515096397262.jpg', '2018-01-04 20:06:37');

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
(3, 'kt@gmail.com', '$2a$10$0DMCnwUbqFGwlLJyFlaYnOTOXBslSadnbhXjNdyE4X47sgL1mN2w6', 'Thiepthy', 'thithy'),
(4, 'kt@gmail.com', '$2a$10$yhaGNvLcWiNhDQzDofWTPuXf2K4.o.aH0RUCp4D3yaxH/HFfm2Plu', 'thiepthy', 'titi');

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
-- AUTO_INCREMENT pour la table `photos`
--
ALTER TABLE `photos`
  MODIFY `id_photo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(32) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
