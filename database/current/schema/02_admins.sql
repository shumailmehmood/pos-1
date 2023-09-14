BEGIN;

    CREATE TABLE admins (
        admin_id text,
        email text,
        first_name text,
        last_name text,
        login_attempts int,
        login_attempt_on bigint,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (admin_id),
        CONSTRAINT un_admins_email UNIQUE(email)
    );
    CREATE INDEX ix_admins_email ON admins (email);

    CREATE TABLE admins_roles (
        role_id text,
        name text,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (role_id)
    );

    CREATE TABLE admins_roles_to_admins (
        role_id text,
        admin_id text,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (role_id, admin_id)
    );
    CREATE INDEX ix_admins_roles_to_admins_admin_id ON admins_roles_to_admins (admin_id, role_id);

COMMIT;
