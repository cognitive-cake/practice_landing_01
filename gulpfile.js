/* eslint-disable */


const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const mqpacker = require('css-mqpacker');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const wait = require('gulp-wait');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');


gulp.task('style', () => {
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
          'last 2 Edge versions',
        ],
      }),
      mqpacker({
        sort: true,
      }),
    ]))
    .pipe(gulp.dest('css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('css'))
    .pipe(server.stream());
});

gulp.task('images-test', () => gulp.src('img/raw/**/*.{png,jpg,gif}')
  .pipe(imagemin([
    imagemin.optipng({
      optimizationLevel: 3,
    }),
    imagemin.jpegtran({
      progressive: true,
    }),
  ]))
  .pipe(gulp.dest('img/dist')));

// gulp.task("babel", function () {
//   return gulp.src("js/*.js")
//     .pipe(sourcemaps.init())
//     .pipe(babel())
//     .pipe(concat("bundle.js"))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest("js/dist"));
// });

gulp.task('serve', () => {
  server.init({
    server: '.',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  // gulp.watch('js/*.js', ['babel']);
  gulp.watch('*.html').on('change', server.reload);
});
