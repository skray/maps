describe('MarkerControlDirective', function() {

    var el, scope;

    beforeEach(module('maps'));

    beforeEach(inject(function($rootScope, $compile) {
        var parentScope = $rootScope.$new();
        var parentEl = angular.element('<div marker-control="markerTypes" map="map"></div>');

        el = $compile(parentEl)(parentScope);
        parentScope.$apply();
        scope = el.isolateScope();
    }));

    it('should toggle the flag that makes the marker selector visible', function togglePanes() {
        scope.vm.flags.showMarkerSelector = true;
        scope.vm.toggleMarkerSelector();
        expect(scope.vm.flags.showMarkerSelector).toBe(false);
    });

});
