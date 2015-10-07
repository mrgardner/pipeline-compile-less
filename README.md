## Pipeline-compile-less


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| Pipeline-compile-less| This pipeline compiles LESS files and returns CSS files | 0.1.0 |

# Overview


_repo_: `https://github.com/kenzanmedia/pipeline-compile-less/`

_jenkins_: `TODO`

## Install
`npm install git+ssh:git@github.com:kenzanmedia/pipeline-compile-less.git`

## Usage
```javascript
var gulp = require('gulp');
var lessToCssPipeline = require('pipeline-compile-less')();


gulp.task('default', function() {
  return gulp
    .src(['src/**/*.less'])
    .pipe(lessToCssPipeline.compileLess());
});
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    + __config.concatCSS:__ If set to _true_ the pipeline will concatenate all of the files and generate a single CSS file.

    + __config.addSourceMaps:__ If set to _false_ source maps won't be generated for the compile files. By default the pipeline will generate the source maps and store them in _maps_.

    + __config.autoprefix:__ Adds vendor specific prefixes automatically. If you don't want to have your CSS rules prefixed set this property to _false_.

    + __config.output:__ Sets the path to output the generated CSS files.


  Default:
  ```javascript
  config = {
    concatCSS: false,
    addSourceMaps: true,
    autoprefix: true,
    output: 'dist/'
  }
  ```  

## Results

This pipeline returns an object. This object receives a stream with the LESS files to compile, and you can call the _compileLESS_ method to execute the compilation. After finishing the process you will have a folder named as _config.output_ . This folder can contain files as follows:

  + All of the CSS files generated; keeping the same folder structure from the source.

  + The CSS rules that need vendor prefixes will be completed based on [Autoprefixer](https://github.com/postcss/autoprefixer).

  + Source maps will be store in _config.output/maps_. This can be avoid setting _config.addSourceMaps_ to __false__.

  + If _config.concatCSS_ is __true__ a `concat.css` file will be generated.


## LICENSE
