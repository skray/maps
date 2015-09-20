(function(angular) {
	angular
		.module('maps', ['ngRoute', 'leaflet-directive', 'firebase'])
		.config(configure);

	function configure($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'list/list.html',
				controller: 'ListCtrl',
				controllerAs: 'vm'
			})
			.when('/maps/:id', {
				templateUrl: 'map/map.html',
				controller: 'MapCtrl',
				controllerAs: 'vm'
			});
	}

})(window.angular);