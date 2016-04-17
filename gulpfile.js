var gulp = require('gulp');
var babel = require('rollup-plugin-babel');
var rollup = require('gulp-rollup');
var less = require('gulp-less');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('rollup', () => {
  return gulp.src('src/index.js', { read: false })
    .pipe(rollup({
      plugins: [babel()]
    }))
    .pipe(gulp.dest('public/'));
});

gulp.task('views', () => {
  return gulp.src('src/front/**/*.html')
    .pipe(gulp.dest('public/front'));
});

gulp.task('css', () => {
  return gulp.src('src/front/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/front'));
});

gulp.task('assets', () => {
  return gulp.src(['src/front/assets/**/*.jpg', 'src/front/assets/**/*.png'])
    .pipe(gulp.dest('public/front/assets'));
});

function browserifyFile(file, dest) {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: file,
    debug: true
  });

  return b.transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .on('error', e => console.error(e))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest));
}

gulp.task('js', () => {
  browserifyFile('src/front/js/main/index.js', 'public/front/js/main');
  // browserifyFile('src/front/js/admin/index.js', 'public/front/js/admin');
});

gulp.task('default', ['rollup', 'assets', 'views', 'css', 'js']);
