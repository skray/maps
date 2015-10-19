(function(angular) {

    angular.module('maps')
        .directive('markerControl', markerControl);

    function markerControl(markers) {

        return {
            replace: true,
            scope: {map: '=markerControl'},
            templateUrl:'map/marker/markercontrol.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: function markerControlController() {
                var vm = this;
                vm.markers = markers;
                vm.flags = {
                    showMarkerSelector: false
                };

                vm.toggleMarkerSelector = toggleMarkerSelector;
                vm.setMarker = setMarker;
                vm.uploadIcon = uploadIcon;

                function toggleMarkerSelector($event) {
                    vm.flags.showMarkerSelector = !vm.flags.showMarkerSelector;
                }

                function setMarker(markerInfo) {
                    var marker = vm.map.editTools.startMarker();
                    marker.setIcon(L.icon({iconUrl:markerInfo.img}));
                }

                function uploadIcon(icon, erroredIcons) {
                    console.log(icon);
                    console.log(erroredIcons);

                    if(icon) {
                        var reader = new window.FileReader();
                        reader.readAsDataURL(icon);
                        reader.onloadend = function() {
                            var base64data = reader.result;
                            console.log(base64data);
                            vm.imgSrc = base64data;
                        };    
                    }

                }
            }
        };

    }

})(window.angular);
