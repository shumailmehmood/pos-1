BEGIN;

-- admins

INSERT INTO
    admins (
        admin_id,
        email,
        first_name,
        last_name
    )
VALUES (
        'ghafran',
        'ghafran@vitalcode.io',
        'Ghafran',
        'Abbas'
    ) ON CONFLICT ON CONSTRAINT admins_pkey
DO NOTHING;

-- users

INSERT INTO
    users (
        user_id,
        email,
        first_name,
        last_name
    )
VALUES (
        'ghafran',
        'ghafran@vitalcode.io',
        'Ghafran',
        'Abbas'
    ) ON CONFLICT ON CONSTRAINT users_pkey
DO NOTHING;

COMMIT;