module.exports = () => {
	return (err, req, res, next) => {
		var status = err.status || 500;
		res.status(status);
		if (status >= 500) {
			console.error({
				url: req.originalUrl,
				route: req.path,
				headers: req.headers,
				body: req.body,
				query: req.query,
				ip: req.ip,
				err_message: err ? err.message : null,
				err_stack: err ? err.stack : null,
			});
		}
		var contype = req.headers['content-type'];
		if (contype && contype.indexOf('json') > -1) {
			res.json({
				error: err,
			});
		} else {
			res.json({
				error: global.config.production ? null : err
			});
		}
		res.end();
	};
};
