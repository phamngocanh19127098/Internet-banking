ALTER TABLE saved_beneficiary
DROP COLUMN beneficiary_account_number;

ALTER TABLE saved_beneficiary
    Add COLUMN beneficiary_account_number varchar(64);