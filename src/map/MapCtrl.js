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
		vm.addLayer = addLayer;
		vm.saveLayer = saveLayer;

		vm.flags = { 
			editingMapMeta: true,
			settingCenterAndZoom: false,
			canEdit: false
		};
        vm.layers = {
			baselayers: {},
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
		vm.newLayer = null;
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
				vm.layers.baselayers = map.layers;
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

		function addLayer() {
			vm.newLayer = {};
		}

		function saveLayer(layer) {
			if(!vm.map.layers) {
				vm.map.layers = {};
			}
			vm.map.layers[layer.name] = layer;
			vm.map.$save();
		}

	}

})(window.angular);