app
.controller('createCityZoneLocationCtrl', function($scope, $http, $timeout){
	$scope.city = {};
	$scope.zone = {};
	$scope.location = {};

	$scope.selected = {
		status: 'city'
	};
	$scope.radioChange =  function(selected) {
		$scope.selected.status=selected;
		// load city
		if($scope.selected.status=='zone'){
			//console.log('Select city');
			firebase.database().ref().child('city').once('value', function(snapshot){
				console.log(snapshot.val());
				$timeout(function(){
					$scope.cities = snapshot.val();
				},50);
			});
		// load city and zone
		}else if($scope.selected.status=='location') {
			//console.log('Select city, zone');
			firebase.database().ref().child('city').once('value', function(snapshot){
				console.log(snapshot.val());
				$timeout(function(){
					$scope.cities = snapshot.val();
				},50);
			});
		// do nothing
		}else {
			console.log('Something went wrong');

		}
	}

	$scope.selectZonesByCity = function(data) {
		console.log(data);
		var myobj = JSON.parse(data);

		console.log();

		firebase.database().ref().child('zone/'+myobj.cityId).once('value', function(snapshot){
			$timeout(function(){
				$scope.zones = snapshot.val();
				console.log(snapshot.val());
			},50);
		});
	}
	$scope.reset = function(){
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

	$scope.addNewCity = function(city) {
		$scope.reset();


		var newCityKey = firebase.database().ref().child('city').push().key;
		city['cityId'] = newCityKey;
		var updates = {};
		updates['/city/' + newCityKey] = city;

		firebase.database().ref().update(updates);
	}
	$scope.addNewZone = function(zone) {
		console.log(zone);
		$scope.reset();

		var myobj = JSON.parse(zone.city);

		myobj['zoneName'] = zone.zoneName;
		console.log(myobj);

		var newZoneKey = firebase.database().ref().child('zone').push().key;
		myobj['zoneId'] = newZoneKey;
		var updates = {};
		updates['/zone/'+ myobj.cityId + '/' + newZoneKey] = myobj;

		firebase.database().ref().update(updates);

	}
	$scope.addNewLocation = function(location) {
		console.log(location);
		$scope.reset();

		var myobj = JSON.parse(location.zone);

		myobj['locationName'] = location.location;
		console.log(myobj);

		var newLocationKey = firebase.database().ref().child('location').push().key;
		myobj['locationId'] = newLocationKey;

		var updates = {};
		updates['location/'+myobj.cityId+'/'+newLocationKey] = myobj;
		firebase.database().ref().update(updates);


	}

//firebase.database().ref().child("zone").set(city);
});




