BEGIN;

     CREATE TABLE domains_blocked (
        domain text,
        PRIMARY KEY (domain)
    );

COMMIT;
