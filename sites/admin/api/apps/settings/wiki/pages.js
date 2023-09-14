var lib = require('../../../library');

module.exports = class {
	static async list(req, res, next) {
		try {
			let input = lib.forms.input(req, res);

			let pages = await lib.db.search({
				cols: ['n.page_id', 'n.title', '(SELECT s.title FROM wiki_sections s INNER JOIN wiki_subsections ss ON s.section_id = ss.section_id WHERE ss.subsection_id=n.subsection_id limit 1) AS section_name', '(SELECT s.title FROM wiki_subsections s WHERE s.subsection_id=n.subsection_id limit 1) AS subsection_name', 'n.ordering'],
				from: `wiki_pages n`,
				search: input.search,
				search_columns: ['n.title', 'n.description'],
				page_size: 1000,
			});

			res.json(pages);
		} catch (err) {
			next(err);
		}
	}

	static async get(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['page_id']);
			let page = await lib.orm.wiki_pages.fetch({
				page_id: input.page_id,
			});
			res.json(page);
		} catch (err) {
			next(err);
		}
	}

	static async save(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['page_id']);

			// save user
			input.page_id = input.page_id === '-' ? lib.util.guid.generate() : input.page_id;
			await lib.orm.wiki_pages.save(input);

			res.json({
				success: true,
			});
		} catch (err) {
			next(err);
		}
	}

	static async delete(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['page_id']);
			await lib.orm.wiki_pages.delete({
				page_id: input.page_id,
			});
			res.json({
				success: true,
			});
		} catch (err) {
			next(err);
		}
	}
};
