/*global require, module */

'use strict';

var handyman = require('pipeline-handyman');
var gulp = require('gulp');
var lazypipe = require('lazypipe');
var plugins = require('gulp-load-plugins')({lazy: true});
var reporter = require('gulp-less-reporter');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({browsers: ['last 2 versions']});

var config = {
  output: 'dist/'
};

module.exports = compileLESSPipeline;

function compileLESSPipeline(options) {

  if (config) {
    config = handyman.updateConf(config, options);
  }

  var pipeline = {
    compileLESS: compileLESS()
  };

  return pipeline;

  function compileLESS() {
    return lazypipe()
      .pipe(addLESSReporter)
      .pipe(gulp.dest, config.output);
  }

  function addLESSReporter() {
    return plugins.piece(
      plugins.less({
        plugins: [autoprefix]
      })
      .on('error', reporter)
    );
  }
}
