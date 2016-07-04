app
.controller('versionControlCtrl', function($scope, $timeout, $localStorage){


	var uid = $localStorage.currentUser.uid;
	//Get all cities
	firebase.database().ref().child('projectApproval/'+uid).once('value', function(projectApprovalSnapshot){
		$timeout(function(){
			$scope.cities = projectApprovalSnapshot.val();
			console.log($scope.cities);
		},50);
	});

	// called when city changes
	$scope.getProjects = function(cityId){		
		$scope.projects = $scope.cities[cityId];
		//console.log($scope.projects);
	};

	// called when project changes
	$scope.getProject = function(cityId, projectId){

		firebase.database().ref()
		.child('protectedResidentialVersions/'+cityId+'/projects/'+projectId)
		.once('value', function(projectSnapshot){
			$timeout(function(){
				$scope.allProjects = projectSnapshot.val();
				console.log($scope.allProjects);
			},50);
		});
	};

	function checkVersion(data) {

		var str = data;
		var foo = str.split("-");

		return parseInt(foo[0])
	}
	function checkSubVersion(data) {
		var str = data;
		var foo = str.split("-");

		return parseInt(foo[1])
	}

	$scope.reject = function(cityId, projectId, submittedData) {

		// remove from submitted
		// add to rejected
		// add to protectedResidential

		// console.log(cityId, projectId, submittedData);
		// return;
		firebase.database().ref()
		.child('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/submitted')
		.remove();
		
		firebase.database().ref()
		.child('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/rejected/'+submittedData.version)
		.set(submittedData);





		var newVersion = checkVersion(submittedData.version)+'-'+(checkSubVersion(submittedData.version)+1);
		firebase.database().ref()
		.child('protectedResidential/'+cityId+'/projects/'+projectId+'/'+submittedData.version)
		.once('value', function(snapshot){

			firebase.database().ref()
			.child('protectedResidential/'+cityId+'/projects/'+projectId+'/'+newVersion)
			.set(snapshot.val());


			firebase.database().ref()
			.child('protectedResidential/'+cityId+'/projects/'+projectId+'/'+submittedData.version+'/version')
			.set(submittedData.version);
		});



	}
	
		// Go live
	$scope.accept = function(cityId, projectId, submittedData) {

		console.log(cityId, projectId, submittedData);

		// chenge editable version to new version
		// add to protectedResidentialVersion live with new version
		// remove submitted


		var editableRef = firebase.database().ref()
		.child('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/editable');

		var liveRef = firebase.database().ref()
		.child('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/live');

		var prevLiveRef = firebase.database().ref()
		.child('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/prevLive');


		var newVersion = (checkVersion(submittedData.version)+1)+'-1';

		if($scope.allProjects.live){
			prevLiveRef.child($scope.allProjects.live.version).set($scope.allProjects.live);
		}

		liveRef.set(submittedData);
		// delete
		var submittedRef = firebase.database().ref()
		.child('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/submitted').remove();
		

		
		var protedtedResidentialRef = firebase.database().ref()
		.child('protectedResidential/'+cityId+'/projects/'+projectId+'/'+submittedData.version);

		protedtedResidentialRef.once('value', function(snapshot){
			$timeout(function(){
				// console.log(snapshot.val());
				// console.log(cityId);
				// console.log(projectId);
				console.log(submittedData.version);
				firebase.database().ref()
				.child('projects/'+cityId+'/residential/'+projectId)
				.set(snapshot.val());

				firebase.database().ref()
				.child('protectedResidential/'+cityId+'/projects/'+projectId+'/'+submittedData.version)
				.set(snapshot.val());

				firebase.database().ref()
				.child('protectedResidential/'+cityId+'/projects/'+projectId+'/'+submittedData.version+'/version')
				.set(submittedData.version);
				// var x = snapshot.val();
				// x.version = checkVersion(snapshot.val().version);

				// firebase.database().ref()
				// .child('protectedResidential/'+cityId+'/projects/'+projectId+'/'+snapshot.val().version);
				// .set(x);

				var newEditable = snapshot.val();
				newEditable.version = newVersion;
				editableRef.set(newEditable);


				firebase.database()
				.ref('protectedResidential/'+$scope.data.city+'/projects/'+projectId+'/'+newEditable.version)
				.set(newEditable);

				console.log('protectedResidential/'+$scope.data.city+'/projects/'+projectId+'/'+submittedData.version);
				firebase.database()
				.ref('protectedResidential/'+$scope.data.city+'/projects/'+projectId+'/'+submittedData.version)
				.remove();

			},50);
		});

	}
});