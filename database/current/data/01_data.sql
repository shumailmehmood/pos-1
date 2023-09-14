BEGIN;

UPSERT INTO permissions (permission_id, name, description)
VALUES
    ('settings', 'settings', 'Access to Settings');

COMMIT;