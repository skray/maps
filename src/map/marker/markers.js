(function(angular) {

    angular.module('maps')
        .factory('markers', markers);

    function markers() {
        return [
            {name: 'standard', img: 'images/marker-icon.png'},
            {name: 'campfire', img: 'images/campfire.png'}
        ]
    }

})(window.angular);
