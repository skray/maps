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

    function markerInfoCtrl() {
        var vm = this;


    }
    
})(window.angular);