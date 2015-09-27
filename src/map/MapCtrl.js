(function(angular) {
	
	angular.module('maps')
		.controller('MapCtrl', MapCtrl);

	function MapCtrl($scope, $routeParams, MapFactory) {
		var vm = this;

		angular.extend(vm, {
			layers: {
				baselayers: {
					mapbox: {
						name: 'base',
						url: 'http://{s}.tiles.mapbox.com/v3/seankennethray.map-zjkq5g6o/{z}/{x}/{y}.png',
						type: 'xyz',
						layerOptions: {
							attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a><br>'+
						                 '<a href="https://thenounproject.com/search/?q=campfire&i=15120">“Campfire”</a> icon by Pavel N. from <a href="http://thenounproject.com">the Noun Project.</a><br>'+
						                 'Campsite locations provided by <a href="https://www.google.com/maps/d/viewer?mid=zgLi8Vih7akA.kvuzH9irSVwg">Lewis and Clark Westbound Part 1</a>'
		                }
					}
				},
				overlays: {
                    draw: {
                        name: 'draw',
                        type: 'group',
                        visible: true,
                        layerParams: {
                            showOnSelector: false
                        }
                    }
                }
			},
		    center : {},
		    lines :{},
		    markers : {},
		    controls: {}
		});

		init();

		function init() {
			$scope.$on('leafletDirectiveMap.draw:created', onDrawCreated);
			$scope.$on('logged-in', onLoggedIn);
			$scope.$on('logged-out', onLoggedOut);

			vm.map = MapFactory($routeParams.id).$loaded().then(function mapLoaded(map) {
				vm.center = {lat: map.center[0], lng:map.center[1], zoom:map.zoom};
				vm.lines.line = {type: 'polyline', latlngs: map.line, weight: 3, opacity: 0.5};
				map.markers.forEach(function eachMarker(marker, idx) {
					vm.markers[idx] = {
						lat: marker.latLng.lat, 
						lng: marker.latLng.lng,
						message: marker.title,
						icon: {
							iconUrl: 'images/campfire.svg',
							iconSize: [30,30],
							iconAnchor: [15,20]
						}
					};
				});
			});
		}

		function onDrawCreated(ngEvent, leafletEvent) {
			leafletEvent.leafletObject.addLayer(leafletEvent.leafletEvent.layer);
		}

		function onLoggedIn() {
			vm.controls = {draw:{}};
		}

		function onLoggedOut() {
			vm.controls = {};
		}

	}

})(window.angular);