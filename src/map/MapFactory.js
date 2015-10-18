(function(angular) {

	angular.module('maps')
		.factory('MapFactory', MapFactory);

	function MapFactory($firebaseObject, FIREBASE_REF) {

		function loadMap(id) {
			var ref = FIREBASE_REF.child('maps').child(id);
			return new $firebaseObject(ref);
		}

		return loadMap; 
	}

})(window.angular);
