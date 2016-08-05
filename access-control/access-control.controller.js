app.controller("accessControlCtrl", ['$scope', '$rootScope', 'ErrorMessage', '$timeout', '$http', '$mdToast', '$mdDialog', '$localStorage', '$mdSidenav', '$location', 'AdminService', function($scope, $rootScope, ErrorMessage, $timeout, $http, $mdToast, $mdDialog, $localStorage, $mdSidenav, $location, AdminService){
   $scope.message = "Success!!";
	$scope.isSelected = {};
	$scope.selectedAdmins=[];
	$scope.selectedReaders=[];
	$scope.selectedWriters=[];

	$scope.flag=false;
	$scope.getObjects = function() {
		$rootScope.isLoading = true;
		firebase.database().ref('databaseAccess/').once('value').then(function(snapshot){
			$scope.$apply(function(){
				$scope.objects = snapshot.val();
				$scope.flag=true;
			});
		}).catch(function(error){
			var msg = 'Unhandled Exception';
			if(error.stack.indexOf('permission_denied') != -1) msg = 'PERMISSION_DENIED';
			// $rootScope.isLoading = false;
			ErrorMessage.showMessage('Something Went Wrong', msg);
			console.error(error);
		});
	};

	$scope.selectObject = function(selectedObject){
		if($scope.selectedObject !== undefined){
			return $scope.selectedObject;
		}else{
			return "Please select an object";
		}
	};

	$scope.selectedAdmins = [];
	$scope.flag1 = false;

	$scope.getAdmins = function() {
		try {
			firebase.database().ref('admins/').once('value').then(function(snapshot){
				$scope.$apply(function(){
					$scope.admins = snapshot.val();
					delete $scope.admins[$localStorage.currentUser.uid];
					$scope.flag1 = true;
				});
			}).catch(function(error){
				var msg = 'Unhandled Exception';
				if(error.stack.indexOf('permission_denied') != -1) msg = 'PERMISSION_DENIED';
				$rootScope.isLoading = false;
				ErrorMessage.showMessage('Something Went Wrong', msg);
				console.error(error);
			});	// to get all admins

			firebase.database().ref('databaseAccess/'+$scope.selectedObject+'/read/').once('value').then(function(snapshot) {
				$scope.$apply(function(){
					$scope.objectReaders = snapshot.val();
					for(var key in $scope.objectReaders) {
						if($scope.objectReaders[key] === true){
							$scope.selectedReaders.push(key);
						}
					}
				});
			}).catch(function(error) {
				var msg = 'Unhandled Exception';
				if(error.stack.indexOf('permission_denied') != -1) msg = 'PERMISSION_DENIED';
				$rootScope.isLoading = false;
				ErrorMessage.showMessage('Something Went Wrong', msg);
				console.error(error);
			}); // to get all objectReaders

			firebase.database().ref('databaseAccess/'+$scope.selectedObject+'/write/').once('value').then(function(snapshot) {
				$scope.$apply(function(){
					$scope.objectWriters = snapshot.val();
					for(var key in $scope.objectWriters){
						if($scope.objectWriters[key] === true){
							$scope.selectedWriters.push(key);
						}
					}
				});
			}).catch(function(error) {
				var msg = 'Unhandled Exception';
				if(error.stack.indexOf('permission_denied') != -1) msg = 'PERMISSION_DENIED';
				$rootScope.isLoading = false;
				ErrorMessage.showMessage('Something Went Wrong', msg);
				console.error(error);
			}); // to get all objectWriters
		}
		catch(error) {
			var msg = 'Unhandled Exception';
			$rootScope.isLoading = false;
			ErrorMessage.showMessage('Something Went Wrong', msg);
			console.error(error);
		}
	};	//getAdmins

	$scope.toggle = function (item, list) {
		var f = 0;
		if(list === $scope.selectedWriters)
			f=1;
	    var idx = list.indexOf(item);
	    if (idx > -1) {
	    	list.splice(idx, 1);
	    }
	    else {
	    	list.push(item);
	    	if(f==1)
	    		$scope.selectedReaders.push(item);
	    }
	};

	$scope.exists = function (item, list) {
	    return list.indexOf(item) > -1;
	};

	$scope.saveAccess = function() {
		try {
			console.log($scope.admins);
			for(var key in $scope.admins) {
				console.log(key);
				console.log($scope.admins[key].uid);
				var idx = $scope.selectedWriters.indexOf($scope.admins[key].uid);
				if (idx > -1) {
					firebase.database().ref('databaseAccess/'+$scope.selectedObject+'/write/'+$scope.admins[key].uid).set(true);
					$scope.selectedReaders.push($scope.admins[key].uid);
				}
				else {
					firebase.database().ref('databaseAccess/'+$scope.selectedObject+'/write/'+$scope.admins[key].uid).set(false);
				}
				idx = $scope.selectedReaders.indexOf($scope.admins[key].uid);
				if (idx > -1){
					firebase.database().ref('databaseAccess/'+$scope.selectedObject+'/read/'+$scope.admins[key].uid).set(true);
				}
				else {
					firebase.database().ref('databaseAccess/'+$scope.selectedObject+'/read/'+$scope.admins[key].uid).set(false);
				}
			}
		}
		catch(error) {
			var msg = 'Unhandled Exception';
			if(error.stack.indexOf('permission_denied') != -1) msg = 'PERMISSION_DENIED';
			$rootScope.isLoading = false;
			ErrorMessage.showMessage('Something Went Wrong', msg);
			console.error(error);
		}
	};
}]);
