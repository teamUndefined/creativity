//'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify');
var gulp = require('gulp');
var glob = require('glob');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

// add custom browserify options here
var customOpts = {
    entries: ['./src/js/index.js'],
    //extensions: ['.js'],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
b.transform(babelify);
//b.transform(reactify);

gulp.task('default', ['js', 'styles', 'watch']);

gulp.task('watch', function() {
    return gulp.watch('./src/scss/**/*.scss', ['styles']);
});

gulp.task('styles', function() {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public'));
});

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        // optional, remove if you don't need to buffer file contents
        //.pipe(buffer())
        // optional, remove if you dont want sourcemaps
        //.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        //.pipe(sourcemaps.write('./public')) // writes .map file
        .pipe(gulp.dest('./public'));
}

