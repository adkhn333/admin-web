app
.controller('createCityZoneLocationCtrl', function($scope, $rootScope, ErrorMessage, $http, $timeout){

	$scope.dataloaded = true; // loading indicator

	$scope.city = {};
	$scope.zone = {};
	$scope.location = {};

	$scope.selected = {
		status: 'city'
	};
	$scope.radioChange =  function(selected) {
		try {
			$scope.selected.status=selected;
			// load city
			if($scope.selected.status=='zone'){
				//console.log('Select city');
				firebase.database().ref().child('city').once('value', function(snapshot){
					// console.log(snapshot.val());
					$timeout(function(){
						$scope.cities = snapshot.val();
					},50);
				});
			// load city and zone
			}else if($scope.selected.status=='location') {
				//console.log('Select city, zone');
				firebase.database().ref().child('city').once('value', function(snapshot){
					// console.log(snapshot.val());
					$timeout(function(){
						$scope.cities = snapshot.val();
					},50);
				});
			// do nothing
			}else {
				console.log('Something went wrong');
			}
		}
		catch(error) {
			var msg = 'Unhandled Exception';
			$rootScope.isLoading = false;
			ErrorMessage.showMessage('Something Went Wrong', msg);
			console.error(error);
		}
	}

	$scope.selectZonesByCity = function(data) {
		try {
			// console.log(data);
			var myobj = JSON.parse(data);

			// console.log();

			firebase.database().ref().child('zone/'+myobj.cityId).once('value', function(snapshot){
				$timeout(function(){
					$scope.zones = snapshot.val();
					// console.log(snapshot.val());
				},50);
			}, function(error) {
				if(error) {
					var msg = 'Unhandled Exception';
					$rootScope.isLoading = false;
					ErrorMessage.showMessage('Something Went Wrong', msg);
					console.error(error);
				}
			});
		}
		catch(error) {
			var msg = 'Unhandled Exception';
			$rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
		}
	}
	$scope.reset = function(){
		try {
			$scope.city = {};
			$scope.zone = {};
			$scope.location = {};

			$scope.cityForm.$setPristine();
			$scope.zoneForm.$setPristine();
			$scope.locationForm.$setPristine();

			$scope.cityForm.$setUntouched();
			$scope.zoneForm.$setUntouched();
			$scope.locationForm.$setUntouched();
		}
		catch(error) {
			var msg = 'Unhandled Exception';
			$rootScope.isLoading = false;
			ErrorMessage.showMessage('Something Went Wrong', msg);
			console.error(error);
		}
	}

	$scope.addNewCity = function(city) {
		try {
			$scope.dataloaded = false; // loading indicator
			$scope.reset();

			var newCityKey = firebase.database().ref().child('city').push().key;
			city['cityId'] = newCityKey;
			var updates = {};
			updates['/city/' + newCityKey] = city;

			firebase.database().ref().update(updates, function(error){
				if(error) {
					var msg = 'Unhandled Exception';
					$rootScope.isLoading = false;
					ErrorMessage.showMessage('Something Went Wrong', msg);
					console.error(error);
				}
				$timeout(function() {
					$scope.dataloaded = true; // loading indicator
				}, 10);
			});
		}
		catch(error) {
			var msg = 'Unhandled Exception';
			$rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
		}
	}
	$scope.addNewZone = function(zone) {
		try {
			$scope.dataloaded = false; // loading indicator
			// console.log(zone);
			$scope.reset();

			var myobj = JSON.parse(zone.city);

			myobj['zoneName'] = zone.zoneName;
			// console.log(myobj);

			var newZoneKey = firebase.database().ref().child('zone').push().key;
			myobj['zoneId'] = newZoneKey;
			var updates = {};
			updates['/zone/'+ myobj.cityId + '/' + newZoneKey] = myobj;

			firebase.database().ref().update(updates, function(error){
				if(error) {
					var msg = 'Unhandled Exception';
					$rootScope.isLoading = false;
					ErrorMessage.showMessage('Something Went Wrong', msg);
					console.error(error);
				}
				$timeout(function() {
					$scope.dataloaded = true; // loading indicator
				}, 10);
				
			});
		}
		catch(error) {
			var msg = 'Unhandled Exception';
			$rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
		}

	}
	$scope.addNewLocation = function(location) {
		try {
			// console.log(location);
			$scope.dataloaded = false; // loading indicator
			$scope.reset();

			var myobj = JSON.parse(location.zone);

			myobj['locationName'] = location.location;
			// console.log(myobj);

			var newLocationKey = firebase.database().ref().child('location').push().key;
			myobj['locationId'] = newLocationKey;

			var updates = {};
			updates['location/'+myobj.cityId+'/'+newLocationKey] = myobj;
			firebase.database().ref().update(updates, function(error) {
				if(error) {
					var msg = 'Unhandled Exception';
					$rootScope.isLoading = false;
					ErrorMessage.showMessage('Something Went Wrong', msg);
					console.error(error);
				}
				$timeout(function() {
					$scope.dataloaded = true; // loading indicator
				}, 10);
				
			});
		}
		catch(error) {
			var msg = 'Unhandled Exception';
			$rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
		}


	}
});




