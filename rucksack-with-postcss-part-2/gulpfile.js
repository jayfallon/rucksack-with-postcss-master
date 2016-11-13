//- gulpfile.js

//- required packages
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rucksack = require('rucksack-css');
var dependencies = require('gulp-html-dependencies');

//- default gulp task to run css and html tasks
gulp.task('default', ['watch']);

//- gulp watch task that watches over any changes in our
//- html and css directories
gulp.task('watch', function(){
  gulp.watch('src/html/**/*.html', ['build:html']);
  gulp.watch('src/css/**/*.css', ['build:css']);
});

//- html build task
gulp.task('build:html', function(){
  return gulp.src('src/html/index.html')
    .pipe(dependencies({
      dest: 'build',
      prefix: 'vendor',
      flat: true
    }))
    .pipe(gulp.dest('./build'));
});

//- css build task
gulp.task('build:css', function(){
  return gulp.src('src/css/main.css')
    .pipe(dependencies({
      dest: 'build',
      prefix: 'vendor',
      flat: true
    }))
    .pipe(gulp.dest('./build/css/'));
});
