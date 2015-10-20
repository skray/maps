(function(angular) {

    angular.module('maps')
        .directive('dragOver', dragOver);

    function dragOver($rootScope) {
        return {
            link: function postLink(scope, elm) {
                elm.on('dragover', function onDragOver(e) {
                    scope.$apply(function() {
                        var dt = e.dataTransfer;
                        if(dt.types != null && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('application/x-moz-file'))) {
                            $rootScope.$broadcast('drag-over-file-start');
                        }
                    });

                });

                elm.on('dragleave', function onDragOver(e) {
                    scope.$apply(function() {
                        var dt = e.dataTransfer;
                        if(dt.types != null && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('application/x-moz-file'))) {
                            $rootScope.$broadcast('drag-over-file-end');
                        }
                    });

                });
            }
        };
    }

})(window.angular);
