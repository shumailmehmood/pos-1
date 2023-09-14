var _ = require('lodash'),
	lib = require('../../../library');

module.exports = class {
	static async list(req, res, next) {
		try {
			let input = lib.forms.input(req, res);

			let sections = await lib.db.search({
				cols: ['n.section_id', 'n.title', 'n.site_id', 'n.ordering'],
				from: `wiki_sections n`,
				search: input.search,
				search_columns: ['n.title', 'n.description'],
				limit: 1000,
			});

			res.json(sections);
		} catch (err) {
			next(err);
		}
	}

	static async get(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['section_id']);
			let section = await lib.orm.wiki_sections.fetch({
				section_id: input.section_id,
			});
			res.json(section);
		} catch (err) {
			next(err);
		}
	}

	static async save(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['section_id']);

			// save user
			input.section_id = input.section_id === '-' ? lib.util.guid.generate() : input.section_id;
			await lib.orm.wiki_sections.save(input);

			res.json({
				success: true,
			});
		} catch (err) {
			next(err);
		}
	}

	static async delete(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['section_id']);
			await lib.orm.wiki_sections.delete({
				section_id: input.section_id,
			});
			res.json({
				success: true,
			});
		} catch (err) {
			next(err);
		}
	}
};
