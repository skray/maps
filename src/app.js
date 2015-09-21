(function(angular) {
	angular
		.module('maps', ['ngRoute', 'leaflet-directive', 'firebase'])
		.config(configure);

	function configure($routeProvider, $locationProvider) {
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