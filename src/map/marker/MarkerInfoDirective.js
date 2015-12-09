(function(angular) {

    angular.module('maps')
        .directive('markerInfo', markerInfo);

    function markerInfo() {

        return {
            replace: true,
            scope: { marker: '=' },
            templateUrl:'map/marker/markerinfo.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: markerInfoCtrl
        };

    }

    function markerInfoCtrl($scope, MarkerFactory) {
        var vm = this;
        var markerFactory;

        vm.removeMarker = removeMarker;

        function removeMarker() {
            console.log('going away');
            //TODO not working
            markerFactory.$remove(vm.marker).then(function(ref) {
                console.log('removed');
                console.log(ref);
            });
        }

        $scope.$watch('vm.marker', function(newMarker) {
            console.log('changed1');
            markerFactory = MarkerFactory(newMarker.$id);
        });
    }

})(window.angular);