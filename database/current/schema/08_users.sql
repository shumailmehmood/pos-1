BEGIN;

CREATE TABLE
    users (
        user_id text,
        email text,
        first_name text,
        last_name text,
        login_attempts int,
        login_attempt_on bigint,
        notifications_disabled boolean,
        notifications_email text,
        notifications_phone text,
        created_at bigint,
        updated_at bigint,
        phone text,
        signature text,
        PRIMARY KEY (user_id),
        CONSTRAINT un_users_email UNIQUE (email),
        CONSTRAINT un_users_phone UNIQUE (phone)
    );

CREATE INDEX ix_users_email ON users (email);

CREATE INDEX ix_users_phone ON users (phone);

CREATE TABLE
    roles (
        role_id text,
        name text,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (role_id)
    );

CREATE TABLE
    users_to_roles (
        user_id text,
        role_id text,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (user_id, role_id)
    );

CREATE INDEX ix_users_to_roles_team_id_role_id ON users_to_roles (role_id, user_id);

CREATE TABLE
    users_to_accounts (
        user_id text,
        account_id text,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (user_id, account_id),
        INDEX ix_users_to_accounts_account_id (account_id, user_id)
    );

CREATE TABLE
    groups (
        group_id text,
        account_id text,
        name text,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (group_id)
    );

CREATE TABLE
    users_to_groups (
        user_id text,
        group_id text,
        created_at bigint,
        updated_at bigint,
        PRIMARY KEY (user_id, group_id),
        INDEX ix_users_to_groups_group_id (group_id, user_id)
    );

CREATE TABLE
    permissions (
        permission_id text,
        name text,
        description text,
        PRIMARY KEY (permission_id)
    );

CREATE TABLE
    groups_to_permissions (
        group_id text,
        permission_id text,
        updated_at bigint,
        created bigint,
        PRIMARY KEY (group_id, permission_id),
        INDEX ix_groups_to_permissions_permission_id (permission_id, group_id)
    );

COMMIT;