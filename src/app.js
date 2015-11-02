(function(angular) {
	angular
		.module('maps', ['maps-tpls', 'ngRoute', 'leaflet-directive', 'firebase', 'ngAnimate', 'ngFileUpload'])
		.config(configure)
		.constant('FIREBASE_REF', new Firebase('https://amber-inferno-2147.firebaseio.com'))
		.run(run);

	function configure($routeProvider) {

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

	function run(AuthSvc) {
		AuthSvc.setAuthHandler();
	}

})(window.angular);
