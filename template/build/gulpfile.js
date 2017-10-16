var gulp = require('gulp'),
    sass = require('gulp-sass'),
    // minifycss = require('gulp-minify-css'),
    // import concat from 'gulp-concat'
    rename = require('gulp-rename'),
    cssnext = require("gulp-cssnext"),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    mqpacker = require('css-mqpacker'),
    babel = require("gulp-babel"),
    // svgSprite = require("gulp-svg-sprites"),
    fs = require('fs');


gulp.task('taskCSS', function() {
  return gulp.src('scss/global.scss')
    .pipe(sass({style: 'compressed', errLogToConsole: true }))
    .pipe(postcss([

      mqpacker,

      autoprefixer({
        remove: false,
        browsers: ["last 2 versions"]
      }),

      cssnano({
        discardComments: {
          removeAll: true
        },
        discardOverridden: true,
        discardDuplicates: true,
        minifySelectors: true,
        normalizeUrl: false,
        convertValues: false,
        zindex: false
      }),

    ]))
    .pipe(rename('global.css'))
    .pipe(gulp.dest('../public/css/'))
});

// gulp.task('taskSVGsprite', function () {
//     return gulp.src('images/*.svg')
//         .pipe(svgSprite({
//             svg: {
//                 baseSize: 20,
//                 preview: false,
//                 css: false,
//                 sprite: "sprite.svg"
//             }
//         }))
//         .pipe(gulp.dest("../public/images/svg/"))
// });

gulp.task('taskJS', function() {
  return gulp.src("js/global.js")
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest("../public/js/"))
});

gulp.task('taskFONTS', function() {
    gulp.src('fonts/*.woff2')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('../public/fonts/'))
});

gulp.task('taskIMAGES', function() {
    gulp.src(['images/*.*', 'images/**/*.*'])
    // Perform minification tasks, etc here
    .pipe(gulp.dest('../public/images/'))
});

gulp.task('taskHTML', function() {
    gulp.src(['html/*.html', 'html/*.htm'])
    .pipe(gulp.dest('../public/'))
});

gulp.task('watch', function() {
  // Watch SCSS
  gulp.watch(['./scss/*.scss', './scss/**/*.scss'], ['taskCSS'])

  // Watch JS files
  gulp.watch('./js/*.js', ['taskJS'])

  // Watch font files
  gulp.watch('./fonts/*.woff2', ['taskFONTS'])

  // Watch image files
  gulp.watch(['./images/*.jpg', './images/*.svg', './images/*.png'], ['taskIMAGES'])

  // Watch HTML files
  gulp.watch(['./html/*.html', './html/*.htm'], ['taskHTML'])
});

gulp.task('default', ["taskCSS", "taskJS", "taskFONTS", "taskIMAGES", "taskHTML"], function() {
});