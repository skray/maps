(function(angular) {
	
	angular.module('maps')
		.factory('MapListFactory', MapListFactory);

	function MapListFactory($firebaseArray, FIREBASE_REF) {

		function createMapList() {
			var ref = FIREBASE_REF.child('maps');
			return new $firebaseArray(ref);
		}

		return createMapList; 
	}

})(window.angular);