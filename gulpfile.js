var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var path = require('path');
var del  = require('del');

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

gulp.task('less', ['clean'], function () {
    return gulp.src('src/**/*.less')
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest('public'));
});

gulp.task('copy-images', ['clean'], function() {
    return gulp.src(['node_modules/leaflet/dist/images/**'])
      .pipe(gulp.dest('public/maps/images'));
});

gulp.task('copy-src', ['clean'], function() {
    return gulp.src(['src/**/*.html', 'src/**/*.js'])
      .pipe(gulp.dest('public'));
});

gulp.task('copy', ['copy-images', 'copy-src']);

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

gulp.task('default', ['concat', 'less', 'copy']);