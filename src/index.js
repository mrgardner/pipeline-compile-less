'use strict';

var autoprefixPlugin = require('less-plugin-autoprefix');
var concat = require('gulp-concat');
var handyman = require('pipeline-handyman');
var gulpIf = require('gulp-if');
var lazypipe = require('lazypipe');
var less = require('gulp-less');
var reporter = require('gulp-less-reporter');
var sourcemaps = require('gulp-sourcemaps');

var config = {
  autoprefix: true,
  concatCSS: true,
  outputFileName: handyman.getPackageName() + '.css',
  addSourceMaps: true,
  plugins: {
    autoprefix: {browsers: ['last 2 versions']}
  }
};

module.exports = {
  compileLESS: function(options) {
    if (options) {
      handyman.log('Merging custom configuration');
      config = handyman.mergeConf(config, options);
    }
    return pipelineFactory();
  }
};

function pipelineFactory() {
  var lessPlugins = {};
  var autoprefix = new autoprefixPlugin(config.plugins.autoprefix);
  var pipeline;

  lessPlugins.plugins = config.autoprefix ? [autoprefix] : [];
  pipeline = lazypipe()
    .pipe(function() {
      return gulpIf(config.addSourceMaps, sourcemaps.init());
    })
    .pipe(function() {
      return less(lessPlugins).on('error', reporter);
    })
    .pipe(function() {
      return gulpIf(config.concatCSS, concat(config.outputFileName));
    })
    .pipe(function() {
      return gulpIf(config.addSourceMaps, sourcemaps.write('.'));
    });

  return pipeline();
}
