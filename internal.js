(function(angular) {
	angular
		.module('maps', ['ngRoute', 'leaflet-directive', 'firebase'])
		.config(configure)
		.constant('FIREBASE_REF', new Firebase("https://amber-inferno-2147.firebaseio.com"));

	function configure($routeProvider, $locationProvider) {

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

})(window.angular);
(function(angular) {
	
	angular.module('maps')
		.service('AuthSvc', AuthSvc);

	function AuthSvc(FIREBASE_REF, $firebaseAuth, $rootScope) {

		var authObj;
		var user;

		function login() {
		    authObj = $firebaseAuth(FIREBASE_REF);

		    authObj.$onAuth(onAuthChanged);

		    authObj.$authWithOAuthPopup('github')
		    	.then(function authSuccess(authData) {
					user = authData.github.cachedUserProfile;
					user.uid = authData.uid;
					$rootScope.$broadcast('logged-in', user);
			    });
		}

		function logout() {
			authObj.$unauth();
		}

		function getUser() {
			return user;
		}

		function onAuthChanged(updatedAuthData) {
	    	if(!updatedAuthData) {
	    		user = null;
	    		$rootScope.$broadcast('logged-out');
	    	}
	    }

		this.login = login;
		this.logout = logout;
		this.getUser = getUser;
	}

})(window.angular);
(function(angular) {
	
	angular.module('maps')
		.controller('MapCtrl', MapCtrl);

	function MapCtrl($scope, $routeParams, MapFactory, AuthSvc) {
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
			}
		}

		function onLoggedOut() {
			vm.controls = {};
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