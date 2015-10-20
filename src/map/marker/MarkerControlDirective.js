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
            controller: function markerControlController($scope) {
                var vm = this;

                vm.flags = {
                    showMarkerSelector: false,
                    fileDragging: false
                };

                vm.toggleMarkerSelector = toggleMarkerSelector;
                vm.setMarkerType = setMarkerType;
                vm.uploadIcon = uploadIcon;

                init();

                function init() {
                    $scope.$on('drag-over-file-start', function fileDragStart() {
                        vm.flags.fileDragging = true;
                    });
                    $scope.$on('drag-over-file-end', function fileDragEnd() {
                        vm.flags.fileDragging = false;
                    });
                }

                function toggleMarkerSelector($event) {
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
                        var reader = new window.FileReader();
                        reader.readAsDataURL(icon);
                        reader.onloadend = function() {
                            var base64data = reader.result;
                            console.log(base64data);
                            vm.imgSrc = base64data;
                            vm.markerTypes.$add({img:base64data});
                        };
                    }

                }

            }
        };

    }

})(window.angular);
