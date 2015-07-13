var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var path = require('path');
var del  = require('del');
var gutil = require('gulp-util');
var deploy = require('gulp-gh-pages');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');

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
    js: 'src/**/*.js'
};

var cssdeps = [
    'node_modules/leaflet/dist/leaflet.css',
    'node_modules/leaflet-draw/dist/leaflet.draw.css'
];

var jsEntryPoints = ['./src/maps/viewer.js']
var bundler = watchify(browserify(jsEntryPoints, watchify.args));
bundler.transform('brfs');
bundler.plugin('factor-bundle', {outputs: ['public/viewer.js']});
bundler.on('update', bundle);

function bundle() {
  console.log('bundling');
  return bundler.bundle()
    .on('error', function(err) { 
      gutil.log(gutil.colors.bgRed('Browserify Error'), err.message);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('public'))
    .pipe(livereload());
}

gulp.task('bundle', bundle);

gulp.task('clean-css', function(cb) {
  del(['public/**/*.css','!public/deps.css'], cb);
});

gulp.task('clean-js', function(cb) {
  del('public/**/*.js', cb);
});

gulp.task('clean-images', function(cb) {
  del('public/**/*.png', cb);
});

gulp.task('clean-html', function(cb) {
  del('public/**/*.html', cb);
});

gulp.task('clean', function(cb) {
  del('public', cb);
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
    return gulp.src(['node_modules/leaflet/dist/images/**','node_modules/leaflet-draw/dist/images/**'])
      .pipe(gulp.dest('public/maps/images'));
});

gulp.task('copy-src', ['clean-html'], function() {
    return gulp.src([paths.html])
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
    // gulp.watch(paths.js, ['bundle']);
    gulp.watch(paths.less, ['less']);
});


gulp.task('publish', ['deploy']);
gulp.task('dev', ['watch', 'build']);
gulp.task('build', ['bundle','concat', 'less', 'copy'])

gulp.task('default', ['dev']);