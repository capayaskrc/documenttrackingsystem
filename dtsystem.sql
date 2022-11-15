/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 10.4.24-MariaDB : Database - dtsystem
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dtsystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `dtsystem`;

/*Table structure for table `document_fields` */

DROP TABLE IF EXISTS `document_fields`;

CREATE TABLE `document_fields` (
  `dtnumber` varchar(100) NOT NULL,
  `document_title` varchar(100) DEFAULT NULL,
  `doc_type` varchar(100) DEFAULT NULL,
  `document_origin` varchar(100) DEFAULT NULL,
  `date_recieved` varchar(100) DEFAULT NULL,
  `document_destination` varchar(100) DEFAULT NULL,
  `tag` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`dtnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `document_fields` */

/*Table structure for table `user_info` */

DROP TABLE IF EXISTS `user_info`;

CREATE TABLE `user_info` (
  `userid` varchar(100) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `profile_picture` bit(64) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_info` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
