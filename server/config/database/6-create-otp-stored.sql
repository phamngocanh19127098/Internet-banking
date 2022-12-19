CREATE TABLE `internetbanking`.`otp_stored` (
                                                `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
                                                `customer_id` BIGINT(20) NOT NULL,
                                                `otp_code` VARCHAR(6) NOT NULL,
                                                `otp_type` ENUM("transaction", "forget_pw") NOT NULL,
                                                `transaction_id` BIGINT(20) NULL,
                                                `created_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                PRIMARY KEY (`id`));


ALTER TABLE `internetbanking`.`otp_stored`
    ADD INDEX `fk_otp_user_idx` (`customer_id` ASC) VISIBLE;
;
ALTER TABLE `internetbanking`.`otp_stored`
    ADD CONSTRAINT `fk_otp_user`
        FOREIGN KEY (`customer_id`)
            REFERENCES `internetbanking`.`user` (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION;

ALTER TABLE `internetbanking`.`account`
    CHANGE COLUMN `current_balance` `current_balance` DOUBLE NULL DEFAULT 0 ;