'use strict';

var DEFAULT_PATH = 'concat.css';

var assert = require('stream-assert');
var handyman = require('pipeline-handyman');
var compilePipeline = require('../src/index.js');
var gulp = require('gulp');
var path = require('path');
var testPath = path.join(__dirname, 'dest');

function getFixtures (glob) {
  return path.join(__dirname, 'fixtures', glob);
}

function assertPath (file, path) {
  return file.relative.toString().should.eql(path);
}

describe('pipeline-compile-less', function() {

  it('Should output one file after concatenation', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileLESS({
        addSourceMaps: false,
        output: testPath
      }))
      .pipe(assert.length(1))
      .pipe(assert.first(function (file) {
        var customPath = handyman.getPackageName() + '.css';

        assertPath(file, customPath);
      }));

    done();
  });

  it('Should output the concatenated file and the map', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileLESS({addSourceMaps: true, output: testPath}))
      .pipe(assert.length(2));

    done();
  });

  it('Should output the same number of files compiled', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline
      .compileLESS({
        addSourceMaps: false,
        concatCSS: false,
        output: testPath}))
      .pipe(assert.length(2));

    done();
  });

  it('Should output one file after concatenation', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline
      .compileLESS({
        autoprefix: false,
        addSourceMaps: false,
        output: testPath
      }))
      .pipe(assert.length(1))
      .pipe(assert.first(function (file) {
        assertPath(file, DEFAULT_PATH);
      }));

    done();
  });

  it('Should output one file after concatenation', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline
      .compileLESS({
        autoprefix: false,
        addSourceMaps: false,
        output: testPath,
        concatCSS: false
      }))
      .pipe(assert.length(1))
      .pipe(assert.first(function (file) {
        assertPath(file, DEFAULT_PATH);
      }));

    done();
  });

  it('Should output one file after concatenation with default options', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileLESS())
      .pipe(assert.length(1))
      .pipe(assert.first(function (file) {
        assertPath(file, DEFAULT_PATH);
      }));

    done();
  });
});
