BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Eyal', 'eyal@gmail.com', 100, '2022-01-01');
INSERT into login (hash, email) values ('$2a$10$6mCL8lBsK/NqMUYfAfLZi.KhCPqktWw3aPJdBkM0gui42luvZVXxW', 'eyal@gmail.com');

COMMIT;