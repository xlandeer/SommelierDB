-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 29. Jul 2022 um 11:40
-- Server-Version: 10.4.24-MariaDB
-- PHP-Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `cocktail`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `cocktail`
--

CREATE TABLE `cocktail` (
  `id` int(11) NOT NULL,
  `cocktail_name` varchar(50) DEFAULT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `cocktail`
--

INSERT INTO `cocktail` (`id`, `cocktail_name`, `image_url`, `description`) VALUES
(30, 'Gin Tonic', 'https://www.kuriose-feiertage.de/wp-content/uploads/2020/04/Gin-Tonic-Tag-National-und-International-Gin-and-Tonic-Day-Kuriose-Feiertage-2020-Sven-Giese-2.jpg', ''),
(31, 'Mojito', 'https://www.liquor.com/thmb/0MKX9NxhPDzuVQLoNoMWfGQoSww=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/mojito-720x720-primary-6a57f80e200c412e9a77a1687f312ff7.jpg', ''),
(36, 'Mai Tai', 'https://image.essen-und-trinken.de/11952818/t/5L/v8/w960/r1/-/maitai-colourbox-jpg--65333-.jpg', ''),
(38, 'Daiquiri', 'https://spirituosenworld.de/images/cocktails/daiquiri-shortdrink.jpg.pagespeed.ce.J292uqz5P9.jpg', ''),
(112, 'Hurricane', 'images/16587006803484462828606009039113.jpg', 'Just mix everything in a shaker.'),
(113, 'Porters Punch', 'images/20220727_000453.jpg', 'Just mix everything in a shaker.');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ingredients`
--

CREATE TABLE `ingredients` (
  `cocktail_id` int(11) NOT NULL,
  `ingr_name` varchar(50) NOT NULL,
  `ingr_amt` int(11) DEFAULT NULL,
  `ingr_measure` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `ingredients`
--

INSERT INTO `ingredients` (`cocktail_id`, `ingr_name`, `ingr_amt`, `ingr_measure`) VALUES
(30, 'Gin', 2, 'oz'),
(30, 'Lime', 2, 'slices'),
(30, 'Tonic Water', 4, 'oz'),
(31, 'Ginger Ale to top', 1, 'times'),
(31, 'Lime', 1, 'slices'),
(31, 'Lime Juice', 20, 'ml'),
(31, 'Mint leaves', 3, 'times'),
(31, 'Simple Syrup', 15, 'ml'),
(31, 'White Rum', 2, 'oz'),
(36, 'Almond Syrup', 20, 'ml'),
(36, 'Brown Rum', 1, 'oz'),
(36, 'Lemon Juice', 10, 'ml'),
(36, 'Lime Juice', 20, 'ml'),
(36, 'Orange Juice', 80, 'ml'),
(38, 'Lime or Lemon Juice', 1, 'oz'),
(38, 'Simple Syrup', 20, 'ml'),
(38, 'White Rum', 2, 'oz'),
(112, 'Brown Rum', 1, 'oz'),
(112, 'Lime Juice', 20, 'ml'),
(112, 'Maracuja Syrup', 20, 'ml'),
(112, 'Orange Juice', 60, 'ml'),
(112, 'Pineapple Juice', 60, 'ml'),
(112, 'White Rum', 1, 'oz'),
(113, 'Brown Rum ', 1, 'oz'),
(113, 'Grenadine', 10, 'ml'),
(113, 'Lemon Juice', 1, 'oz'),
(113, 'Orange Juice ', 40, 'ml'),
(113, 'Simple Syrup', 10, 'ml'),
(113, 'White Rum ', 1, 'oz');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `cocktail`
--
ALTER TABLE `cocktail`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`cocktail_id`,`ingr_name`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `cocktail`
--
ALTER TABLE `cocktail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `FK_COCKTAIL_ID` FOREIGN KEY (`cocktail_id`) REFERENCES `cocktail` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
