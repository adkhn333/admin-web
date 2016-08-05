app.controller('connectivityDetailsCtrl', function(
	$scope, $rootScope, ErrorMessage, LoadingIndicatorService, $localStorage, $location, $mdpTimePicker, $filter) {
	$scope.addConnectivityToProject=function(connectivity) {
		try {
			var key=$localStorage.key;
			var city=$localStorage.city;
			var zone=$localStorage.zone;
			firebase.database().ref('/protectedResidential/'+city+'/projects/'+key+'/1-1').update({
				connectivity
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
	$scope.showTimePicker = function(event, obj, obj2) {
      $mdpTimePicker($scope.connectivity[obj][obj2], {
        targetEvent: event
      }).then(function(selectedTime) {
        $scope.connectivity[obj][obj2] = $filter('date')(selectedTime, 'hh:mm a');
      })
    }
});