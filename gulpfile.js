/* ====== Gulp Plugins ====== */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sassdoc = require('sassdoc');

/* ====== Variables ====== */

var input = './_src/sass/**/*.scss';
var output = './_dist/css';
var outputRoot = './_dist'
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

var filesToMove = [
    './_src/javascript/*.*',
    './_src/fonts/*.*',
    './_src/*.html'
];

/* ====== Tasks ====== */

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'move', 'move:watch'], function() {

    browserSync.init({
        server: "./_dist"
    });

    gulp.watch(input, ['sass']);
    gulp.watch('./_dist/*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp
        .src(input)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output))
        .pipe(browserSync.stream());
});

/* Files To Move */

gulp.task('move', function(){
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    return gulp
        .src(filesToMove, { base: './_src' })
        .pipe(gulp.dest(outputRoot));
});

/* Files To Move (Watch) */

gulp.task('move:watch', function() {
  return gulp
    .watch(filesToMove, ['move'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', liking turtles...');
    });
});

/* sassDoc */

gulp.task('sassdoc', function () {
  return gulp
    .src(input)
    .pipe(sassdoc())
    .resume();
});

gulp.task('default', ['serve']);