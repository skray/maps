(function(angular) {
	angular
		.module('maps', ['ngRoute', 'leaflet-directive'])
		.config(configure);

	function configure($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'list.html',
				controller: 'ListCtrl'
			})
			.when('/maps/:id', {
				templateUrl: 'maps/viewer.html',
				controller: 'MapCtrl'
			});

		$locationProvider.html5Mode(true);
	}

})(window.angular);