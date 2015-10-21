'use strict';

var gulp = require('gulp');
var compilePipeline = require('./src/index.js')();
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

gulp.task('test', function(){
  return gulp.src(config.jsFiles)
    .pipe(testPipeline.test());
});

gulp.task('validate', function() {

  return gulp.src(config.jsFiles)
    .pipe(validatePipeline.validateJS());
});

gulp.task('build', ['validate', 'test'] , function() {

  return gulp.src(config.lessFiles)
    .pipe(compilePipeline.compileLESS());
});