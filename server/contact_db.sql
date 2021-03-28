-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 28, 2021 at 10:57 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contact_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Contact`
--

CREATE TABLE `Contact` (
  `contactID` int(11) NOT NULL,
  `firstName` varchar(60) NOT NULL,
  `lastName` varchar(60) NOT NULL,
  `email` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Contact`
--

INSERT INTO `Contact` (`contactID`, `firstName`, `lastName`, `email`) VALUES
(1, 'John', 'Doe', 'john.doe@gmail.com'),
(2, 'Hieu', 'Le', 'hieu.le@gmail.com'),
(3, 'Gurjit', 'Singh', 'gurjit@gmail.com'),
(14, 'John', 'Cena', 'cena@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Location`
--

CREATE TABLE `Location` (
  `contactID` int(11) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `street` varchar(60) NOT NULL,
  `city` varchar(20) NOT NULL,
  `province` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Location`
--

INSERT INTO `Location` (`contactID`, `zipcode`, `street`, `city`, `province`, `country`) VALUES
(1, 'v2s 2t1', '158 12th Ave', 'Surrey', 'British Columbia', 'Canada'),
(2, 'v2t d2a', '33058 King Road', 'Abbotsford', 'British Columbia', 'Canada'),
(3, '1q2 2t6', '200 South Fraser Way', 'Abbotsford', 'British Columbia', 'Canada'),
(14, '1a4 6vb', '102 Marshall Rd', 'Abbotsford', 'British Columbia', 'Canada');

-- --------------------------------------------------------

--
-- Table structure for table `Phone_Numbers`
--

CREATE TABLE `Phone_Numbers` (
  `phoneID` int(11) NOT NULL,
  `contactID` int(11) NOT NULL,
  `number` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Phone_Numbers`
--

INSERT INTO `Phone_Numbers` (`phoneID`, `contactID`, `number`) VALUES
(1, 1, '123-456-7890'),
(2, 1, '122-888-9999'),
(3, 2, '604-855-999'),
(5, 3, '778-123-8889'),
(8, 14, '604-584-2955');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Contact`
--
ALTER TABLE `Contact`
  ADD PRIMARY KEY (`contactID`);

--
-- Indexes for table `Location`
--
ALTER TABLE `Location`
  ADD PRIMARY KEY (`contactID`,`zipcode`);

--
-- Indexes for table `Phone_Numbers`
--
ALTER TABLE `Phone_Numbers`
  ADD PRIMARY KEY (`phoneID`),
  ADD KEY `contactID` (`contactID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Contact`
--
ALTER TABLE `Contact`
  MODIFY `contactID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Phone_Numbers`
--
ALTER TABLE `Phone_Numbers`
  MODIFY `phoneID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Location`
--
ALTER TABLE `Location`
  ADD CONSTRAINT `Location_ibfk_1` FOREIGN KEY (`contactID`) REFERENCES `Contact` (`contactID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Phone_Numbers`
--
ALTER TABLE `Phone_Numbers`
  ADD CONSTRAINT `Phone_Numbers_ibfk_1` FOREIGN KEY (`contactID`) REFERENCES `Contact` (`contactID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
