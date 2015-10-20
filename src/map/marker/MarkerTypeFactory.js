(function(angular) {

	angular.module('maps')
		.factory('MarkerTypeFactory', MarkerTypeFactory);

	function MarkerTypeFactory($firebaseArray, FIREBASE_REF) {

		function loadMarkerTypes(id) {
			var ref = FIREBASE_REF.child('maps').child(id).child('markerTypes');
			return new $firebaseArray(ref);
		}

		return loadMarkerTypes;
	}

})(window.angular);
