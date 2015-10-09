/*global require, module */

'use strict';

var handyman = require('pipeline-handyman');
var gulp = require('gulp');
var lazypipe = require('lazypipe');
var plugins = require('gulp-load-plugins')({lazy: true});
var reporter = require('gulp-less-reporter');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');

var config = {
  skipAutoprefix: false,
  opts: {
    concatCSS: false,
    addSourceMaps: true,
    autoprefix: {browsers: ['last 2 versions']},
    output: 'dist/'
  }
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
        return plugins.if(config.opts.addSourceMaps, plugins.sourcemaps.init());
      })
      .pipe(generateCSSFiles)
      .pipe(function() {
        return plugins.if(config.opts.concatCSS, plugins.concat('concat.css'));
      })
      .pipe(function() {
        return plugins.if(config.opts.addSourceMaps, plugins.sourcemaps.write('maps'));
      })
      .pipe(gulp.dest, config.opts.output);
  }

  function generateCSSFiles() {
    var autoprefix = new LessPluginAutoPrefix(config.opts.autoprefix);
    var lessPlugins = config.skipAutoprefix ? {plugins: []} : {plugins: [autoprefix]};

    return plugins.piece(
      plugins.less(lessPlugins)
      .on('error', reporter),
      gulp.dest(config.opts.output)
    );
  }
}
