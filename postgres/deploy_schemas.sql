--deploy fresh db tables
\i /docker-entry-point-initdb.d/tables/users.sql
\i /docker-entry-point-initdb.d/tables/login.sql

\i /docker-entry-point-initdb.d/seed/seed.sql