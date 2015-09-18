(function(angular) {
	angular
		.module('maps', ['ngRoute', 'leaflet-directive', 'firebase'])
		.config(configure);

	function configure($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'list.html',
				controller: 'ListCtrl',
				controllerAs: 'vm'
			})
			.when('/maps/:id', {
				templateUrl: 'maps/viewer.html',
				controller: 'MapCtrl',
				controllerAs: 'vm'
			});
	}

})(window.angular);