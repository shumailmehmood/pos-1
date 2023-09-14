BEGIN;

    CREATE TABLE global_settings (
        id text,
        device_alerts boolean default FALSE,
        is_self_signup boolean default FALSE,
        is_order_devices boolean default FALSE,
        PRIMARY KEY (id)
    );

COMMIT;
