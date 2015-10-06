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
    .src(['src/**/*.js'])
    .pipe(lessToCssPipeline.compileLess());
});
```

## Options


## Results



## LICENSE
