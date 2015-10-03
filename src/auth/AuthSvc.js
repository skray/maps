(function(angular) {
	
	angular.module('maps')
		.service('AuthSvc', AuthSvc);

	function AuthSvc(FIREBASE_REF, $firebaseAuth, $rootScope) {

		var authObj;
		var user;
	    
		function setAuthHandler() {
			authObj = $firebaseAuth(FIREBASE_REF);
			authObj.$onAuth(onAuthChanged);
		}

		function login() {
		    authObj.$authWithOAuthPopup('github');
		}

		function logout() {
			authObj.$unauth();
		}

		function getUser() {
			return user;
		}

		function onAuthChanged(updatedAuthData) {
			if(updatedAuthData) {
				user = updatedAuthData.github.cachedUserProfile;
				user.uid = updatedAuthData.uid;
				$rootScope.$broadcast('logged-in', user);
			}
	    	else {
	    		user = null;
	    		$rootScope.$broadcast('logged-out');
	    	}
	    }

	    this.setAuthHandler = setAuthHandler;
		this.login = login;
		this.logout = logout;
		this.getUser = getUser;
	}

})(window.angular);