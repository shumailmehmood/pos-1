var _ = require('lodash'),
	path = require('path'),
	gulp = require('gulp'),
	ignore = require('gulp-ignore'),
	mocha = require('gulp-mocha'),
	jshint = require('gulp-jshint');

let apps = [
	{
		name: 'library',
		path: '../library'
	},
	{
		name: 'cron',
		path: '../cron'
	},
	{
		name: 'pubsub',
		path: '../services/pubsub'
	},
	{
		name: 'admin',
		path: '../sites/admin/api'
	},
	{
		name: 'patients',
		path: '../sites/patients/api'
	},{
		name: 'teams',
		path: '../sites/teams/api'
	},{
		name: 'workers',
		path: '../workers'
	}];

_.each(apps, (app) => {

	let base = path.resolve(__dirname, `${app.path}`);

	gulp.task(`${app.name}-lint`, () => {
		return gulp.src([`${base}/**/*.js`]).pipe(ignore.exclude([
			`**/orm/tables.js`,
			`**/translators/globoapi.js`,
			`**/library/**`,
			`**/node_modules/**`
		])).pipe(jshint('.jshintrc')).pipe(jshint.reporter('jshint-stylish')).pipe(jshint.reporter('fail'));
	});

	gulp.task(`${app.name}-unit`, () => {
		return gulp.src([
			`unit/*.js`,
			`unit/${app.name}/**/*.js`]).pipe(
				mocha({
					useColors: false,
					reporter: 'dot',
				})
			);
	});

	gulp.task(`${app.name}-integration`, () => {
		return gulp.src([
			`integration/*.js`,
			`integration/${app.name}/**/*.js`]).pipe(
				mocha({
					useColors: false,
					reporter: 'dot',
				})
			);
	});

	gulp.task(`${app.name}-functional`, () => {
		return gulp.src([
			`functional/*.js`,
			`functional/${app.name}/**/*.js`]).pipe(
				mocha({
					useColors: false,
					reporter: 'dot',
				})
			);
	});

	gulp.task(`${app.name}-tests`, gulp.series(`${app.name}-lint`, `${app.name}-unit`, `${app.name}-integration`, `${app.name}-functional`));
});

gulp.task('lint', gulp.series(_.union(['library-lint'], _.map(apps, (app) => { return `${app.name}-lint`; }))));

gulp.task('unit', gulp.series(_.union(['library-unit'], _.map(apps, (app) => { return `${app.name}-unit`; }))));

gulp.task('integration', gulp.series(_.union(['library-integration'], _.map(apps, (app) => { return `${app.name}-integration`; }))));

gulp.task('functional', gulp.series(_.map(apps, (app) => { return `${app.name}-functional`; })));

gulp.task('tests', gulp.series('lint', 'unit', 'integration', 'functional'));

gulp.task('default', gulp.series('tests'));
