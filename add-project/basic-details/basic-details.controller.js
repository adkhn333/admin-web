app
.controller('basicDetailsCtrl', function(
	$scope, 
	$rootScope, 
	LoadingIndicatorService, 
	$localStorage, 
	$location,
	Location
) {
   // $scope.locations=[
	// 	{
	// 		name:'Sector 48',
	// 		id : 1234
	// 	},
	// 	{
	// 		name:'Sohna Road',
	// 		id : 4576
	// 	}
	// ];

	if($localStorage.zoneId != null 
		|| $localStorage.zoneId != undefined) {
			if($localStorage.cityId != null 
				|| $localStorage.cityId != undefined)
		Location.selectLocationByZone($localStorage.cityId, $localStorage.zoneId).then(function(response) {
			$scope.locations = response;
		});
	}
	else if($localStorage.cityId != null 
			  || $localStorage.cityId != undefined) {
		Location.selectLocationByCity($localStorage.cityId).then(function(response) {
			$scope.locations = response;
		});
	}

	$scope.addBasicDetails=function(basic) {
		try {
			$rootScope.isLoading = true;
			var db = firebase.database();
			var key = $localStorage.key;
			var cityId = $localStorage.cityId;
			var cityName = $localStorage.cityName;
			var zoneName = $localStorage.zoneName;
			var zoneId = $localStorage.zoneId;
			var projectName = $localStorage.projectName;
			var path = '/protectedResidential/'+cityid+'/projects/'+projectkey+'/1-1';
			
			//code to parse and cnvert string locations into json to ready pushed into data
			var pushLocations = [];
			var parsedLocations = JSON.parse(JSON.stringify(basic.loc));
			angular.forEach(parsedLocations,function(value,key){
				var innerObject = JSON.parse(value);
				var id =	innerObject.id;
				var name = innerObject.name;
				pushLocations[id]={
					id:id,
					name:name
				};
				//setting to location relevant data
				firebase.database().ref('locations/'+cityid+'/'+id).set({
					cityId:cityid,
					cityName:cityname,
					locationId:id,
					locationName:name,
					zoneId:zoneid,
					zoneName:zonename,
					lat : 0,
					long : 0
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
				firebase.database().ref('locations/'+cityid+'/'+id+'/projects/'+projectkey).set({
					projectId:projectkey,
					projectName:projectname,
					version:'1-1'
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
			});

			//set locations to project data
			firebase.database().ref(path+'/projectDetails/address/locations/').set(pushLocations, function(error) {
				if(error) {
					var msg = 'Unhandled Exception';
					if(error.stack.indexOf('undefined') != -1) msg = 'One Or More Necessary Value Is Empty';
					// $rootScope.isLoading = false;
					LoadingIndicatorService.loadingEnd();
					ErrorMessage.showMessage('Something Went Wrong', msg);
					console.error(error);
				}
			});

			// set other basic details

			firebase.database().ref(path+'/projectDetails').update({
				partners : {
					constructionCompany : {
						name : basic.constructionCompany.name,
						website : basic.constructionCompany.email
					},
					architect : {
						name : basic.architect.name,
						website : basic.architect.email
					},
					landscapeDesign : {
						name : basic.landscapeDesign.name,
						website : basic.landscapeDesign.email
					}
				},
				carParking:basic.carParking,
				visitorCarParking : basic.visitorCarParking,
				vastuCompliant : basic.vastuCompliant,
				floors : { 
					max:basic.floors.max,
					min:basic.floors.min
				},
				lifts : { 
					max:basic.lifts.max,
					min:basic.lifts.min
				},
				totalUnits : basic.totalUnits,
				totalTowers : basic.totalTowers,
				greenArea : basic.greenArea,
				landArea : basic.landArea,
				projectType : {
					apartment : basic.projectType.apartment,
					villa:basic.projectType.villa,
					servicedApartment : basic.projectType.serviceApartment,
					rowHouse : basic.projectType.rowHouse,
					studio:basic.projectType.studio
				},
				approvedBankLoans : {
					hdfc:basic.appBankLoans.hdfc,
					axis:basic.appBankLoans.axis
				}
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
			// $location.path('/rwa');
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