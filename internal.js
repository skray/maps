(function(angular) {
	angular
		.module('maps', ['ngRoute', 'leaflet-directive', 'firebase', 'ngAnimate'])
		.config(configure)
		.constant('FIREBASE_REF', new Firebase('https://amber-inferno-2147.firebaseio.com'))
		.run(run);

	function configure($routeProvider) {

		/*
		 * Routes
		 */
		$routeProvider
			.when('/', {
				templateUrl: 'maplist/maplist.html',
				controller: 'MapListCtrl',
				controllerAs: 'vm'
			})
			.when('/maps/:id', {
				templateUrl: 'map/map.html',
				controller: 'MapCtrl',
				controllerAs: 'vm'
			});

	}

	function run(AuthSvc) {
		AuthSvc.setAuthHandler();
	}

})(window.angular);
(function(angular) {
	
	angular.module('maps')
		.service('AuthSvc', AuthSvc);

	function AuthSvc(FIREBASE_REF, $firebaseAuth, $rootScope) {

		var authObj;
		var user;
	    
		function setAuthHandler() {
			authObj = $firebaseAuth(FIREBASE_REF);
			authObj.$onAuth(onAuthChanged);
		}

		function login() {
		    authObj.$authWithOAuthPopup('github');
		}

		function logout() {
			authObj.$unauth();
		}

		function getUser() {
			return user;
		}

		function onAuthChanged(updatedAuthData) {
			if(updatedAuthData) {
				user = updatedAuthData.github.cachedUserProfile;
				user.uid = updatedAuthData.uid;
				$rootScope.$broadcast('logged-in', user);
			}
	    	else {
	    		user = null;
	    		$rootScope.$broadcast('logged-out');
	    	}
	    }

	    this.setAuthHandler = setAuthHandler;
		this.login = login;
		this.logout = logout;
		this.getUser = getUser;
	}

})(window.angular);
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
			editingMapMeta: false,
			settingCenterAndZoom: false,
			canEdit: false,
			mapLoaded: false
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
				vm.flags.mapLoaded = true;
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
(function(angular) {
	
	angular.module('maps')
		.factory('MapFactory', MapFactory);

	function MapFactory($firebaseObject, FIREBASE_REF) {

		function createMap(id) {
			var ref = FIREBASE_REF.child('maps').child(id);
			return new $firebaseObject(ref);
		}

		return createMap; 
	}

})(window.angular);
(function(angular) {

	angular.module('maps')
		.controller('MapListCtrl', MapListCtrl);

	function MapListCtrl($scope, MapListFactory) {
		var vm = this;

		vm.maps = MapListFactory();
	}

}(window.angular));
(function(angular) {
	
	angular.module('maps')
		.factory('MapListFactory', MapListFactory);

	function MapListFactory($firebaseArray, FIREBASE_REF) {

		function createMapList() {
			var ref = FIREBASE_REF.child('maps');
			return new $firebaseArray(ref);
		}

		return createMapList; 
	}

})(window.angular);
(function(angular) {
	
	angular.module('maps')
		.controller('NavCtrl', NavCtrl);

	function NavCtrl($scope, AuthSvc) {

		var vm = this;

		vm.login = AuthSvc.login;
		vm.logout = AuthSvc.logout;
		vm.user = null;
		vm.flags ={
			loggedIn: false
		};

		init();

		function init() {
			$scope.$on('logged-in', onLoggedIn);
			$scope.$on('logged-out', onLoggedOut);
		}

		function onLoggedIn(evt, user) {
			vm.flags.loggedIn = true;
			vm.user = user;
		}

		function onLoggedOut() {
			vm.flags.loggedIn = false;
			vm.user = null;
		}

	}

})(window.angular);