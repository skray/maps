(function(angular) {

    angular.module('maps')
        .directive('markerControl', markerControl);

    function markerControl(markers) {

        return {
            replace: true,
            scope: {map: '=markerControl'},
            templateUrl:'map/markercontrol.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: function markerControlController() {
                var vm = this;
                vm.markers = markers;
                console.log(markers);
                vm.flags = {
                    showMarkerSelector: false
                };

                vm.toggleMarkerSelector = toggleMarkerSelector;
                vm.setMarker = setMarker;

                function toggleMarkerSelector($event) {
                    vm.flags.showMarkerSelector = !vm.flags.showMarkerSelector;
                }

                function setMarker(markerInfo) {
                    var marker = vm.map.editTools.startMarker();
                    marker.setIcon(L.icon({iconUrl:markerInfo.img}));
                }
            }
        };

    }

})(window.angular);
