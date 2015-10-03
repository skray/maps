(function(angular) {
	
	angular.module('maps')
		.controller('MapCtrl', MapCtrl);

	function MapCtrl($scope, $routeParams, MapFactory, AuthSvc, leafletData) {
		var leafletMap;
		var vm = this;

		vm.toggleMetaEditor = toggleMetaEditor;
		vm.setCenterAndZoom = setCenterAndZoom;
		vm.showSetCenterAndZoom = showSetCenterAndZoom;
		vm.hideSetCenterAndZoom = hideSetCenterAndZoom;

		vm.flags = { 
			editingMapMeta: false,
			settingCenterAndZoom: false,
			canEdit: false
		};
        vm.layers = {
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
		};
		vm.center = {};
		vm.lines = {};
		vm.markers = {};
		vm.controls = {};

		init();

		function init() {
			$scope.$on('leafletDirectiveMap.draw:created', onDrawCreated);
			$scope.$on('logged-in', onLoggedIn);
			$scope.$on('logged-out', onLoggedOut);

			leafletData.getMap().then(function(map) {
				leafletMap = map;
			});

			MapFactory($routeParams.id).$loaded().then(function mapLoaded(map) {
				vm.map = map;
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

				onLoggedIn(null, AuthSvc.getUser());
			});
		}

		function onDrawCreated(ngEvent, leafletEvent) {
			leafletEvent.leafletObject.addLayer(leafletEvent.leafletEvent.layer);
		}

		function onLoggedIn(evt, user) {
			if(user && user.uid === vm.map.uid) {
				vm.controls = {draw:{}};
				vm.flags.canEdit = true;
			}
		}

		function onLoggedOut() {
			// vm.controls = {};
			console.log('Waiting for fix on control removal');
		}

		function toggleMetaEditor() {
			vm.flags.editingMapMeta = !vm.flags.editingMapMeta;
		}

		function setCenterAndZoom() {
			var mapCenter = leafletMap.getCenter();
			var zoom = leafletMap.getZoom();
			vm.map.center = [mapCenter.lat, mapCenter.lng];
			vm.map.zoom = zoom;
			vm.map.$save();
			hideSetCenterAndZoom();
		}

		function showSetCenterAndZoom() {
			vm.flags.settingCenterAndZoom = true;
			toggleMetaEditor();
		}

		function hideSetCenterAndZoom() {
			vm.flags.settingCenterAndZoom = false;
			toggleMetaEditor();
		}

	}

})(window.angular);