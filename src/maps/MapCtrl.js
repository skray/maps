(function(angular) {
	
	angular.module('maps')
		.controller('MapCtrl', MapCtrl);

	function MapCtrl($scope) {
		angular.extend($scope, {
		    defaults: {
		        tileLayer: "http://{s}.tiles.mapbox.com/v3/seankennethray.map-zjkq5g6o/{z}/{x}/{y}.png",
		        maxZoom: 14
		    }
		});
	}

})(window.angular);