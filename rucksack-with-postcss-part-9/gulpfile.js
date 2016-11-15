//- gulpfile.js

//- required packages
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rucksack = require('rucksack-css');
var dependencies = require('gulp-html-dependencies');
var googleWebFonts = require('gulp-google-webfonts');
var del = require('del');

//- default gulp task to run clean:tmp on start and watch for css and html tasks
gulp.task('default', ['watch', 'clean:tmp']);

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
    .pipe(postcss([
      rucksack({
        autoprefixer: true,
        fallbacks: true
      })
    ]))
    .pipe(gulp.dest('./build/css/'));
});

//- google web fonts download task
gulp.task('webfonts', function(){
  return gulp.src('./fonts.list')
    .pipe(googleWebFonts({
      fontsDir: 'build/fonts',
      cssDir: 'src/tmp'
    }))
    .pipe(gulp.dest('./'));
});

//- gulp clean task deletes all files in src/temp
gulp.task('clean:tmp', function(){
  return del([
    'src/tmp/**/*'
  ]);
});
