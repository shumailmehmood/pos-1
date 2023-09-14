BEGIN;

-- admins
INSERT INTO
    admins (admin_id, email, first_name, last_name)
VALUES
    (
        'ghafran',
        'ghafranabbas@gmail.com',
        'Ghafran',
        'Abbas'
    ),
    (
        'shumail',
        'shumail@vitalchat.com',
        'Shumail',
        'Mehmood'
    ),
    ('salman', 'salman@vitalchat.com', 'Salman', 'Zia') ON CONFLICT ON CONSTRAINT admins_pkey DO NOTHING;

-- users
INSERT INTO
    users (user_id, email, first_name, last_name)
VALUES
    (
        'ghafran',
        'ghafranabbas@gmail.com',
        'Ghafran',
        'Abbas'
    ),
     (
        'shumail',
        'shumail@vitalchat.com',
        'Shumail',
        'Mehmood'
    ),
    ('salman', 'salman@vitalchat.com', 'Salman', 'Zia') ON CONFLICT ON CONSTRAINT users_pkey DO NOTHING;

COMMIT;