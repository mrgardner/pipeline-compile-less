/* global require */
'use strict';

var compilePipeline = require('../');
var gulp = require('gulp');
var path = require('path');
var assert = require('stream-assert');
var should = require('chai').should();
var handyman = require('pipeline-handyman');

var fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); };

describe('pipeline-compile-less', function() {

  var testPath = path.join(__dirname, 'dist');

  it('Should output one file after concatenation', function (done) {
    gulp
      .src(fixtures('*'))
      .pipe(compilePipeline({addSourceMaps: false, concatCSS:true, output: testPath}).compileLESS())
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) { d.relative.toString().should.eql(handyman.getPackageName() + '.css'); }))
      .pipe(assert.end(done));
  });

  it('Should output the concatenated file and the map', function (done) {
    gulp
      .src(fixtures('*'))
      .pipe(compilePipeline({addSourceMaps: true, output: testPath}).compileLESS())
      .pipe(assert.length(2))
      .pipe(assert.end(done));
  });

  it('Should output the same number of files compiled', function (done) {
    gulp
      .src(fixtures('*'))
      .pipe(compilePipeline({addSourceMaps: false, concatCSS: false, output: testPath}).compileLESS())
      .pipe(assert.length(2))
      .pipe(assert.end(done));
  });

  it('Should output the same number of files compiled and the map for each one', function (done) {
    gulp
      .src(fixtures('*'))
      .pipe(compilePipeline({addSourceMaps: true, concatCSS: false, output: testPath}).compileLESS())
      .pipe(assert.length(4))
      .pipe(assert.end(done));
  });

});
