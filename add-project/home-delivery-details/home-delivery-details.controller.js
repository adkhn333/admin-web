app.controller('homeDeliveryDetailsCtrl', function($scope, $rootScope, ErrorMessage, LoadingIndicatorService, $localStorage, $location) {
    try {
        var key=$localStorage.key;
        var city=$localStorage.city;
        var zone=$localStorage.zone;
        var path = '/protectedResidential/'+city+'/projects/'+key+'/1-1/homeDelivery/';
        $scope.items = [];
        firebase.database().ref(path).on('value', function(snapshot) {
            $scope.items = snapshot.val();
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
    $scope.pushService = function(info) {
        try {
            var obj = {
                name: info.name,
                contact: info.contact
            };
            var key1 = firebase.database().ref(path).push().key;
            var updates = {};
            updates[path+$scope.category+'/'+key1] = obj;
            firebase.database().ref().update(updates, function(error) {
                if(error) {
                    var msg = 'Unhandled Exception';
                    if(error.stack.indexOf('undefined') != -1) msg = 'One Or More Necessary Value Is Empty';
                    // $rootScope.isLoading = false;
                    LoadingIndicatorService.loadingEnd();
                    ErrorMessage.showMessage('Something Went Wrong', msg);
                    console.error(error);
                }
            });
            $scope.homeDeliveryForm.$setPristine();
            $scope.homeDeliveryForm.$setUntouched();
            $scope.info = {};
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
    }
});