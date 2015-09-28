(function(angular) {
	angular
		.module('maps', ['ngRoute', 'leaflet-directive', 'firebase'])
		.config(configure)
		.constant('FIREBASE_REF', new Firebase("https://amber-inferno-2147.firebaseio.com"));

	function configure($routeProvider, $locationProvider) {

		/*
		 * Routes
		 */
		$routeProvider
			.when('/', {
				templateUrl: 'maplist/maplist.html',
				controller: 'MapListCtrl',
				controllerAs: 'vm'
			})
			.when('/maps/:id', {
				templateUrl: 'map/map.html',
				controller: 'MapCtrl',
				controllerAs: 'vm'
			});

	}

})(window.angular);