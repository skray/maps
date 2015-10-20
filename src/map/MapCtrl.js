(function(angular) {

	angular.module('maps')
		.controller('MapCtrl', MapCtrl);

	function MapCtrl($scope, $routeParams, MapFactory, MarkerFactory, AuthSvc, leafletData, MarkerControlFactory, $q) {
		var leafletMap;
		var vm = this;

		vm.toggleMetaEditor = toggleMetaEditor;
		vm.setCenterAndZoom = setCenterAndZoom;
		vm.showSetCenterAndZoom = showSetCenterAndZoom;
		vm.hideSetCenterAndZoom = hideSetCenterAndZoom;
		vm.addLayer = addLayer;
		vm.saveLayer = saveLayer;

		vm.defaults = { map: { editable: true } };
		vm.flags = {
			editingMapMeta: false,
			settingCenterAndZoom: false,
			canEdit: false,
			mapLoaded: false
		};
        vm.layers = {
			baselayers: {}
		};
		vm.newLayer = null;
		vm.center = {};
		vm.lines = {};
		vm.markers = {};
		vm.controls = {};

		init();

		function init() {
			$scope.$on('logged-in', onLoggedIn);
			$scope.$on('logged-out', onLoggedOut);

			leafletData.getMap().then(function(map) {
				leafletMap = map;
                leafletMap.on('editable:drawing:commit', function(e){
                    vm.mapMarkers.$add({
                        latLng: e.layer.getLatLng(),
                        title: 'woo'
                    });
                });

			});

            $q.all([MapFactory($routeParams.id).$loaded(), MarkerFactory($routeParams.id).$loaded()])
                .then(function allLoaded(results) {
                    var map = results[0];
                    var markers = results[1];

                    vm.map = map;
    				vm.layers.baselayers = map.layers;
    				vm.center = {lat: map.center[0], lng:map.center[1], zoom:map.zoom};
    				vm.lines.line = {type: 'polyline', latlngs: map.line, weight: 3, opacity: 0.5};

                    vm.mapMarkers = markers;
                    markers.forEach(function eachMarker(marker, idx) {
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
                    vm.flags.mapLoaded = true;
                });
		}

		function onLoggedIn(evt, user) {
			if(user && user.uid === vm.map.uid) {
				vm.flags.canEdit = true;
                vm.controls.editable = new MarkerControlFactory({scope: $scope});
			}
		}

		function onLoggedOut() {
			// vm.controls = {};
			vm.flags.canEdit = false;
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
