/*global require, module */

'use strict';

var handyman = require('pipeline-handyman');
var gulp = require('gulp');
var lazypipe = require('lazypipe');
var plugins = require('gulp-load-plugins')({lazy: true});
var reporter = require('gulp-less-reporter');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');

var config = {
  concatCSS: false,
  addSourceMaps: true,
  autoprefix: true,
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
      .pipe(function() {
        return plugins.if(config.addSourceMaps, plugins.sourcemaps.init());
      })
      .pipe(addLESSReporter)
      .pipe(function() {
        return plugins.if(config.concatCSS, plugins.concat('concat.css'));
      })
      .pipe(function() {
        return plugins.if(config.addSourceMaps, plugins.sourcemaps.write('maps'));
      })
      .pipe(gulp.dest, config.output);
  }

  function addLESSReporter() {
    var autoprefix;

    if (typeof config.autoprefix === 'object') {
      autoprefix = new LessPluginAutoPrefix(config.autoprefix);
    } else {
      autoprefix = new LessPluginAutoPrefix({browsers: ['last 2 versions']});
    }

    var lessPlugins = config.autoprefix ? {plugins: [autoprefix]} : {plugins: []};
    return plugins.piece(
      plugins.less(lessPlugins)
      .on('error', reporter),
      gulp.dest(config.output)
    );
  }
}
