app.controller("securityDetailsCtrl",function($scope, $rootScope, ErrorMessage, LoadingIndicatorService, $localStorage){
    $scope.addSecurityToProject = function(security) {
		try {
			var key=$localStorage.key;
			var city=$localStorage.city;
			var zone=$localStorage.zone;
			firebase.database().ref('/protectedResidential/'+city+'/projects/'+key+'/1-1').update({
				security
			},function(error){
				if(error) {
					var msg = 'Unhandled Exception';
					if(error.stack.indexOf('undefined') != -1) msg = 'One Or More Necessary Value Is Empty';
					// $rootScope.isLoading = false;
					LoadingIndicatorService.loadingEnd();
					ErrorMessage.showMessage('Something Went Wrong', msg);
					console.error(error);
				}
			});
		}
		catch(error) {
			if(error) {
				var msg = 'Unhandled Exception';
				if(error.stack.indexOf('undefined') != -1) msg = 'One Or More Necessary Value Is Empty';
				// $rootScope.isLoading = false;
				LoadingIndicatorService.loadingEnd();
				ErrorMessage.showMessage('Something Went Wrong', msg);
				console.error(error);
			}
		}
	};
})
;