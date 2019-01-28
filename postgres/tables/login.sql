BEGIN TRANSACTION;

CREATE TABLE login (
    id serial PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    email TEXT UNIQUE NOT NULL 
);

COMMIT;