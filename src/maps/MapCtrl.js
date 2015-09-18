(function(angular) {
	
	angular.module('maps')
		.controller('MapCtrl', MapCtrl);

	function MapCtrl($scope, $firebaseObject) {
		var vm = this;
		vm.tiles = {
	    	url:'http://{s}.tiles.mapbox.com/v3/seankennethray.map-zjkq5g6o/{z}/{x}/{y}.png'
	    };
	    vm.center = {lat:0, lng:0, zoom:1};

		var mapsRef = new Firebase("https://amber-inferno-2147.firebaseio.com/maps/-Jyp82TViVkgaFmeS9NI");
		vm.map = $firebaseObject(mapsRef).$loaded().then(function mapLoaded(map) {
			vm.center = {lat: map.center[0], lng:map.center[1], zoom:map.zoom};
		});

	}

})(window.angular);