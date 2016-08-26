/**
 *
 * The build process contains the following steps
 * 1. clean bin and build folder
 * 2. copy assets (json and images) to bin and build
 * 3. copy all templates into $templateCache
 * 4. compile LESS files, minifiy to one CSS file with an auto-generated name
 * 5.
 *
 */

var gulp = require('gulp');
var annotate = require('gulp-ng-annotate');
var fs = require('fs');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var copy = require('gulp-copy');
var html2js = require('gulp-html2js');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var flatGlob = require('flatten-glob');
var cache = require('gulp-cache');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var clean = require('gulp-clean');
var Server = require('karma').Server;
var protractor = require('gulp-protractor').protractor;
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update;
var runSequence = require('run-sequence');
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var userConfig = require('./config/build.config.js');

function mergeArrays() {
    var outArr = [];
    for (var i in arguments) {
        outArr = outArr.concat(arguments[i]);
    }
    return outArr;
}

// Delete build folder
gulp.task('clean:build', function () {
    return gulp.src([userConfig.build_dir], {read:false})
        .pipe(clean());
});

// Copy files in src to build dir
// html files in src are not used. They are for debugging purposes
gulp.task('copy:build_src', function () {
    return gulp.src([].concat(
        userConfig.vendor_files.js,
        userConfig.app_files.js,
        userConfig.app_files.tpl,
        userConfig.app_files.views

    ))
    .pipe(copy(userConfig.build_dir));
});

gulp.task('copy:build_assets', function () {
    return gulp.src(userConfig.app_files.assets)
        .pipe(gulp.dest(userConfig.build_dir + '/assets/'));
});

// compile directive templates into js
gulp.task('html2js:app', function () {
    return gulp.src(userConfig.app_files.tpl)
        .pipe(html2js('templates-app', {
            name: 'templates-app',
            base: 'src/'
        }))
        .pipe(concat('templates-app.js'))
        .pipe(clean({force: true}))
        .pipe(gulp.dest(userConfig.build_dir));
});

// compile views to js
gulp.task('html2js:views', function () {
    return gulp.src(userConfig.app_files.views)
        .pipe(html2js('templates-views', {
            name: 'templates-views',
            base: 'src/'
        }))
        .pipe(concat('templates-views.js'))
        .pipe(clean({force: true}))
        .pipe(gulp.dest(userConfig.build_dir))
});

// Inject essential file paths into index.html for build environment
gulp.task('inject:build_index', function () {
    var arraySources = flatGlob.sync([].concat(
        userConfig.vendor_files.js,
        userConfig.app_files.js,
        userConfig.build_dir + '/templates-app.js',
        userConfig.build_dir + '/templates-views.js'

    ));
    var sources = gulp.src(arraySources, {read: false});
    return gulp.src(userConfig.app_files.html)
        .pipe(inject(sources, {addRootSlash: false, ignorePath: 'build'}))
        .pipe(gulp.dest(userConfig.build_dir));
});

// Copy images from build dir to bin dir
gulp.task('copy:bin_assets', function () {
    return gulp.src(userConfig.build_dir + '/src/assets/**')
        .pipe(gulp.dest(userConfig.compile_dir + '/assets/'));
});

// Compile and compress js files, and put it into bin
gulp.task('compile:bin_js', function () {
    var files = mergeArrays(
        userConfig.vendor_files.js,
        userConfig.app_files.js,
        userConfig.build_dir + '/templates-app.js',
        userConfig.build_dir + '/templates-views.js'
    );
    return gulp.src(files)
        .pipe(uglify({
            mangle: false
        }))
        .pipe(concat('compiled.js'))
        .pipe(gulp.dest(userConfig.compile_dir))
});

// Inject js and css files into index.html
gulp.task('inject:bin_index', function () {
    var arraySources = flatGlob.sync([].concat(
        userConfig.compile_dir + '/*.js'
        //userConfig.compile_dir + '/assets/*.css',
    ));
    var sources = gulp.src(arraySources, {read: false});
    return gulp.src(userConfig.app_files.html)
        .pipe(inject(sources, {addRootSlash: false, ignorePath: "bin"}))
        .pipe(gulp.dest(userConfig.compile_dir));
});

// Serve a site after running multiple tasks
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "build/.",
            open: "local",
            browser: "google chrome"
        }
    });
});

gulp.task('default', function(){
    runSequence(
        'clean:build',
        'copy:build_src',
        'copy:build_assets',
        'html2js:app',
        'html2js:views',
        'inject:build_index',
        'copy:bin_assets',
        //'compile:bin_css',
        'compile:bin_js',
        'inject:bin_index',
        'serve'
    );
});

