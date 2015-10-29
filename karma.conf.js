module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
	    'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
	    'node_modules/angular-route/angular-route.js',
        'node_modules/angular-animate/angular-animate.js',
	    'node_modules/angular-simple-logger/dist/index.js',
	    'node_modules/leaflet/dist/leaflet.js',
	    'node_modules/angular-leaflet-directive/dist/angular-leaflet-directive.js',
	    'node_modules/firebase/lib/firebase-web.js',
	    'node_modules/angularfire/dist/angularfire.js',
        'node_modules/leaflet-editable/src/Leaflet.Editable.js',
        'node_modules/ng-file-upload/dist/ng-file-upload.js',
        'src/app.js',
	    'src/**/*.js'
    ],
    browsers: [
        'Chrome'
    ],
    reporters: ['nyan']
  });
};
