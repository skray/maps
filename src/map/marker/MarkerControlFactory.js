(function(angular) {

    angular.module('maps')
        .factory('MarkerControlFactory', MarkerControlFactory);

    function MarkerControlFactory($compile, MarkerTypeFactory) {
        var MarkerControl = L.Control.extend({
            options: {
                position: 'topleft'
            },
            onAdd: function(map) {
                var el = angular.element('<div marker-control="markerTypes" map="map"></div>');
                this.options.scope.markerTypes = MarkerTypeFactory(this.options.scope.vm.map.$id);
                this.options.scope.map = map;
                $compile(el)(this.options.scope);

                return el[0];
            },
            type: 'custom'
        });

        return MarkerControl;
    }

})(window.angular);
