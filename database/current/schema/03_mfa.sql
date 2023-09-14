BEGIN;

    CREATE TABLE mfa_admin
    (
        id text,
        admin_id text,
        code text,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (id)
    );

    CREATE TABLE mfa_user
    (
        id text,
        user_id text,
        code text,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (id)
    );

COMMIT;