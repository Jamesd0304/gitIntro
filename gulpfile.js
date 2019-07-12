'use strict'
const gulp = require('gulp');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');
const jshint = require('gulp-jshint');

function testing(done) {
  console.log('running FIRST TEST--Bout to minify HTML!');
  done();
}
function testing2(done) {
  console.log('running SECOND TEST');
  done();
}
function babelize(done) {
gulp.src('./index.js')
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(gulp.dest('dist'))
        done();
  }
 function htmlmini(done) {
    gulp.src('./index.html')
          .pipe(htmlmin({collapseWhitespace: true }))
          .pipe(gulp.dest('dist'));
          done();
  }
function cssClean(done) {
    gulp.src('./main.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
        done();
  }
function jsPath(done) {
    gulp.src('./bj_script.js')
        .pipe(babel({
          presets: ['@babel/env']
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
        done();
  }

  function jsHinter(done) {
    gulp.src('./index.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
        done();
  }


let testTask = gulp.series(testing, testing2);

let babelTask = gulp.series(testing, babelize);

let htmlMinify = gulp.series(testing, htmlmini);

let cssMinify = gulp.series(testing, cssClean);

let jsMin = gulp.series(testing, jsPath);

let jsHint = gulp.series(testing, jsHinter);

gulp.task('testing', testTask);
gulp.task('babel', babelTask);
gulp.task('htmlmin', htmlMinify);
gulp.task('cssmin', cssMinify);
gulp.task('jsmin', jsMin);
gulp.task('jshint', jsHint);
