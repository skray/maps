(function(angular) {
	
	angular.module('maps')
		.factory('MapListFactory', MapListFactory);

	function MapListFactory($firebaseArray, $window) {

		function createMapList() {
			var ref = new $window.Firebase("https://amber-inferno-2147.firebaseio.com/maps");
			return new $firebaseArray(ref);
		}

		return createMapList; 
	}

})(window.angular);