var gulp = require('gulp');


gulp.task('css', function() {
  var postcss = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');
  var concatcss = require('gulp-concat-css');

  var postcssProcessors = [
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


gulp.task('watch:css', function() {
  gulp.watch(['src/**/*.css', 'src/**/*.scss'], ['css']);
})
