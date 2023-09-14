BEGIN;

    CREATE TABLE pubsub_connections
    (
        connection_id text,
        server_ip text,
        updated_at bigint,
        PRIMARY KEY (connection_id)
    );

    CREATE TABLE pubsub_channels
    (
        connection_id text,
        channel text,
        updated_at bigint,
        PRIMARY KEY (connection_id, channel)
    );
    CREATE INDEX ix_pubsub_channels_channel ON pubsub_channels (channel, connection_id);

COMMIT;