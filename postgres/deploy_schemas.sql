-- Deploy fresh database tables
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'

\i '/docker-entrypoint-initdb.d/tables/seed.sql'
-- order matters here if your tables depend on each other