describe('MapCtrl', function() {

	var scope,
	    MapFactory,
	    AuthSvc;

	beforeEach(module('maps'));

	beforeEach(inject(function($controller, $rootScope, _$routeParams_, _AuthSvc_) {
		scope = $rootScope.$new();
		_$routeParams_.id = 1;

		MapFactory = jasmine.createSpy('MapFactory');
		MapFactory.and.returnValue({
			$loaded: function() {
				return {
					then: function(callback) {
						callback({
							center: ['one','two'],
							zoom: 1,
							line: {},
							markers: [],
							uid: '1234'
						});
					}
				};
			}
		});

		AuthSvc = _AuthSvc_;
		spyOn(AuthSvc, 'getUser').and.returnValue({uid: '1234'});

		$controller('MapCtrl as vm', {
			$scope: scope,
			$routeParams: _$routeParams_,
			MapFactory: MapFactory,
			AuthSvc: AuthSvc
		});
	}));

	it('should load the map from routeParams', function loadMap() {
		expect(MapFactory).toHaveBeenCalledWith(1);
	});

	it('checks allows an already logged in owner to edit the map', function checkAuth() {
		expect(scope.vm.controls).toEqual({draw:{}});
	});

});