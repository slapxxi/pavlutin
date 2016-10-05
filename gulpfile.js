const gulp = require('gulp');
const del = require('del');

const ENV = environment(process.env.NODE_ENV);


gulp.task('default', ['build'])

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['build:js']);
  gulp.watch('src/**/*.{css,scss}', ['build:css']);
});

gulp.task('build', ['build:css', 'build:js']);

gulp.task('build:css', ['clean:css'], () => {
  const postcss = require('gulp-postcss');
  const sourcemaps = require('gulp-sourcemaps');
  const concatcss = require('gulp-concat-css');
  const cssnano = require('gulp-cssnano');

  const postcssProcessors = [
    require('precss')({
      import: {extension: 'scss'}
    }),
    require('postcss-cssnext')
  ];

  return gulp.src('src/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(postcssProcessors))
    .on('error', handleError)
    .pipe(cssnano({discardComments: {removeAll: true}}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('static'))
});

gulp.task('build:js', ['clean:js'], () => {
  const webpack = require('gulp-webpack');
  return gulp.src('src/js/index.js')
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest('static/js'))
});

gulp.task('clean:css', () => {
  return del(['static/css']);
});

gulp.task('clean:js', () => {
  return del(['static/js']);
});

gulp.task('lint:css', () => {
  const stylelint = require('gulp-stylelint');
  return gulp.src('src/**/*.{css,scss}')
    .pipe(stylelint({reporters: [{formatter: 'string', console: true}]}));
});

function environment(env) {
  return env || 'development';
}

function handleError(e) {
  console.log(e.toString());
  this.emit('end');
}
