(function(angular) {
	angular
		.module('maps', ['ngRoute', 'leaflet-directive', 'firebase'])
		.config(configure);

	function configure($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'list/list.html',
				controller: 'ListCtrl',
				controllerAs: 'vm'
			})
			.when('/maps/:id', {
				templateUrl: 'map/map.html',
				controller: 'MapCtrl',
				controllerAs: 'vm'
			});
	}

})(window.angular);
(function(angular) {

	angular.module('maps')
		.controller('ListCtrl', ListCtrl);

	function ListCtrl($scope) {

	}


}(window.angular));
(function(angular) {
	
	angular.module('maps')
		.controller('MapCtrl', MapCtrl);

	function MapCtrl($scope, $firebaseObject, leafletEvents) {
		var vm = this;
		angular.extend(vm, {
			tiles : {
	    		url:'http://{s}.tiles.mapbox.com/v3/seankennethray.map-zjkq5g6o/{z}/{x}/{y}.png'
	    	},
		    center : {},
		    lines :{},
		    markers : {},
		    events: {
                markers: {
                    enable: leafletEvents.getAvailableMarkerEvents(),
                }
            }
		});

		var mapsRef = new Firebase("https://amber-inferno-2147.firebaseio.com/maps/-Jyp82TViVkgaFmeS9NI");
		vm.map = $firebaseObject(mapsRef).$loaded().then(function mapLoaded(map) {
			vm.center = {lat: map.center[0], lng:map.center[1], zoom:map.zoom};
			vm.lines['line'] = {type: 'polyline', latlngs: map.line, weight: 3, opacity: 0.5};
			map.markers.forEach(function eachMarker(marker, idx) {
				vm.markers[idx] = {
					lat: marker.latLng.lat, 
					lng: marker.latLng.lng,
					message: marker.title,
					icon: {
						iconUrl: 'maps/images/campfire.svg',
						iconSize: [30,30],
						iconAnchor: [15,20]
					}
				};
			});
		});

	}

})(window.angular);