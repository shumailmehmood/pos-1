
const crud = require('./crud');
module.exports = class {
    static setup(orm) {
        orm.test = class test extends crud {
            static table = {
                name: 'test',
                columns: [{"key":true,"serial":null,"type":"text","name":"id"},{"key":false,"serial":null,"type":"text","name":"name"}]
            };
        };
        
        orm.admins = class admins extends crud {
            static table = {
                name: 'admins',
                columns: [{"key":true,"serial":null,"type":"text","name":"admin_id"},{"key":false,"serial":null,"type":"text","name":"email"},{"key":false,"serial":null,"type":"text","name":"first_name"},{"key":false,"serial":null,"type":"text","name":"last_name"},{"key":false,"serial":null,"type":"bigint","name":"login_attempts"},{"key":false,"serial":null,"type":"bigint","name":"login_attempt_on"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.admins_roles = class admins_roles extends crud {
            static table = {
                name: 'admins_roles',
                columns: [{"key":true,"serial":null,"type":"text","name":"role_id"},{"key":false,"serial":null,"type":"text","name":"name"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.admins_roles_to_admins = class admins_roles_to_admins extends crud {
            static table = {
                name: 'admins_roles_to_admins',
                columns: [{"key":true,"serial":null,"type":"text","name":"role_id"},{"key":true,"serial":null,"type":"text","name":"admin_id"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.mfa_admin = class mfa_admin extends crud {
            static table = {
                name: 'mfa_admin',
                columns: [{"key":true,"serial":null,"type":"text","name":"id"},{"key":false,"serial":null,"type":"text","name":"admin_id"},{"key":false,"serial":null,"type":"text","name":"code"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.mfa_user = class mfa_user extends crud {
            static table = {
                name: 'mfa_user',
                columns: [{"key":true,"serial":null,"type":"text","name":"id"},{"key":false,"serial":null,"type":"text","name":"user_id"},{"key":false,"serial":null,"type":"text","name":"code"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.tokens = class tokens extends crud {
            static table = {
                name: 'tokens',
                columns: [{"key":true,"serial":null,"type":"text","name":"token"},{"key":false,"serial":null,"type":"text","name":"app"},{"key":false,"serial":null,"type":"text","name":"ref_id"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.impersonate_users = class impersonate_users extends crud {
            static table = {
                name: 'impersonate_users',
                columns: [{"key":true,"serial":null,"type":"text","name":"impersonate_id"},{"key":false,"serial":null,"type":"text","name":"user_id"},{"key":false,"serial":null,"type":"bigint","name":"created_at"}]
            };
        };
        
        orm.impersonate_patients = class impersonate_patients extends crud {
            static table = {
                name: 'impersonate_patients',
                columns: [{"key":true,"serial":null,"type":"text","name":"impersonate_id"},{"key":false,"serial":null,"type":"text","name":"patient_id"},{"key":false,"serial":null,"type":"bigint","name":"created_at"}]
            };
        };
        
        orm.accounts = class accounts extends crud {
            static table = {
                name: 'accounts',
                columns: [{"key":true,"serial":null,"type":"text","name":"account_id"},{"key":false,"serial":null,"type":"text","name":"name"},{"key":false,"serial":false,"type":"boolean","name":"active"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.pubsub_connections = class pubsub_connections extends crud {
            static table = {
                name: 'pubsub_connections',
                columns: [{"key":true,"serial":null,"type":"text","name":"connection_id"},{"key":false,"serial":null,"type":"text","name":"server_ip"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.pubsub_channels = class pubsub_channels extends crud {
            static table = {
                name: 'pubsub_channels',
                columns: [{"key":true,"serial":null,"type":"text","name":"connection_id"},{"key":true,"serial":null,"type":"text","name":"channel"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.users = class users extends crud {
            static table = {
                name: 'users',
                columns: [{"key":true,"serial":null,"type":"text","name":"user_id"},{"key":false,"serial":null,"type":"text","name":"email"},{"key":false,"serial":null,"type":"text","name":"first_name"},{"key":false,"serial":null,"type":"text","name":"last_name"},{"key":false,"serial":null,"type":"bigint","name":"login_attempts"},{"key":false,"serial":null,"type":"bigint","name":"login_attempt_on"},{"key":false,"serial":null,"type":"boolean","name":"notifications_disabled"},{"key":false,"serial":null,"type":"text","name":"notifications_email"},{"key":false,"serial":null,"type":"text","name":"notifications_phone"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"},{"key":false,"serial":null,"type":"text","name":"phone"},{"key":false,"serial":null,"type":"text","name":"signature"}]
            };
        };
        
        orm.roles = class roles extends crud {
            static table = {
                name: 'roles',
                columns: [{"key":true,"serial":null,"type":"text","name":"role_id"},{"key":false,"serial":null,"type":"text","name":"name"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.users_to_roles = class users_to_roles extends crud {
            static table = {
                name: 'users_to_roles',
                columns: [{"key":true,"serial":null,"type":"text","name":"user_id"},{"key":true,"serial":null,"type":"text","name":"role_id"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.users_to_accounts = class users_to_accounts extends crud {
            static table = {
                name: 'users_to_accounts',
                columns: [{"key":true,"serial":null,"type":"text","name":"user_id"},{"key":true,"serial":null,"type":"text","name":"account_id"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.groups = class groups extends crud {
            static table = {
                name: 'groups',
                columns: [{"key":true,"serial":null,"type":"text","name":"group_id"},{"key":false,"serial":null,"type":"text","name":"account_id"},{"key":false,"serial":null,"type":"text","name":"name"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.users_to_groups = class users_to_groups extends crud {
            static table = {
                name: 'users_to_groups',
                columns: [{"key":true,"serial":null,"type":"text","name":"user_id"},{"key":true,"serial":null,"type":"text","name":"group_id"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
        orm.permissions = class permissions extends crud {
            static table = {
                name: 'permissions',
                columns: [{"key":true,"serial":null,"type":"text","name":"permission_id"},{"key":false,"serial":null,"type":"text","name":"name"},{"key":false,"serial":null,"type":"text","name":"description"}]
            };
        };
        
        orm.groups_to_permissions = class groups_to_permissions extends crud {
            static table = {
                name: 'groups_to_permissions',
                columns: [{"key":true,"serial":null,"type":"text","name":"group_id"},{"key":true,"serial":null,"type":"text","name":"permission_id"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"},{"key":false,"serial":null,"type":"bigint","name":"created"}]
            };
        };
        
        orm.domains_blocked = class domains_blocked extends crud {
            static table = {
                name: 'domains_blocked',
                columns: [{"key":true,"serial":null,"type":"text","name":"domain"}]
            };
        };
        
        orm.global_settings = class global_settings extends crud {
            static table = {
                name: 'global_settings',
                columns: [{"key":true,"serial":null,"type":"text","name":"id"},{"key":false,"serial":false,"type":"boolean","name":"device_alerts"},{"key":false,"serial":false,"type":"boolean","name":"is_self_signup"},{"key":false,"serial":false,"type":"boolean","name":"is_order_devices"}]
            };
        };
        
        orm.account_settings = class account_settings extends crud {
            static table = {
                name: 'account_settings',
                columns: [{"key":true,"serial":null,"type":"text","name":"account_id"},{"key":false,"serial":null,"type":"boolean","name":"auto_logout"},{"key":false,"serial":null,"type":"text","name":"auto_logout_warning"},{"key":false,"serial":null,"type":"text","name":"auto_logout_timeout"},{"key":false,"serial":null,"type":"bigint","name":"created_at"},{"key":false,"serial":null,"type":"bigint","name":"updated_at"}]
            };
        };
        
    }
};