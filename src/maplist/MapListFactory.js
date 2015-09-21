(function(angular) {
	
	angular.module('maps')
		.factory('MapListFactory', MapListFactory);

	function MapListFactory($firebaseArray, $window) {
		var MapList = $firebaseArray.$extend({

		});
	

		function createMapList() {
			var ref = new $window.Firebase("https://amber-inferno-2147.firebaseio.com/maps");
			return new MapList(ref);
		}

		return createMapList; 
	}

})(window.angular);