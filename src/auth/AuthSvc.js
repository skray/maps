(function(angular) {
	
	angular.module('maps')
		.service('AuthSvc', AuthSvc);

	function AuthSvc(FIREBASE_REF, $firebaseAuth, $rootScope) {

		var authObj;
		var user;

		function login() {
		    authObj = $firebaseAuth(FIREBASE_REF);

		    authObj.$onAuth(onAuthChanged);

		    authObj.$authWithOAuthPopup('github')
		    	.then(function authSuccess(authData) {
					user = authData.github.cachedUserProfile;
					user.uid = authData.uid;
					$rootScope.$broadcast('logged-in', user);
			    });
		}

		function logout() {
			authObj.$unauth();
		}

		function getUser() {
			return user;
		}

		function onAuthChanged(updatedAuthData) {
	    	if(!updatedAuthData) {
	    		user = null;
	    		$rootScope.$broadcast('logged-out');
	    	}
	    }

		this.login = login;
		this.logout = logout;
		this.getUser = getUser;
	}

})(window.angular);