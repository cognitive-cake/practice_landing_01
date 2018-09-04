/* eslint-disable */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var wait = require('gulp-wait');
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");


gulp.task('style', function () {
  gulp.src('sass/style.scss')
    .pipe(wait(500))
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
        ]
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('css'))
    .pipe(server.stream());
});

gulp.task('images-test', function () {
  return gulp.src('img/raw/**/*.{png,jpg,gif}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      })
    ]))
    .pipe(gulp.dest('img/dist'));
});

// gulp.task("babel", function () {
//   return gulp.src("js/*.js")
//     .pipe(sourcemaps.init())
//     .pipe(babel())
//     .pipe(concat("bundle.js"))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest("js/dist"));
// });

gulp.task('serve', function () {
  server.init({
    server: '.',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  // gulp.watch('js/*.js', ['babel']);
  gulp.watch('*.html').on('change', server.reload);
});
