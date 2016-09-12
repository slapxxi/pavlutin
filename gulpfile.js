const gulp = require('gulp');


gulp.task('css', () => {
  const postcss = require('gulp-postcss');
  const sourcemaps = require('gulp-sourcemaps');
  const concatcss = require('gulp-concat-css');

  const postcssProcessors = [
    require('autoprefixer'),
    require('precss')({
      import: {extension: 'scss'}
    }),
    require('cssnano')
  ];

  return gulp.src('src/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(postcssProcessors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('static/'));
});


gulp.task('watch:css', () => {
  gulp.watch(['src/**/*.css', 'src/**/*.scss'], ['css'])
})
