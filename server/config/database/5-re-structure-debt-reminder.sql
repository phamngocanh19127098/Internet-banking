ALTER TABLE debt_reminder  
DROP COLUMN status;

ALTER TABLE debt_reminder 
ADD COLUMN status varchar(50);

ALTER TABLE debt_reminder  
DROP COLUMN status;


ALTER TABLE debt_reminder
    ADD COLUMN payment_status varchar(50);

ALTER TABLE debt_reminder
    ADD COLUMN receiver_id bigint;

ALTER TABLE debt_reminder 
ADD FOREIGN KEY (receiver_id) REFERENCES user(id);

ALTER TABLE transaction 
    DROP COLUMN transaction_type;

ALTER TABLE transaction 
    ADD COLUMN transaction_type VARCHAR(50);