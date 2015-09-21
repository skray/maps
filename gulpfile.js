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
var replace = require('gulp-replace');

var paths = {
    html: 'src/**/*.html', 
    less: 'src/**/*.less',
    css: [
      'node_modules/leaflet/dist/leaflet.css',
      'node_modules/leaflet-draw/dist/leaflet.draw.css'
    ],
    images: [
      'node_modules/leaflet/dist/images/**',
      'node_modules/leaflet-draw/dist/images/**',
      'src/images/**'
    ],
    js: {
      internal: [
        'src/app.js',
        'src/**/*.js'
      ],
      external: [
        'node_modules/angular/angular.js', 
        'node_modules/angular-route/angular-route.js', 
        'node_modules/angular-simple-logger/dist/index.js',
        'node_modules/leaflet/dist/leaflet.js',
        'node_modules/angular-leaflet-directive/dist/angular-leaflet-directive.js',
        'node_modules/firebase/lib/firebase-web.js',
        'node_modules/angularfire/dist/angularfire.js'
      ]
    }
};

// Clean
gulp.task('clean-external-css', function() {
  return del(['public/deps.css']);
});

gulp.task('clean-less-css', function() {
  return del(['public/app.css']);
});

gulp.task('clean-internal-js', function() {
  return del('public/**/internal.js');
});

gulp.task('clean-external-js', function() {
  return del('public/**/external.js');
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

// concat
gulp.task('concat-css', ['clean-external-css'], function() {
    return gulp.src(paths.css)
      .pipe(concat('deps.css'))
      .pipe(gulp.dest('public'));
});

gulp.task('concat-internal-js', ['clean-internal-js'], function() {
    return gulp.src(paths.js.internal)
      .pipe(concat('internal.js'))
      .pipe(gulp.dest('public'))
      .pipe(connect.reload());
});

gulp.task('concat-external-js', ['clean-external-js'], function() {
    return gulp.src(paths.js.external)
      .pipe(replace(/module.exports = Firebase/g, ''))
      .pipe(concat('external.js'))
      .pipe(gulp.dest('public'))
      .pipe(connect.reload());
});

gulp.task('concat', ['concat-css', 'concat-external-js', 'concat-internal-js']);

// copy
gulp.task('copy-images', ['clean-images'], function() {
    return gulp.src(paths.images)
      .pipe(gulp.dest('public/images'));
});

gulp.task('copy-html', ['clean-html'], function() {
    return gulp.src([paths.html])
      .pipe(gulp.dest('public'))
      .pipe(connect.reload());
});

gulp.task('copy', ['copy-images', 'copy-html']);


gulp.task('deploy', ['build'], function () {
    return gulp.src('public/**/*')
        .pipe(deploy());
});

gulp.task('connect', function(){
  return connect.server({
    root: './public',
    port: 8000,
    livereload: true
  });
});

gulp.task('less', ['clean-less-css'], function () {
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
    gulp.watch(paths.html, ['copy-html']);
    gulp.watch(paths.js.internal, ['concat-internal-js']);
    gulp.watch(paths.js.external, ['concat-external-js']);
    gulp.watch(paths.less, ['less']);
});


gulp.task('publish', ['deploy']);
gulp.task('dev', ['connect', 'watch', 'build']);
gulp.task('build', ['concat', 'less', 'copy'])

gulp.task('default', ['dev']);