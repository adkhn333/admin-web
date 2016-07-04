app
.controller('projectApprovalCtrl', function($scope, $timeout, $localStorage){


	var uid = $localStorage.currentUser.uid;
	var email = $localStorage.currentUser.email;

	$scope.submitted = false;

	//Get all cities
	firebase.database().ref().child('admins/'+uid).once('value', function(snapshot){
		$timeout(function(){
			$scope.userData = snapshot.val(); //validationManager
			$scope.cities = $scope.userData.projectAccess;
			//console.log($scope.cities);
			$scope.validationManager = $scope.userData.validationManager;
		},50);
	});

	// called when city changes
	// @param: string (selected city id)
	$scope.getProjects = function(cityId){
		$scope.projects = $scope.cities[cityId].projects;
	};

	// called when project changes
	// @param: string (selected city id)
	$scope.getProject = function(cityId, projectId){
		firebase.database()
		.ref('protectedResidentialVersions/'+cityId+'/projects')
		.once('value', function(projectSnapshot){
			$timeout(function(){
				angular.forEach(projectSnapshot.val(), function(value, key){
					if(key==projectId){
						if(value.submitted != undefined){
							$scope.submitted=true;
						}else{
							$scope.submitted=false;
						}
						$scope.editableProject = value.editable;

						console.log($scope.editableProject);
					}
				});

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
	$scope.submitProject = function(version, projectId) {
		$scope.submitted = true;

		// 1. Add to submitted inside protectedResidentialVersions
		// 2. Add to projectApproval
		// 3. Edit version of the editable
		// 4. create new data to protectedResidential with new editable version
		console.log(version, projectId);

		console.log('protectedResidentialVersions/'+$scope.data.city+'/projects/'+projectId+'/editable');

		firebase.database()
		.ref('protectedResidentialVersions/'+$scope.data.city+'/projects/'+projectId+'/editable')
		.once('value', function(snapshot){
			$timeout(function(){
				var submit = {};
				submit = snapshot.val();
				submit.submittedPersonId = uid;
				submit.submittedPersonName = "Admin Name";
				submit.submittedTime = firebase.database.ServerValue.TIMESTAMP;
				submit.submittedTo = $scope.validationManager;
				firebase.database()
				.ref('protectedResidentialVersions/'+$scope.data.city+'/projects/'+projectId+'/submitted')
				.set(submit, function(){
					// 2
					firebase.database()
					.ref('projectApproval/'+$scope.validationManager+'/'+$scope.data.city+'/'+projectId)
					.set(submit, function(){
						
						console.log('protectedResidential/'+$scope.data.city+'/projects/'+projectId+'/'+version);
						firebase.database()
						.ref('protectedResidential/'+$scope.data.city+'/projects/'+projectId+'/'+version)
						.once('value', function(snapshot){

							$timeout(function() {
								console.log(snapshot.val());

								var newEditableData = snapshot.val();
								var ver = checkVersion(newEditableData.version);
								var subv = checkSubVersion(newEditableData.version);
								var newVersion = ver+'-'+(subv+1);

								console.log(newVersion);

								firebase.database().ref()
								.child('protectedResidential/'+$scope.data.city+'/projects/'+projectId+'/'+newVersion)
								.set(snapshot.val(), function(){
									$timeout(function(){

										console.log(snapshot.val());
										firebase.database().ref()
										.child('protectedResidential/'+$scope.data.city+'/projects/'+projectId+'/'+newVersion+'/version')
										.set(newVersion, function(){
											$timeout(function(){

												var newEditableData2 = submit;
												var ver = checkVersion(newEditableData2.version);
												var subv = checkSubVersion(newEditableData2.version);
												
												var newVersion2 = ver+'-'+(subv+1);
												newEditableData2['version'] = newVersion2;
												firebase.database().ref()
												.child('protectedResidentialVersions/'+$scope.data.city+'/projects/'+projectId+'/editable')
												.set(newEditableData2);
											},50);

										});
									});
								});

							}, 10);

						});
					});
					
				});

			}, 50);
		});
		// 1


		
		

		// 3
		
		// 4
		//console.log('protectedResidential/'+$scope.data.city+'/projects/'+projectId+'/'+version);
		
		

	}
});