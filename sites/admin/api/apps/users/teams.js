var _ = require('lodash'),
    lib = require('../../library');

module.exports = class general {
    static async get(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['user_id']);

            let teams = _.map(await lib.db.fetchAll(`SELECT ug.team_id FROM users_to_teams ug WHERE ug.user_id=:user_id`, input), 'team_id');

            res.json({
                teams: teams,
            });
        } catch (err) {
            next(err);
        }
    }

    static async save(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['user_id', 'teams']);

            let sql = lib.util.sql.generateListUpsert({
                id: input.user_id,
                id_column: 'user_id',
                option_id_column: 'team_id',
                table: 'users_to_teams',
                selected: input.teams,
            });
            await lib.db.execute(sql);

            res.json({
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }
};