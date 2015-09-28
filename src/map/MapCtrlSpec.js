describe('MapCtrl', function() {

	var scope,
	    MapFactory;

	beforeEach(module('maps'));

	beforeEach(inject(function($controller, $rootScope, _$routeParams_) {
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
							markers: []
						});
					}
				};
			}
		});

		$controller('MapCtrl as vm', {
			$scope: scope,
			$routeParams: _$routeParams_,
			MapFactory: MapFactory
		});
	}));

	it('should load the map from routeParams', function loadMap() {
		expect(MapFactory).toHaveBeenCalledWith(1);
	});

});