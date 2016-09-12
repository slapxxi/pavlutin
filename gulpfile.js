const gulp = require('gulp');
const webpack = require('gulp-webpack');
const del = require('del');


gulp.task('default', ['build'])

gulp.task('watch', () => {
  gulp.watch('src/**/*.{js,css,scss}', ['build'])
});

gulp.task('build', ['clean', 'build:css', 'build:js']);

gulp.task('clean', (cb) => {
  del(['static/css', 'static/js']);
  return cb(null);
});

gulp.task('build:css', () => {
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
    .pipe(gulp.dest('static'));
});

gulp.task('build:js', () => {
  return gulp.src('src/js/index.js')
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest('static/js'))
})
