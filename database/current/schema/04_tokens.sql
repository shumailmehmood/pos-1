BEGIN;

    CREATE TABLE tokens
    (
        token text,
        app text,
        ref_id text,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (token)
    );

COMMIT;