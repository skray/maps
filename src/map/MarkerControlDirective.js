(function(angular) {
    
    angular.module('maps')
        .directive('markerControl', markerControl);

    function markerControl() {

        return {
            replace: true,
            scope: true,
            templateUrl:'map/markercontrol.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: function markerControlController() {
                var vm = this;

                vm.flags = {
                    showMarkerSelector: false
                };

                vm.toggleMarkerSelector = toggleMarkerSelector;

                function toggleMarkerSelector($event) {
                    $event.stopPropagation();
                    $event.preventDefault();
                    vm.flags.showMarkerSelector = !vm.flags.showMarkerSelector;
                }
            }
        };
        
    }

})(window.angular);