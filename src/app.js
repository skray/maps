(function(angular) {
	angular
		.module('maps', ['ngRoute'])
		.config(configure);

	function configure($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'list.html',
				controller: 'ListCtrl'
			})
			.when('/maps/:id', {
				templateUrl: 'viewer.html'
			});

		$locationProvider.html5Mode(true);
	}

})(window.angular);