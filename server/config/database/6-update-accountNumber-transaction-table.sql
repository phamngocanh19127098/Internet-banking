ALTER TABLE transaction
DROP COLUMN account_des_number;

ALTER TABLE transaction
    Add COLUMN account_des_number varchar(64);

ALTER TABLE transaction
DROP COLUMN account_src_number;

ALTER TABLE transaction
    Add COLUMN account_src_number varchar(64);
