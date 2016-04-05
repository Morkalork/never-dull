var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('js', () => {
  return gulp.src(['src/**/*.js', '!src/template-module.js'])
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['js']);
