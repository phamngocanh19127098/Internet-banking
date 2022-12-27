alter table saved_beneficiary
drop foreign key fk_saved_beneficiary_user


alter table saved_beneficiary
drop column customer_id;

alter table saved_beneficiary
add customer_id bigint(20);

alter table saved_beneficiary
ADD CONSTRAINT fk_saved_beneficiary_user
FOREIGN KEY (customer_id) REFERENCES user(id);