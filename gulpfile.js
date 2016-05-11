///////////////////////////////////////////
//	Requiring
//////////////////////////////////////////
var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	ngAnnotate = require('gulp-ng-annotate'),
	jshint = require('gulp-jshint'),
	del = require('del');

///////////////////////////////////////////
//	paths
//////////////////////////////////////////
var paths = {
	server: './server.js',
	scripts: [
		'app/js/app.js',
		'app/js/services.js',
		'app/js/controllers.js',
		'app/js/filters.js'
	],
	stylesSrc: [
		'app/styles/scss/*.scss'
	],
	stylesDest: 'app/styles/css/',
	buildFilesFoldersRemove:[
		'build/app/scss/', 
		'build/app/js/!(*.min.js)',
		'build/bower.json',
		'build/bower_components/',
		'build/app/maps/',
		'build/app/tests/'
	]
};

var errorlog = function(err) {
	console.error(err.message);
	this.emit('end');
};

var reloadDelay = 1000;

///////////////////////////////////////////
//	Scripts Task
//////////////////////////////////////////
gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
	.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.on('error', errorlog)
		.pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('./app/js'))
	.pipe(reload({stream:true}));
});

///////////////////////////////////////////
//	JSHint Task
//////////////////////////////////////////
gulp.task('lint', function() {
	return gulp.src('app/js/**/*.js')
	.pipe(jshint());
});

///////////////////////////////////////////
//	Styles Task
//////////////////////////////////////////
gulp.task('styles', function() {
	return gulp.src(paths.stylesSrc)
	.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed', includePaths : ['/scss/']}))
		.on('error', errorlog)
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest(paths.stylesDest))
	.pipe(reload({stream:true}));
});

///////////////////////////////////////////
//	HTML Task
//////////////////////////////////////////
gulp.task('html', function() {
	gulp.src('app/**/*.html')
	.pipe(reload({stream:true}));
});

///////////////////////////////////////////
//	Build Task
//////////////////////////////////////////

//clear out all files and folders from build folder
gulp.task('build:cleanfolder', function (cb) {
	return del([
		'build/**'
	], cb);
});

// task to create build directory of all files
gulp.task('build:copy1', ['build:cleanfolder'], function(){
    return gulp.src(['app/**/*'])
    .pipe(gulp.dest('build/app'));
});

gulp.task('build:copy2', ['build:cleanfolder'], function(){
    return (gulp.src('models/**/*'))
    .pipe(gulp.dest('build/models/'));
});

gulp.task('build:copy3', ['build:cleanfolder'], function(){
    return (gulp.src(['./server.js', './api.js', './auth.js', './package.json']))
    .pipe(gulp.dest('build/'));
});
// task to removed unwanted build files
// list all files and directories here that you don't want included
gulp.task('build:remove', ['build:copy1', 'build:copy2', 'build:copy3'], function (cb) {
	del(paths.buildFilesFoldersRemove, cb);
});

//same like th defualt task
gulp.task('build', ['build:copy1', 'build:copy2', 'build:copy3', 'build:remove']);

///////////////////////////////////////////
//	Browser-Sync Task
//////////////////////////////////////////
gulp.task('browser-sync', ['server'], function() {
	browserSync.init({
		proxy: "http://localhost:3003",
        port: 7000
	});
});

///////////////////////////////////////////
//	Server
//////////////////////////////////////////
gulp.task('server', function(cb) {
	var started = false;
	nodemon({
		script: paths.server
	}).on('start', function() {
		if(!started) {
			started = true;
	        cb();
		}
	});
});

///////////////////////////////////////////
//	Watch Task
//////////////////////////////////////////
gulp.task('watch', function() {
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/styles/scss/**/*.scss', ['styles']);
	gulp.watch('app/**/*.html', ['html']);	
});

gulp.task('build:serve', ['server']);

///////////////////////////////////////////
//	Defualt Task
//////////////////////////////////////////
gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'lint', 'watch']);