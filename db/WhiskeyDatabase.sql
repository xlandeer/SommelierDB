-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 27, 2022 at 06:55 AM
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
-- Database: `Whiskey`
--

-- --------------------------------------------------------

--
-- Table structure for table `whiskey_data`
--

CREATE TABLE `whiskey_data` (
  `id` int(11) NOT NULL,
  `image_url` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `distillery` varchar(100) NOT NULL,
  `origin_country` varchar(30) NOT NULL,
  `years_aged` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `additional_traits` varchar(200) NOT NULL,
  `author` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `whiskey_data`
--

INSERT INTO `whiskey_data` (`id`, `image_url`, `name`, `distillery`, `origin_country`, `years_aged`, `type`, `additional_traits`, `author`) VALUES
(27, 'images/buffalo_trace.jpeg', 'Buffalo Trace', 'Buffalo Trace', 'USA', 6, 'Kentucky Straight Bourbon', '45%', 'Alexander Joerges');

-- --------------------------------------------------------

--
-- Table structure for table `whiskey_note_nose`
--

CREATE TABLE `whiskey_note_nose` (
  `whiskey_id` int(11) NOT NULL,
  `note` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `whiskey_note_nose`
--

INSERT INTO `whiskey_note_nose` (`whiskey_id`, `note`) VALUES
(27, 'Honey'),
(27, 'little bit spice'),
(27, 'Sweet');

-- --------------------------------------------------------

--
-- Table structure for table `whiskey_note_taste`
--

CREATE TABLE `whiskey_note_taste` (
  `whiskey_id` int(11) NOT NULL,
  `note` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `whiskey_note_taste`
--

INSERT INTO `whiskey_note_taste` (`whiskey_id`, `note`) VALUES
(27, 'Caramel'),
(27, 'Oaky'),
(27, 'Orange');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `whiskey_data`
--
ALTER TABLE `whiskey_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `whiskey_note_nose`
--
ALTER TABLE `whiskey_note_nose`
  ADD PRIMARY KEY (`whiskey_id`,`note`);

--
-- Indexes for table `whiskey_note_taste`
--
ALTER TABLE `whiskey_note_taste`
  ADD PRIMARY KEY (`whiskey_id`,`note`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `whiskey_data`
--
ALTER TABLE `whiskey_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `whiskey_note_nose`
--
ALTER TABLE `whiskey_note_nose`
  ADD CONSTRAINT `FK_whiskey_id_nose` FOREIGN KEY (`whiskey_id`) REFERENCES `whiskey_data` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `whiskey_note_taste`
--
ALTER TABLE `whiskey_note_taste`
  ADD CONSTRAINT `FK_whiskey_id_taste` FOREIGN KEY (`whiskey_id`) REFERENCES `whiskey_data` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
