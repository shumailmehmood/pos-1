BEGIN;

CREATE TABLE
    accounts (
        account_id text,
        name text,
        active boolean default true,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (account_id)
    );

CREATE TABLE
    account_settings (
        account_id text,
        auto_logout boolean,
        auto_logout_warning text,
        auto_logout_timeout text,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (account_id)
    );

COMMIT;