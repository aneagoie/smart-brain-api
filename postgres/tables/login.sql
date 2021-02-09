BEGIN TRANSACTION;

CREATE TABLE login (
	id serial PRIMARY key,
	hash VARCHAR(100) NOT null,
	email text UNIQUE NOT NULL
);

COMMIT;