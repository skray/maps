(function(angular) {

	angular.module('maps')
		.controller('MapListCtrl', MapListCtrl);

	function MapListCtrl($scope, MapListFactory) {
		var vm = this;

		vm.maps = MapListFactory();
	}

}(window.angular));