(function(angular) {
	
	angular.module('maps')
		.controller('MapCtrl', MapCtrl);

	function MapCtrl($scope) {
		$scope.vm = {
			tiles : {
		    	url:'http://{s}.tiles.mapbox.com/v3/seankennethray.map-zjkq5g6o/{z}/{x}/{y}.png', 
		    	options: {
				    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a><br>'+
				                 '<a href="https://thenounproject.com/search/?q=campfire&i=15120">“Campfire”</a> icon by Pavel N. from <a href="http://thenounproject.com">the Noun Project.</a><br>'+
				                 'Campsite locations provided by <a href="https://www.google.com/maps/d/viewer?mid=zgLi8Vih7akA.kvuzH9irSVwg">Lewis and Clark Westbound Part 1</a>',
				}  
			}
		};
	}

})(window.angular);