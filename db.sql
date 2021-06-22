-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 22, 2021 at 12:54 PM
-- Server version: 10.4.18-MariaDB-1:10.4.18+maria~bionic
-- PHP Version: 7.2.34-18+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aangan_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `isMarked` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `date`, `isMarked`, `created_at`, `updated_at`) VALUES
(18, '2021-06-22', 1, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-06-23', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-06-24', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-06-25', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-06-26', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-06-27', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-06-28', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-06-29', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-06-30', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-01', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-02', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-03', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-04', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-05', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-06', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-07', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-08', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-09', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-10', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-11', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-12', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-13', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-14', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-15', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-16', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-17', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-18', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-19', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-20', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(18, '2021-07-21', 0, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(19, '2021-06-22', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-06-23', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-06-24', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-06-25', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-06-26', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-06-27', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-06-28', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-06-29', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-06-30', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-01', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-02', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-03', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-04', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-05', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-06', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-07', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-08', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-09', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-10', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-11', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-12', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-13', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-14', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-15', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-16', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-17', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-18', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-19', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-20', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02'),
(19, '2021-07-21', 0, '2021-06-22 07:32:02', '2021-06-22 07:32:02');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('BBbaisG8jp13ker79UPGcp1YtsMaFob0', 1624433605, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"domain\":\"localhost\",\"path\":\"/\"},\"passport\":{\"user\":{\"id\":19,\"username\":\"kabeer\",\"email\":\"kabeer@admin.com\",\"status\":1}}}');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` bigint(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `username`, `password`, `mobile`, `status`, `created_at`, `updated_at`) VALUES
(18, 'ahmed@admin.com', 'ahmed', '$2b$10$vtkuNOoHv4qkJYAwSnCYQeYkJ.B4.LUYPEO7dKy3Ex.HeeYg0Wb5S', NULL, 1, '2021-06-22 06:54:11', '2021-06-22 06:54:11'),
(19, 'kabeer@admin.com', 'kabeer', '$2b$10$FIBzVwXxeHptYak9oGK7O.qfJInE7.eHvmFfsXgCSqt2LDFnZgnr.', NULL, 1, '2021-06-22 07:32:02', '2021-06-22 07:32:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD KEY `id` (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;