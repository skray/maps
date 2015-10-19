(function(angular) {

	angular.module('maps')
		.factory('MarkerFactory', MarkerFactory);

	function MarkerFactory($firebaseArray, FIREBASE_REF) {

		function loadMarkers(id) {
			var ref = FIREBASE_REF.child('maps').child(id).child('markers');
			return new $firebaseArray(ref);
		}

		return loadMarkers;
	}

})(window.angular);
