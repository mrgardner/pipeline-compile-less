'use strict';

var assert = require('stream-assert');
var handyman = require('pipeline-handyman');
var compilePipeline = require('../src/index.js');
var gulp = require('gulp');
var path = require('path');
var testPath = path.join(__dirname, 'dest');

function getFixtures (glob) {
  return path.join(__dirname, 'fixtures', glob);
}

describe('pipeline-compile-less', function() {

  it('Should output one file after concatenation', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline({
        addSourceMaps: false,
        output: testPath
      }).compileLESS())
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) {
        d.relative.toString().should.eql(handyman.getPackageName() + '.css');
      }));

    done();
  });

  it('Should output the concatenated file and the map', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline({addSourceMaps: true, output: testPath}).compileLESS())
      .pipe(assert.length(2));

    done();
  });

  it('Should output the same number of files compiled', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline({
        addSourceMaps: false,
        concatCSS: false,
        output: testPath}
      ).compileLESS())
      .pipe(assert.length(2));

    done();
  });

  it('Should output one file after concatenation', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline({
        autoprefix: false,
        addSourceMaps: false,
        output: testPath
      }).compileLESS())
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) { d.relative.toString().should.eql('concat.css'); }));

    done();
  });

  it('Should output one file after concatenation', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline({
        autoprefix: false,
        addSourceMaps: false,
        output: testPath,
        concatCSS: false
      }).compileLESS())
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) { d.relative.toString().should.eql('concat.css'); }));

    done();
  });

  it('Should output one file after concatenation with default options', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline().compileLESS())
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) { d.relative.toString().should.eql('concat.css'); }));

    done();
  });
});
