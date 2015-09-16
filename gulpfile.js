var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var path = require('path');
var del  = require('del');
var gutil = require('gulp-util');
var deploy = require('gulp-gh-pages');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');

var EXPRESS_PORT = 8001;
var EXPRESS_ROOT = 'public';
var LIVERELOAD_PORT = 35729;
 
// Let's make things more readable by
// encapsulating each part's setup
// in its own method
function startExpress() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
}

var paths = {
    html: 'src/**/*.html', 
    less: 'src/**/*.less',
    js: ['src/**/*.js', 'node_modules/angular/angular.js', 'node_modules/angular-route/angular-route.js']
};

var cssdeps = [
    'node_modules/leaflet/dist/leaflet.css',
    'node_modules/leaflet-draw/dist/leaflet.draw.css'
];

gulp.task('clean-css', function() {
  return del(['public/**/*.css','!public/deps.css']);
});

gulp.task('clean-js', function() {
  return del('public/**/*.js');
});

gulp.task('clean-images', function() {
  return del('public/**/*.png');
});

gulp.task('clean-html', function() {
  return del('public/**/*.html');
});

gulp.task('clean', function() {
  return del('public');
});

gulp.task('concat-css', ['clean-css'], function() {
    return gulp.src(cssdeps)
      .pipe(concat('deps.css'))
      .pipe(gulp.dest('public'));
});

gulp.task('concat', ['concat-css']);

gulp.task('copy-draw-images', ['clean-images'], function() {
    return gulp.src(['node_modules/leaflet-draw/dist/images/**'])
      .pipe(gulp.dest('public/images'));
});

gulp.task('copy-images', ['clean-images'], function() {
    return gulp.src(['node_modules/leaflet/dist/images/**','node_modules/leaflet-draw/dist/images/**','src/images/**'])
      .pipe(gulp.dest('public/maps/images'));
});

gulp.task('copy-src', ['clean-html'], function() {
    return gulp.src([paths.html].concat(paths.js))
      .pipe(gulp.dest('public'))
      .pipe(livereload());
});

gulp.task('copy', ['copy-images', 'copy-draw-images', 'copy-src']);


gulp.task('deploy', ['build'], function () {
    return gulp.src('public/**/*')
        .pipe(deploy());
});

gulp.task('less', ['clean-css'], function () {
    return gulp.src(paths.less)
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest('public'))
      .pipe(livereload());
});

gulp.task('watch', function() {
    startExpress();
    livereload.listen();
    gulp.watch(paths.html, ['copy-src']);
    gulp.watch(paths.js, ['copy-src']);
    gulp.watch(paths.less, ['less']);
});


gulp.task('publish', ['deploy']);
gulp.task('dev', ['watch', 'build']);
gulp.task('build', ['concat', 'less', 'copy'])

gulp.task('default', ['dev']);