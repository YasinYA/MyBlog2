///////////////////////////////////////////
//	Requiring
//////////////////////////////////////////
var gulp = require('gulp'),
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
	scripts: [
		'app/js/app.js',
		'app/js/services.js',
		'app/js/controllers.js',
		'app/js/filters.js'
	],
	stylesSrc: [
		'app/styles/scss/main.scss'
	],
	stylesDest: 'app/styles/css/',
	buildFileForldersRemove: [
		'build/scss/',
		'build/js/!(*.min.js)',
		'build/bower.json',
		'build/maps'
	]
};

var errorlog = function(err) {
	console.error(err.message);
	this.emit('end');
};

///////////////////////////////////////////
//	Scripts Task
//////////////////////////////////////////
gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
	.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
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
		.pipe(sass({outputStyle: 'compressed'}))
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
gulp.task('build:copy', ['build:cleanfolder'], function(){
    return gulp.src('app/**/*/')
    .pipe(gulp.dest('build/'));
});

// task to removed unwanted build files
// list all files and directories here that you don't want included
gulp.task('build:remove', ['build:copy'], function (cb) {
	del(config.buildFilesFoldersRemove, cb);
});

//same like th defualt task
gulp.task('build', ['build:copy', 'build:remove']);

///////////////////////////////////////////
//	Browser-Sync Task
//////////////////////////////////////////
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "./app/"
		}
	})
});

///////////////////////////////////////////
//	Watch Task
//////////////////////////////////////////
gulp.task('watch', function() {
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/styles/scss/**/*.scss', ['styles']);
	gulp.watch('app/**/*.html', ['html']);	
});

///////////////////////////////////////////
//	Defualt Task
//////////////////////////////////////////
gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'lint', 'watch']);