'use strict';

var gulp = require('gulp');
var compilePipeline = require('./src/index.js');
var testPipeline = require('pipeline-test-node')();
var validatePipeline = require('pipeline-validate-js')();

var config = {
  jsFiles: [
    'src/**/*.js',
    'test/**/*.js'
  ],

  lessFiles: [
   'test/**/*.less'
  ]

};

gulp.task('validate', function() {

  return gulp.src(config.jsFiles)
    .pipe(validatePipeline.validateJS())
    .pipe(testPipeline.test());

});

gulp.task('build', ['validate'] , function() {

  return gulp.src(config.lessFiles)
    .pipe(compilePipeline.compileLESS());

});