/* ====== Gulp Plugins ====== */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');

/* ====== Variables ====== */

var input = './_src/sass/**/*.scss';
var output = './_dist/css';
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

/* ====== Tasks ====== */

/* SASS */

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output))
});

/* sassDoc */

gulp.task('sassdoc', function () {
  return gulp
    .src(input)
    .pipe(sassdoc())
    .resume();
});

/* ====== Tasks (Watched) ====== */

/* SASS Updates */

gulp.task('sass:watch', function() {
  return gulp
    .watch(input, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

/* ====== Tasks (Default) ====== */

gulp.task('default', ['sass', 'sass:watch']);