/*global require */
'use strict';

var compilePipeline = require('../');
var gulp = require('gulp');
var path = require('path');
var assert = require('stream-assert');

var fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); };

describe('pipeline-compile-less', function() {
  it('Should output the same number of files compiled', function (done) {
    gulp
      .src(fixtures('*'))
      .pipe(compilePipeline({addSourceMaps: false}).compileLESS())
      .pipe(assert.length(2))
      .pipe(assert.end(done));
  });
});
