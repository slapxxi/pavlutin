const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack-stream');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const stylelint = require('gulp-stylelint');
const webpackConfig = require('./webpack.config.js');
const browsersync = require('browser-sync');

const ENV = environment(process.env.NODE_ENV);


gulp.task('default', ['build'])

gulp.task('watch', ['browsersync'], () => {
  gulp.watch('src/**/*.js', ['build:js']);
  gulp.watch('src/**/*.{css,scss}', ['build:css']);
  gulp.watch('src/**/*.{png,jpg,gif,svg}', ['build:img']);
  gulp.watch('templates/**/*.html', () => {
    browsersync.reload();
  });
});

gulp.task('build', ['build:css', 'build:js', 'build:img']);

gulp.task('build:css', ['clean:css'], () => {
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
    .pipe(browsersync.stream());
});

gulp.task('build:js', ['clean:js'], () => {
  return gulp.src('src/js/index.js')
    .pipe(webpack(webpackConfig))
    .on('error', handleError)
    .pipe(gulp.dest('static/js'))
    .pipe(browsersync.stream());
});

gulp.task('build:img', ['clean:img'], () => {
  gulp.src('src/img/*.{png,ico,jpeg,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('static/img/'));
});

gulp.task('clean:css', () => {
  return del(['static/css']);
});

gulp.task('clean:js', () => {
  return del(['static/js']);
});

gulp.task('clean:img', () => {
  return del(['static/img']);
});

gulp.task('lint:css', () => {
  return gulp.src('src/**/*.{css,scss}')
    .pipe(stylelint({reporters: [{formatter: 'string', console: true}]}));
});

gulp.task('browsersync', () => {
  browsersync.init({
    proxy: 'localhost:8000'
  });
});

function environment(env) {
  return env || 'development';
}

function handleError(e) {
  console.log(e.toString());
  this.emit('end');
}
