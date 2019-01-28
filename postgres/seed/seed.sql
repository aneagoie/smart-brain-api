BEGIN TRANSACTION;

INSERT into users ( name, email, entires, joined ) values('Jessie', 'jessie@gmail.com', 5, '2018-01-01');
INSERT INTO login(hash,email) values('hashpassword', 'jessie@gmail.com');

COMMIT;
