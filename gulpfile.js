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


// Serve a site after running multiple tasks
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "src/.",
            open: "local",
            browser: "google chrome"
        }
    });
});

gulp.task('default', function(){
    gulp.start('serve');
});

