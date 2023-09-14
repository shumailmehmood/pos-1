var _ = require('lodash'),
	lib = require('../../../library');

module.exports = class {
	static async list(req, res, next) {
		try {
			let input = lib.forms.input(req, res);

			let subsections = await lib.db.search({
				cols: ['n.subsection_id', '(SELECT s.title FROM wiki_sections s WHERE s.section_id=n.section_id limit 1) AS section_name', 'n.title', 'n.ordering'],
				from: `wiki_subsections n`,
				search: input.search,
				search_columns: ['n.title'],
				limit: 1000,
			});

			res.json(subsections);
		} catch (err) {
			next(err);
		}
	}

	static async get(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['subsection_id']);
			let subsection = await lib.orm.wiki_subsections.fetch({
				subsection_id: input.subsection_id,
			});
			res.json(subsection);
		} catch (err) {
			next(err);
		}
	}

	static async save(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['subsection_id', 'section_id']);

			// save user
			input.subsection_id = input.subsection_id === '-' ? lib.util.guid.generate() : input.subsection_id;
			await lib.orm.wiki_subsections.save(input);

			res.json({
				success: true,
			});
		} catch (err) {
			next(err);
		}
	}

	static async delete(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['subsection_id']);
			await lib.orm.wiki_subsections.delete({
				subsection_id: input.subsection_id,
			});
			res.json({
				success: true,
			});
		} catch (err) {
			next(err);
		}
	}
};
