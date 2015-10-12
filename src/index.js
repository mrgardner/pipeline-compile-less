/*global require, module */

'use strict';

var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var plugins = require('gulp-load-plugins')({lazy: true});
var reporter = require('gulp-less-reporter');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');

var config = {
  autoprefix: true,
  concatCSS: true,
  addSourceMaps: true,
  plugins: {
    autoprefix: {browsers: ['last 2 versions']},
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

    var autoprefix = new LessPluginAutoPrefix(config.plugins.autoprefix);
    var lessPlugins = config.autoprefix ? {plugins: [autoprefix]} : {plugins: []};

    return lazypipe()
      .pipe(function() {
        return plugins.if(config.addSourceMaps, plugins.sourcemaps.init());
      })
      .pipe(function() {
        return plugins.less(lessPlugins).on('error', reporter);
      })
      .pipe(function() {
        return plugins.if(config.concatCSS, plugins.concat('concat.css'));
      })
      .pipe(function() {
        return plugins.if(config.addSourceMaps, plugins.sourcemaps.write('maps'));
      });
  }

}
