var gulp = require('gulp');
var rollup = require('gulp-rollup');
var babel = require('rollup-plugin-babel');
var sourcemaps = require('gulp-sourcemaps');

function generalRollup(target, destination) {
  return gulp.src(target, { read: false })
    .pipe(rollup({
      sourceMap: true,
      plugins: [babel({})],
      format: 'es6',
      dest: destination + 'index.module.js'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destination));
}

gulp.task('server', () => {
  return generalRollup('src/index.js', 'dist/');
});

gulp.task('default', ['server']);
