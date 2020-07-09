BEGIN TRANSACTION;

INSERT INTO users(name,email, entries,joined) values ('jessie','jessie@gmail.com',5, '2020-01-01');
INSERT INTO login(hash,email) values('$2a$10$joqwWutyIxfucntraGDg8OujeyT3lIbro9PF9N6o6vXX.gxXKdaTu', 'jessie@gmail.com');
COMMIT;