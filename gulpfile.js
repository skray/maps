var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var path = require('path');
var del  = require('del');
var deploy = require('gulp-gh-pages');
var livereload = require('gulp-livereload');

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
    js: 'src/**/*.js',
    less: 'src/**/*.less'
};

var jsdeps = [
    'node_modules/leaflet/dist/leaflet.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/transparency/dist/transparency.min.js'
];

var cssdeps = [
    'node_modules/leaflet/dist/leaflet.css'
];

gulp.task('clean', function(cb) {
    del('public', cb);
});

gulp.task('concat-css', ['clean'], function() {
    return gulp.src(cssdeps)
      .pipe(concat('deps.css'))
      .pipe(gulp.dest('public'));
});

gulp.task('concat-js', ['clean'], function() {
    return gulp.src(jsdeps)
      .pipe(concat('deps.js'))
      .pipe(gulp.dest('public'));
});

gulp.task('concat', ['concat-css', 'concat-js']);


gulp.task('copy-images', ['clean'], function() {
    return gulp.src(['node_modules/leaflet/dist/images/**', 'src/images/**'])
      .pipe(gulp.dest('public/maps/images'));
});

gulp.task('copy-src', ['clean'], function() {
    return gulp.src([paths.html, paths.js])
      .pipe(gulp.dest('public'))
      .pipe(livereload());
});

gulp.task('copy', ['copy-images', 'copy-src']);


gulp.task('deploy', ['build'], function () {
    return gulp.src('public/**/*')
        .pipe(deploy());
});

gulp.task('less', ['clean'], function () {
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
    gulp.watch([paths.html, paths.js, paths.less], ['build']);
});


gulp.task('publish', ['deploy']);
gulp.task('dev', ['watch', 'build']);
gulp.task('build', ['concat', 'less', 'copy'])

gulp.task('default', ['dev']);