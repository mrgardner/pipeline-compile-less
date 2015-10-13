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

    1. __autoprefix__ If you don't want to have your CSS rules prefixed set this property to __false__.

    2. __concatCSS__ If set to __false__ the pipeline won't concatenate the files to generate a single CSS file.

    3. __addSourceMaps__ If set to __false__ source maps won't be generated for the compiled files. By default the pipeline will generate the source maps and store them in _maps_.

    4. __plugins__ Gathers all of the specific configurations for the tasks used in the pipeline.

      + __plugins.autoprefix__ Adds vendor specific prefixes automatically for the last 2 versions. Also, you can provide your own autoprefix configuration setting an object-- following [this](https://github.com/postcss/autoprefixer#browsers) rules.


  Default:
  ```javascript
  config = {
    autoprefix: true,
    concatCSS: false,
    addSourceMaps: true,
    plugins: {
      autoprefix: {browsers: ['last 2 versions']},
    }
  };
  ```  

## Results

This pipeline returns an object. This object receives a stream with the LESS files to compile, and you can call the _compileLESS_ method to execute the compilation. After finishing the process you will have a folder named as _config.output_ . This folder can contain files as follows:

  + All of the CSS files generated; keeping the same folder structure from the source.

  + The CSS rules that need vendor prefixes will be completed based on [Autoprefixer](https://github.com/postcss/autoprefixer).

  + Source maps will be store in _config.output/maps_. This can be avoid setting _config.addSourceMaps_ to __false__.

  + If _config.concatCSS_ is __true__ a `concat.css` file will be generated.


## LICENSE

  + MIT
