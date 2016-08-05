app
.controller('newProjectCtrl', function(
	$scope, 
	$rootScope, 
	LoadingIndicatorService, 
	ErrorMessage, 
	$localStorage, 
	$state, 
	$timeout,
	Location,
	Builder
) {
	$scope.loadZone = function() {
		try {
			return $timeout(function() {
				Location.selectZoneByCity($scope.addProject.city.cityId).then(function(response) {
					$scope.zones = response;
					console.log($scope.zones);
				});
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
	}
	function getBuilders() {
		$scope.builders = [];
		Builder.getBuilder().then(function(response) {
			angular.forEach(response, function(obj) {
				$scope.builders.push(obj);
			});
		});
	};
	function init() {
		try {
			getBuilders();
			Location.selectCity().then(function(response) {
				$scope.cities = response;
				console.log($scope.cities);
			});
			$scope.$watch('commandCompleted', function(newValue, oldValue) {
				console.log(oldValue);
				console.log(newValue);
				if(newValue === true) {
					ErrorMessage.showConfirmMessage('Project Added', 'Do You Want To Proceed To Next Sections', event, function success() {
						$state.go('add-project.basic-details');
					}, function cancel() {
						console.log('cancel');
					});
				}
			});
		}
		catch(error) {
			if(error) {
				LoadingIndicatorService.loadingEnd();
				var msg = 'Unhandled Exception';
				ErrorMessage.showMessage('Something Went Wrong', msg);
				console.error(error);
			}
		}
	}
	init();
	$scope.getMatches = function(searchText) {
		return $scope.builders;	
	}; 
	$scope.uploadProject=function(project, event) {
		$scope.commandCompleted = false;
		try {
			$rootScope.isLoading = true;
			var db = firebase.database();
			var todayDate = new Date().getTime();
			var adminId = 123;
			var vers = '1-1';
			var key = firebase.database().ref('/protectedResidential/').push().key;
			var protectedData = {};
			protectedData[vers] = {
				status : 'editable',
				buy : true,
				versionCreatedTime : todayDate,	
				versionCreatedBy: 12345, //id of the creator
				projectId : key,
				projectStatus : $scope.addProject.projectStatus,
				projectDetails : {
					projectName: $scope.addProject.projectName,
					builderName : $scope.addProject.builder.builderName,
					builderId : $scope.addProject.builder.builderId,
					address : {
						cityName : $scope.addProject.city.cityName,
						cityId : $scope.addProject.city.cityId,
						zoneName : $scope.addProject.zone.zoneName,
						zoneId : $scope.addProject.zone.zoneId,
						landmark : $scope.landmark
					}
				}
			};
			var cityData = {};
			cityData[key] = {
				projectId: key,
				projectName: $scope.addProject.projectName
			};
			var updates = {};
			updates['/protectedResidential/'+$scope.addProject.city.cityId+'/projects/'+key] = protectedData;
			// Protected Residentials
			// db.ref('/protectedResidential/'+$scope.addProject.city.cityId+'/projects/'+key).set(protectedData, function(response) {
			// 	console.log(response);
			// }).then(function(response){
			// 	console.log(response);
			// }, function(error) {
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// }); //protectedResidentials

			updates['/city/'+$scope.addProject.city.cityId+'/projects/'+key] = cityData;
			// db.ref('/city/'+$scope.addProject.city.cityId+'/projects/'+key).set(cityData).then(function(response) {
			// }, function(error) {
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });     //city


			//adding to builders
			updates['/builders/'+$scope.addProject.builder.builderId+'/projectAccess/'+$scope.addProject.city.cityId+'/cityId'] = $scope.addProject.city.cityId
			// db.ref('/builders/'+project.projectDetails.builder.id+'/projectAccess/'+$scope.addProject.city.cityId+'/cityId').set(cityId).then(function(){},function(error){
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });
			
			updates['/builders/'+$scope.addProject.builder.builderId+'/projectAccess/'+$scope.addProject.city.cityId+'/cityName'] = $scope.addProject.city.cityName;
			// db.ref('/builders/'+project.projectDetails.builder.id+'/projectAccess/'+$scope.addProject.city.cityId+'/cityName').set(project.projectDetails.address.city.cityName).then(function(){},function(error){
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });
			updates['/builders/'+$scope.addProject.builder.builderId+'/projectAccess/'+$scope.addProject.city.cityId+'/projects/'+key+'/projectId'] = key;
			updates['/builders/'+$scope.addProject.builder.builderId+'/projectAccess/'+$scope.addProject.city.cityId+'/projects/'+key+'/projectName'] = $scope.addProject.projectName;

			// db.ref('/builders/'+project.projectDetails.builder.id+'/projectAccess/'+$scope.addProject.city.cityId+'/projects/'+key).set({
			// 	projectId : key,
			// 	projectName : project.projectDetails.projectName
			// }).then(function(){}, function(error){
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });

			updates['/admins/'+adminId+'/projectAccess/'+$scope.addProject.city.cityId+'/cityId'] = $scope.addProject.city.cityId;
			//adding to admin method 1	
			// db.ref('/admins/'+adminId+'/projectAccess/'+$scope.addProject.city.cityId+'/cityId').set(cityId).then(function(){}, function(error){
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });
			updates['/admins/'+adminId+'/projectAccess/'+$scope.addProject.city.cityId+'/cityName'] = $scope.addProject.city.cityName;

			// db.ref('/admins/'+adminId+'/projectAccess/'+$scope.addProject.city.cityId+'/cityName').set(project.projectDetails.address.city.cityName).then(function(){}, function(error){
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });

			updates['/admins/'+adminId+'/projectAccess/'+$scope.addProject.city.cityId+'/projects/'+key+'/projectId'] = key; 
			updates['/admins/'+adminId+'/projectAccess/'+$scope.addProject.city.cityId+'/projects/'+key+'/projectName'] = $scope.addProject.projectName; 

			// db.ref('/admins/'+adminId+'/projectAccess/'+$scope.addProject.city.cityId+'/projects/'+key).set({
			// 	projectId : key,
			// 	projectName : project.projectDetails.projectName
			// }).then(function(){}, function(error){
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });

			updates['/zone/'+$scope.addProject.city.cityId+'/'+$scope.addProject.zone.zoneId+'/cityId'] = $scope.addProject.city.cityId;
			// adding zone 2
			// db.ref('/zone/'+$scope.addProject.city.cityId+'/'+project.projectDetails.address.zone.zoneId+'/cityId').set(cityId).then(function(){}, function(error) {
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });

			updates['/zone/'+$scope.addProject.city.cityId+'/'+$scope.addProject.zone.zoneId+'/cityName'] = $scope.addProject.city.cityName;
			// db.ref('/zone/'+$scope.addProject.city.cityId+'/'+project.projectDetails.address.zone.zoneId+'/cityName').set(project.projectDetails.address.city.cityName).then(function(){}, function(error) {
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });

			updates['/zone/'+$scope.addProject.city.cityId+'/'+$scope.addProject.zone.zoneId+'/zoneId'] = $scope.addProject.zone.zoneId;
			// db.ref('/zone/'+$scope.addProject.city.cityId+'/'+project.projectDetails.address.zone.zoneId+'/zoneId').set(project.projectDetails.address.zone.zoneId).then(function(){}, function(error) {
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });

			updates['/zone/'+$scope.addProject.city.cityId+'/'+$scope.addProject.zone.zoneId+'/zoneName'] = $scope.addProject.zone.zoneName;
			// db.ref('/zone/'+$scope.addProject.city.cityId+'/'+project.projectDetails.address.zone.zoneId+'/zoneName').set(project.projectDetails.address.zone.zoneName).then(function(){}, function(error) {
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });

			updates['/zone/'+$scope.addProject.city.cityId+'/'+$scope.addProject.zone.zoneId+'/projects/'+key+'/projectId'] = key;
			updates['/zone/'+$scope.addProject.city.cityId+'/'+$scope.addProject.zone.zoneId+'/projects/'+key+'/projectName'] = $scope.addProject.projectName; 
			// db.ref('/zone/'+$scope.addProject.city.cityId+'/'+project.projectDetails.address.zone.zoneId+'/projects/'+key).set({
			// 	projectId : key,
			// 	projectName : project.projectDetails.projectName
			// }).then(function(){}, function(error) {
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });

			updates['/protectedResidentialVersion/'+$scope.addProject.city.cityId+'/cityId'] = $scope.addProject.city.cityId;
			// adding to protectedResidentialVersion 
			// db.ref('/protectedResidentialVersion/'+$scope.addProject.city.cityId+'/cityId').set(cityId).then(function(){}, function(error) {
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });

			updates['/protectedResidentialVersion/'+$scope.addProject.city.cityId+'/cityName'] = $scope.addProject.city.cityName;
			// db.ref('/protectedResidentialVersion/'+$scope.addProject.city.cityId+'/cityName').set(project.projectDetails.address.city.cityName).then(function(){}, function(error) {
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });

			var editable = {
				projectId : key,
				projectName :  $scope.addProject.projectName,
				version : '1-1'
			};
			updates['/protectedResidentialVersion/'+$scope.addProject.city.cityId+'/projects/'+key] = editable;
			// db.ref('/protectedResidentialVersion/'+$scope.addProject.city.cityId+'/projects/'+key).set({
			// 	editable :  {
			// 		projectId : key,
			// 		projectName :  project.projectDetails.projectName,
			// 		version : '1-1'
			// 	}
			// }).then(function(){}, function(error) {
			// 	if(error) {
			// 		var msg = 'Unhandled Exception';
			// 		$rootScope.isLoading = false;
			// 		ErrorMessage.showMessage('Something Went Wrong', msg);
			// 		console.error(error);
			// 	}
			// });
			db.ref().update(updates, function(error) {
				if(error) {
					var msg = 'Unhandled Exception';
					$rootScope.isLoading = false;
					ErrorMessage.showMessage('Something Went Wrong', msg);
					console.error(error);
				}
			}).then(function() {
				//saving relevant data to localStorage for further use
				$localStorage.cityId = $scope.addProject.city.cityId;
				$localStorage.cityName = $scope.addProject.city.cityName;
				$localStorage.zonId = $scope.addProject.zone.zoneId;
				$localStorage.zoneName = $scope.addProject.zone.zoneName;
				$localStorage.projectName = $scope.addProject.projectName;
				$localStorage.key = key;
				// $location.path('/basicDetails');
			});
			LoadingIndicatorService.loadingEnd().then(function() {
				$scope.commandCompleted = true;
			});
		}
		catch(error) {
			if(error) {
            var msg = 'Unhandled Exception';
				if(error.stack.indexOf('undefined') != -1) msg = 'One Or More Necessary Value Is Empty';
				LoadingIndicatorService.loadingEnd();
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
         }
		}
	};
	$scope.clearForm = function() {
		try {
			$scope.addProject = {};
			$scope.searchText = null;
			$scope.addProjectForm.$setPristine();
			$scope.addProjectForm.$setUntouched();
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
})