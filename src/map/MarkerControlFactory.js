(function(angular) {
    
    angular.module('maps')
        .factory('MarkerControlFactory', MarkerControlFactory);

    function MarkerControlFactory($compile) {
        var MarkerControl = L.Control.extend({
            options: {
                position: 'topleft'
            },
            onAdd: function(map) {
                var el = angular.element('<div marker-control=""></div>');

                this.options.scope.map = map;
                $compile(el)(this.options.scope);
                
                return el[0];
            },
            type: 'custom'
        });

        return MarkerControl;
    }

})(window.angular);