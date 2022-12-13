ALTER TABLE account 
    ADD CONSTRAINT FK_account_user FOREIGN KEY(customer_id) REFERENCES user(id);

ALTER TABLE account
    ADD CONSTRAINT fk_customer_user_1 FOREIGN KEY (created_by) REFERENCES user(id);

ALTER TABLE saved_beneficiary
    ADD CONSTRAINT fk_saved_beneficiary_user
        FOREIGN KEY (customer_id) REFERENCES user(id);

ALTER TABLE saved_beneficiary
    ADD CONSTRAINT fk_saved_beneficiary_beneficiary_bank
        FOREIGN KEY (beneficiary_bank_id) REFERENCES affiliated_bank(id);

ALTER TABLE affiliated_bank
    ADD COLUMN status varchar(255);

ALTER TABLE affiliated_bank
    ADD COLUMN connection_type varchar(255);

ALTER TABLE transaction
    DROP COLUMN bank_src_id;

ALTER TABLE transaction
    ADD COLUMN user_id bigint;

ALTER TABLE transaction
    ADD CONSTRAINT fk_transaction_user_id
        FOREIGN KEY (user_id) REFERENCES user(id);

ALTER TABLE debt_reminder
    ADD user_id bigint;

ALTER TABLE debt_reminder
    ADD CONSTRAINT fk_debt_reminder_user
        FOREIGN KEY (user_id) REFERENCES user(id);

ALTER TABLE debt_reminder
    ADD CONSTRAINT fk_debt_reminder_transaction
        FOREIGN KEY (payment_id) REFERENCES transaction(id);