(function(angular) {
	
	angular.module('maps')
		.controller('NavCtrl', NavCtrl);

	function NavCtrl($scope, AuthSvc) {

		var vm = this;

		vm.login = AuthSvc.login;
		vm.logout = AuthSvc.logout;
		vm.user = null;
		vm.flags ={
			loggedIn: false
		};

		init();

		function init() {
			$scope.$on('logged-in', onLoggedIn);
			$scope.$on('logged-out', onLoggedOut);
		}

		function onLoggedIn(evt, user) {
			vm.flags.loggedIn = true;
			vm.user = user;
		}

		function onLoggedOut() {
			vm.flags.loggedIn = false;
			vm.user = null;
		}

	}

})(window.angular);