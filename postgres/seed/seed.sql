BEGIN TRANSACTION;

    INSERT INTO users(name, email, entries, joined) VALUES ('sam jones', 'sam@example.com', 0,'2020-01-01' );
    INSERT INTO login (hash, email) VALUES ('$2y$06$WZHflKjP1LWlXmvTAPJ79OdshMtRB56dab0mNBCL6MbI/zjAlFrDi', 'sam@example.com');

COMMIT;