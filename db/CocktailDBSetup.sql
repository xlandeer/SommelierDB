-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 06, 2022 at 11:54 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Cocktail`
--

-- --------------------------------------------------------

--
-- Table structure for table `cocktail`
--

CREATE TABLE `cocktail` (
  `id` int(11) NOT NULL,
  `cocktail_name` varchar(50) DEFAULT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cocktail`
--

INSERT INTO `cocktail` (`id`, `cocktail_name`, `image_url`, `description`) VALUES
(30, 'Gin Tonic', 'https://www.kuriose-feiertage.de/wp-content/uploads/2020/04/Gin-Tonic-Tag-National-und-International-Gin-and-Tonic-Day-Kuriose-Feiertage-2020-Sven-Giese-2.jpg', ''),
(31, 'Mojito', 'https://www.liquor.com/thmb/0MKX9NxhPDzuVQLoNoMWfGQoSww=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/mojito-720x720-primary-6a57f80e200c412e9a77a1687f312ff7.jpg', ''),
(36, 'Mai Tai', 'https://image.essen-und-trinken.de/11952818/t/5L/v8/w960/r1/-/maitai-colourbox-jpg--65333-.jpg', ''),
(38, 'Daiquiri', 'https://spirituosenworld.de/images/cocktails/daiquiri-shortdrink.jpg.pagespeed.ce.J292uqz5P9.jpg', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cocktail`
--
ALTER TABLE `cocktail`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cocktail`
--
ALTER TABLE `cocktail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
