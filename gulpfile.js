var gulp = require('gulp');
var babel = require('rollup-plugin-babel');
var rollup = require('gulp-rollup');

gulp.task('rollup', () => {
  return gulp.src('src/index.js', { read: false })
    .pipe(rollup({
      plugins: [babel()]
    }))
    .pipe(gulp.dest('dist/rollup'));
});

gulp.task('default', ['rollup']);
