var _ = require('lodash'),
    lib = require('../../library');

module.exports = class {
    static async search(req, res, next) {
        try {
            let input = lib.forms.input(req);

            let teams = await lib.orm.teams.search({
                search: input.query,
                page: 1,
                page_size: 10,
                select_columns: ['team_id', 'name'],
                search_columns: ['name'],
                sort_columns: ['name'],
            });

            res.json(teams);
        } catch (err) {
            next(err);
        }
    }

    static async list(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['teams']);

            let teams = [];
            if (input.teams.length > 0) {
                teams = await lib.db.fetchAll(`SELECT team_id, name FROM teams WHERE team_id IN ('${input.teams.join(`','`)}')`);
            }

            res.json(teams);
        } catch (err) {
            next(err);
        }
    }
};