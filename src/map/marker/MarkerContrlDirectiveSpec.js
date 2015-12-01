describe('MarkerControlDirective', function() {

    var el, scope;

    beforeEach(module('maps', function($provide) {
        var mockWindow = jasmine.createSpyObj('window', ['FileReader']);
        $provide.value('$window', mockWindow);
    }));

    beforeEach(inject(function($rootScope, $compile) {
        var parentScope = $rootScope.$new();
        var parentEl = angular.element('<div marker-control="markerTypes" map="map"></div>');

        parentScope.map = {
            editTools: {
                startMarker: jasmine.createSpy('startMarker').and.returnValue({
                    setIcon: jasmine.createSpy('setIcon')
                })
            }
        };

        el = $compile(parentEl)(parentScope);
        parentScope.$apply();
        scope = el.isolateScope();
    }));

    describe('toggleMarkerSelector', function() {

        it('should toggle the flag that makes the marker selector visible', function togglePanes() {
            scope.vm.flags.showMarkerSelector = true;
            scope.vm.toggleMarkerSelector();
            expect(scope.vm.flags.showMarkerSelector).toBe(false);
        });

    });

    describe('setMarkerType', function() {

        it('should call startMarker', function callStartMarker() {
            scope.vm.setMarkerType({});
            expect(scope.vm.map.editTools.startMarker).toHaveBeenCalled();
        });

    });

});
