(function(angular) {
	
	angular.module('maps')
		.factory('MapFactory', MapFactory);

	function MapFactory($firebaseObject, $window) {

		function createMap(id) {
			var ref = new $window.Firebase("https://amber-inferno-2147.firebaseio.com/maps/").child(id);
			return new $firebaseObject(ref);
		}

		return createMap; 
	}

})(window.angular);