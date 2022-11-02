BEGIN TRANSACTION;

CREATE TABLE login
(
  id serial PRIMARY KEY,
  hash varchar(100) NOT NULL,
  email text UNIQUE NOT NULL
);

CREATE TABLE users
(
  id serial PRIMARY KEY,
  name VARCHAR(100),
  email text UNIQUE NOT NULL,
  entries BIGINT DEFAULT 0,
  joined TIMESTAMP NOT NULL
);

COMMIT;