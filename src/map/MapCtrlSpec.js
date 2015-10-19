describe('MapCtrl', function() {

	var scope,
	    MapFactory,
	    AuthSvc,
	    mockMapResponse = {
			center: ['one','two'],
			zoom: 1,
			line: {},
			markers: [],
			uid: '1234'
		},
        mockMarkerControl = {},
        MarkerControlFactory;

	beforeEach(module('maps'));

	beforeEach(inject(function($controller, $rootScope, _$routeParams_, _AuthSvc_, $q) {
		scope = $rootScope.$new();
		_$routeParams_.id = 1;

		MapFactory = jasmine.createSpy('MapFactory');
		MapFactory.and.returnValue({
			$loaded: function() {
				return $q.when(mockMapResponse);
			}
		});

        MarkerControlFactory = jasmine.createSpy('MarkerControlFactory')
        MarkerControlFactory.and.returnValue(mockMarkerControl);

		AuthSvc = _AuthSvc_;
		spyOn(AuthSvc, 'getUser').and.returnValue({uid: '1234'});

		$controller('MapCtrl as vm', {
			$scope: scope,
			$routeParams: _$routeParams_,
			MapFactory: MapFactory,
			AuthSvc: AuthSvc,
            MarkerControlFactory: MarkerControlFactory
		});
	}));

	describe('on load', function onLoad() {

		it('should load the map from routeParams', function loadMap() {
			expect(MapFactory).toHaveBeenCalledWith(1);
		});

		it('allows an already logged in owner to edit the map', function checkAuth() {
			scope.$apply();
			expect(scope.vm.controls).toEqual({editable: mockMarkerControl});
		});

		it('should not set the mapLoaded flag until the map loads', function waitForMapLoad() {
			expect(scope.vm.flags.mapLoaded).toBe(false);
			scope.$apply();
			expect(scope.vm.flags.mapLoaded).toBe(true);
		});

	});

	describe('on logged in', function onLoggedIn() {

        var user;

        beforeEach(function() {
            user = { uid: 1 };
	        scope.vm.map = { uid: 1 };
            scope.vm.controls = {};
        });

	    it('set the controls and show edit if user is valid', function showIfValid() {
            scope.$emit('logged-in', user);

	        expect(scope.vm.controls).toEqual({editable: mockMarkerControl});
	        expect(scope.vm.flags.canEdit).toBe(true);
	    });

	    it('should not show editing stuff if user is not valid', function notValid() {
	        scope.$emit('logged-in', null);

	        expect(scope.vm.controls.editable).not.toBeDefined();
	        expect(scope.vm.flags.canEdit).toBe(false);
	    });

	});

});
