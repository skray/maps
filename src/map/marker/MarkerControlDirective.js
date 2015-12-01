(function(angular) {

    angular.module('maps')
        .directive('markerControl', markerControl);

    function markerControl(MarkerTypeFactory) {

        return {
            replace: true,
            scope: { markerTypes: '=markerControl', map:"=" },
            templateUrl:'map/marker/markercontrol.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: markerControlCtrl
        };

    }

    function markerControlCtrl($scope, $window) {
        var vm = this;

        vm.flags = {
            showMarkerSelector: false
        };

        vm.toggleMarkerSelector = toggleMarkerSelector;
        vm.setMarkerType = setMarkerType;
        vm.uploadIcon = uploadIcon;

        function toggleMarkerSelector() {
            vm.flags.showMarkerSelector = !vm.flags.showMarkerSelector;
        }

        function setMarkerType(markerInfo) {
            var marker = vm.map.editTools.startMarker();
            marker.setIcon(L.icon({iconUrl:markerInfo.img}));
        }

        function uploadIcon(icon, erroredIcons) {
            console.log(icon);
            console.log(erroredIcons);

            if(icon) {
                var reader = new $window.FileReader();
                reader.readAsDataURL(icon);
                reader.onloadend = function() {
                    var base64data = reader.result;
                    vm.markerTypes.$add({img:base64data});
                };
            }

        }

    }

})(window.angular);
