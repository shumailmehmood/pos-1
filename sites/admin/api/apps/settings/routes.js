var shared = require('../../shared'),
	wiki = require('./wiki');

module.exports = class {
	static setup(router) {
		// wiki
		router.all('/settings/wiki/sections', shared.token.authenticate, wiki.sections.list);
		router.all('/settings/wiki/sections/:section_id', shared.token.authenticate, wiki.sections.get);
		router.all('/settings/wiki/sections/:section_id/save', shared.token.authenticate, wiki.sections.save);
		router.all('/settings/wiki/sections/:section_id/delete', shared.token.authenticate, wiki.sections.delete);

		router.all('/settings/wiki/subsections', shared.token.authenticate, wiki.subsections.list);
		router.all('/settings/wiki/subsections/:subsection_id', shared.token.authenticate, wiki.subsections.get);
		router.all('/settings/wiki/subsections/:subsection_id/save', shared.token.authenticate, wiki.subsections.save);
		router.all('/settings/wiki/subsections/:subsection_id/delete', shared.token.authenticate, wiki.subsections.delete);

		router.all('/settings/wiki/pages', shared.token.authenticate, wiki.pages.list);
		router.all('/settings/wiki/pages/:page_id', shared.token.authenticate, wiki.pages.get);
		router.all('/settings/wiki/pages/:page_id/save', shared.token.authenticate, wiki.pages.save);
		router.all('/settings/wiki/pages/:page_id/delete', shared.token.authenticate, wiki.pages.delete);
	}
};
