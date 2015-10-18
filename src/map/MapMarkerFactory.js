(function(angular) {

	angular.module('maps')
		.factory('MapMarkerFactory', MapMarkerFactory);

	function MapMarkerFactory($firebaseArray, FIREBASE_REF) {

		function loadMapMarkers(id) {
			var ref = FIREBASE_REF.child('maps').child(id).child('markers');
			return new $firebaseArray(ref);
		}

		return loadMapMarkers;
	}

})(window.angular);
