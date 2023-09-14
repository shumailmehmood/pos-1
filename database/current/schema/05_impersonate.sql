BEGIN;

    CREATE TABLE impersonate_users
    (
        impersonate_id text,
        user_id text,
        created_at bigint,
        PRIMARY KEY (impersonate_id)
    );

    CREATE TABLE impersonate_patients
    (
        impersonate_id text,
        patient_id text,
        created_at bigint,
        PRIMARY KEY (impersonate_id)
    );

COMMIT;