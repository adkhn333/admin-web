app.controller("societyShopDetailsCtrl",function($scope, $rootScope, ErrorMessage, LoadingIndicatorService, $timeout, $localStorage) {
	try {
		var key = $localStorage.key;
		var city = $localStorage.city;
		var zone = $localStorage.zone;
		var link = '/protectedResidential/'+city+'/projects/'+key+'/1-1/societyShops';
		$scope.items = [];
		firebase.database().ref(link).on('value', function(snapshot) {
			$timeout(function(){
				$scope.items = snapshot.val();
			},500);
		}, function(error) {
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
	$scope.addSocietyShopToProject = function(obj) {
		try {
			var key=$localStorage.key;
			var city=$localStorage.city;
			var zone=$localStorage.zone;
			var link='/protectedResidential/'+city+'/projects/'+key+'/1-1/societyShops/';
			var objKey=firebase.database().ref(link+obj.type+'/').push().key;
			firebase.database().ref(link+obj.type+'/'+objKey).set({
				name:obj.name,
				contact : obj.contact
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