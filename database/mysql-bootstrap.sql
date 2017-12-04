SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `report` (
  `report_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `day_of_week` enum('MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY') NOT NULL,
  `store_location` enum('LOSEY BLVD.','PEARL ST.') NOT NULL,
  `hours_worked` float NOT NULL,
  `total_tips` float NOT NULL,
  `gas_money` float NOT NULL,
  `profit` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `report` (`report_id`, `date`, `day_of_week`, `store_location`, `hours_worked`, `total_tips`, `gas_money`, `profit`) VALUES(1, '2017-01-27', 'FRIDAY', 'LOSEY BLVD.', 6.68, 31, 10, 21);
INSERT INTO `report` (`report_id`, `date`, `day_of_week`, `store_location`, `hours_worked`, `total_tips`, `gas_money`, `profit`) VALUES(2, '2017-01-27', 'SUNDAY', 'LOSEY BLVD.', 6.68, 31, 10, 21);
INSERT INTO `report` (`report_id`, `date`, `day_of_week`, `store_location`, `hours_worked`, `total_tips`, `gas_money`, `profit`) VALUES(3, '2017-01-27', 'SUNDAY', 'LOSEY BLVD.', 6.68, 222, 666, 21);
INSERT INTO `report` (`report_id`, `date`, `day_of_week`, `store_location`, `hours_worked`, `total_tips`, `gas_money`, `profit`) VALUES(4, '2017-01-27', 'SUNDAY', 'LOSEY BLVD.', 6.68, 31, 10, 21);
INSERT INTO `report` (`report_id`, `date`, `day_of_week`, `store_location`, `hours_worked`, `total_tips`, `gas_money`, `profit`) VALUES(5, '2017-01-27', 'SUNDAY', 'LOSEY BLVD.', 6.68, 31, 10, 21);


ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`) USING BTREE;


ALTER TABLE `report`
  MODIFY `report_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;