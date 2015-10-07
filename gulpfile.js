
'use strict';

var gulp = require('gulp');
var compilePipeline = require('./src/index.js')();
var validatePipeline = require('pipeline-validate-js')();

var config = {
  files: [
   'src/**/*.js',
  ],

  LESS_Files: [
   'test/**/*.less'
  ]

};

gulp.task('validate', function() {
  return gulp
    .src(config.files)
    .pipe(validatePipeline.validateJS());
});

gulp.task('default', ['validate'] , function() {
  return gulp
    .src(config.LESS_Files)
    .pipe(compilePipeline.compileLESS());
});
