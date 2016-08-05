app.controller("unitDetailsCtrl",function($scope, $rootScope, ErrorMessage, LoadingIndicatorService, $localStorage) {
    $scope.addUnitsToProject=function(units) {
		 try {
			var key=$localStorage.key;
			var city=$localStorage.city;
			var zone=$localStorage.zone;
			var unitKey=firebase.database().ref('/protectedResidential/'+city+'/projects/'+key+'/1-1/units').push().key;
			configuration=units.configuration;
			specification=units.specification;
			firebase.database().ref('/protectedResidential/'+city+'/projects/'+key+'/1-1/units/'+unitKey).set({
				configuration,
				specification
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
});