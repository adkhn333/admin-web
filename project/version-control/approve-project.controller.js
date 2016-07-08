app
.controller('projectApprovalCtrl', function($scope, $timeout, $localStorage){
	$scope.dataloaded = false;
	$scope.golive = false;
	$scope.rejectlive = false;

	var uid = $localStorage.currentUser.uid;
	//Get all cities
	firebase.database().ref().child('projectApproval/'+uid).once('value', function(projectApprovalSnapshot){
		$timeout(function(){
			$scope.dataloaded = true;
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
		$scope.dataloaded = false;
		firebase.database().ref()
		.child('protectedResidentialVersions/'+cityId+'/projects/'+projectId)
		.once('value', function(projectSnapshot){
			$timeout(function(){
				$scope.dataloaded = true;
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
		$scope.golive = true;
		$scope.rejectlive = true;
		// remove from submitted
		// add to rejected
		// add to protectedResidential

		// console.log(cityId, projectId, submittedData);
		// return;
		firebase.database().ref('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/submitted')
		.remove();
		
		firebase.database().ref('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/rejected/'+submittedData.version)
		.set(submittedData);





		var newVersion = checkVersion(submittedData.version)+'-'+(checkSubVersion(submittedData.version)+1);
		firebase.database().ref('protectedResidential/'+cityId+'/projects/'+projectId+'/'+submittedData.version)
		.once('value', function(snapshot){

			$timeout(function(){

				firebase.database().ref()
				.child('protectedResidential/'+cityId+'/projects/'+projectId+'/'+newVersion)
				.set(snapshot.val());


				firebase.database().ref()
				.child('protectedResidential/'+cityId+'/projects/'+projectId+'/'+newVersion+'/version')
				.set(newVersion);
			});

		});



	}
	
		// Go live
	$scope.accept = function(cityId, projectId, submittedData) {
		$scope.golive = true;
		$scope.rejectlive = true;
		console.log(cityId, projectId, submittedData);

		// add to neighbourhood
		firebase.database().ref('neighbourhood/data/projects/'+projectId+'/projectId').set(projectId);
		firebase.database().ref('neighbourhood/data/projects/'+projectId+'/name').set(submittedData.projectName);

		// submitted is deleted
		// editable is change to new editable
		// live becomes prev live 
		// submitted becomes live
		
		firebase.database().ref('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/submitted').remove();



		firebase.database().ref('protectedResidential/'+cityId+'/projects/'+projectId+'/'+submittedData.version)
		.once('value', function(submitedVersionSnapshot){
			$timeout(function(){
				// add to projects
				firebase.database().ref('projects/'+cityId+'/residential/'+projectId)
				.set(submitedVersionSnapshot.val());

			},50);
		});



		firebase.database().ref('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/editable')
		.once('value', function(editableSnapshot){
			$timeout(function(){
				var newEditableData = editableSnapshot.val();

				console.log(newEditableData);
				newEditableData.version = (checkVersion(newEditableData.version)+1)+'-1';
				firebase.database().ref('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/editable')
				.set(newEditableData);

			});
		});

		firebase.database().ref('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/live')
		.once('value', function(liveSnapshot){
			$timeout(function(){

				console.log(liveSnapshot.val());
				if(liveSnapshot.val()){
					firebase.database().ref('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/prevLive/'+liveSnapshot.val().version)
					.set(liveSnapshot.val());
				}
				firebase.database().ref('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/live')
				.set(submittedData);
			});
		});


		// get current editable version and change the protected editable


		firebase.database().ref('protectedResidentialVersions/'+cityId+'/projects/'+projectId+'/editable/version')
		.once('value', function(currentEditableVersionSnapshot){
			$timeout(function(){
				var currentEditableVersion = currentEditableVersionSnapshot.val();
				// change the editable version
				firebase.database().ref('protectedResidential/'+cityId+'/projects/'+projectId+'/'+currentEditableVersion)
				.once('value', function(protectedSnapshot){
					$timeout(function(){

						firebase.database().ref('protectedResidential/'+cityId+'/projects/'+projectId+'/'+protectedSnapshot.val().version)
						.remove();

						var newVersion = (checkVersion(currentEditableVersion)+1)+'-1';
						var newProtectedEditable = protectedSnapshot.val();
						newProtectedEditable.version = newVersion;

						firebase.database().ref('protectedResidential/'+cityId+'/projects/'+projectId+'/'+newVersion)
						.set(newProtectedEditable);

					},50);
				});
			});
		});





	}
});
