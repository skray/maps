var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var path = require('path');
var del  = require('del');
var gutil = require('gulp-util');
var deploy = require('gulp-gh-pages');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var paths = {
    html: 'src/**/*.html', 
    less: 'src/**/*.less',
    js: [
      'src/**/*.js', 
      'node_modules/angular/angular.js', 
      'node_modules/angular-route/angular-route.js', 
      'node_modules/angular-simple-logger/dist/index.js',
      'node_modules/angular-leaflet-directive/dist/angular-leaflet-directive.js',
      'node_modules/leaflet/dist/leaflet.js',
      'node_modules/firebase/lib/firebase-web.js',
      'node_modules/angularfire/dist/angularfire.js'
    ]
};

var cssdeps = [
    'node_modules/leaflet/dist/leaflet.css',
    'node_modules/leaflet-draw/dist/leaflet.draw.css'
];

gulp.task('connect', function(){
  return connect.server({
    root: './public',
    port: 8000,
    livereload: true
  });
});

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
      .pipe(connect.reload());
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
      .on('error', function(err) { 
        gutil.log(gutil.colors.bgRed('Less Error'), err.message);
        this.emit('end');
      })
      .pipe(postcss([autoprefixer({browsers: ['last 1 version']})]))
      .pipe(gulp.dest('public'))
      .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(paths.html, ['copy-src']);
    gulp.watch(paths.js, ['copy-src']);
    gulp.watch(paths.less, ['less']);
});


gulp.task('publish', ['deploy']);
gulp.task('dev', ['connect', 'watch', 'build']);
gulp.task('build', ['concat', 'less', 'copy'])

gulp.task('default', ['dev']);