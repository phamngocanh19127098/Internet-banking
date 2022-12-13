CREATE DATABASE IF NOT EXISTS `internet_banking` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `internet_banking`;

--
-- Table structure for table `user`
--
CREATE TABLE IF NOT EXISTS `user` (
                                          `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                          `username` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
                                          `name` varchar(300) CHARACTER SET utf8mb4 DEFAULT NULL,
                                          `password` longtext DEFAULT NULL,
                                          `refresh_token` longtext DEFAULT NULL,
                                          `email` varchar(300) CHARACTER SET utf8mb4 NOT NULL,
										  `bdate` date DEFAULT NULL,
                                          `phone` varchar(20) DEFAULT NULL,
                                          `address` varchar(300) CHARACTER SET utf8mb4 DEFAULT NULL,
                                          `role` ENUM('admin','employee','customer') NOT NULL,
                                          `status` tinyint(2) NOT NULL DEFAULT '0',
                                          `created_by` bigint(20) DEFAULT NULL,
                                          `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                          `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                          PRIMARY KEY (`id`),
                                          UNIQUE INDEX `unique_username` (`username` ASC) VISIBLE,
                                          UNIQUE INDEX `unique_email` (`email` ASC) VISIBLE
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 ;

--
-- Table structure for table `account`
--
CREATE TABLE IF NOT EXISTS `account` (
                                         `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                         `customer_id` bigint(20) NOT NULL,
                                         `current_balance` double DEFAULT NULL,
                                         `status` tinyint(2) NOT NULL DEFAULT '1',
                                         `account_type` tinyint(2) NOT NULL DEFAULT '1',
                                         `created_by` bigint(20) NOT NULL,
                                         `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                         `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                         PRIMARY KEY (`id`),
                                         UNIQUE INDEX `unique_account` (`customer_id` ASC, `account_type` ASC) VISIBLE
) ENGINE=InnoDB AUTO_INCREMENT=1000000000 DEFAULT CHARSET=utf8mb4 ;

--
-- Table structure for table `affiliated_bank`
--
CREATE TABLE IF NOT EXISTS `affiliated_bank` (
                                         `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                         `name` varchar(300) CHARACTER SET utf8mb4 NOT NULL,
                                         `slug` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
                                         `public_key` longtext NOT NULL,
                                         `crypto_type` tinyint(2) NOT NULL,
										 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                         `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                         PRIMARY KEY (`id`),
                                         UNIQUE INDEX `unique_slug_bank` (`slug` ASC) VISIBLE
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 ;

--
-- Table structure for table `saved_beneficiary`
--
CREATE TABLE IF NOT EXISTS `saved_beneficiary` (
                                         `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                         `customer_id` bigint(20) NOT NULL,
                                         `beneficiary_account_number` bigint(20) NOT NULL,
                                         `beneficiary_default_name` varchar(300) NOT NULL,
                                         `beneficiary_nickname` varchar(300) NOT NULL,
                                         `beneficiary_bank_id` bigint(20) DEFAULT NULL,
                                         `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                         `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                         PRIMARY KEY (`id`),
                                         UNIQUE INDEX `unique_account` (`customer_id` ASC, `beneficiary_account_number` ASC) VISIBLE
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 ;

--
-- Table structure for table `transaction`
--
CREATE TABLE IF NOT EXISTS `transaction` (
                                          `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                          `account_src_number` bigint(20) DEFAULT NULL,
                                          `account_des_number` bigint(20) NOT NULL,
                                          `bank_src_id` bigint(20) DEFAULT NULL,
                                          `bank_des_id` bigint(20) DEFAULT NULL,
                                          `amount` double NOT NULL,
                                          `description` varchar(300) CHARACTER SET utf8mb4 DEFAULT NULL,
                                          `transaction_type` tinyint(2) NOT NULL,
                                          `employee_id` bigint(20) DEFAULT NULL,
                                          `status` tinyint(2) NOT NULL DEFAULT '1',
                                          `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                          `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                          PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 ;

--
-- Table structure for table `debt_reminder`
--
CREATE TABLE IF NOT EXISTS `debt_reminder` (
                                             `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                             `account_src_number` bigint(20) NOT NULL,
                                             `account_des_number` bigint(20) NOT NULL,
                                             `amount` double NOT NULL,
                                             `description` varchar(300) CHARACTER SET utf8mb4 DEFAULT NULL,
                                             `payment_id` bigint(20) DEFAULT NULL,
                                             `status` tinyint(2) NOT NULL DEFAULT '1',
                                             `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                             `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                             PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 ;

