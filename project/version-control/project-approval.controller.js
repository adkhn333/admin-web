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
		firebase.database().ref()
		.child('protectedResidentialVersions/'+$scope.data.city+'/projects')
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
	$scope.submitProject = function(submittedProjectObject) {
		$scope.submitted = true;

		// 1. Add to submitted inside protectedResidentialVersions
		// 2. Add to projectApproval
		// 3. Edit version of the editable
		// 4. create new data to protectedResidential with new editable version

		console.log(submittedProjectObject);
		// 1
		var submit = {};
		submit = submittedProjectObject;
		submit.submittedPersonId = uid;
		submit.submittedPersonName = "Admin Name";
		submit.submittedTime = firebase.database.ServerValue.TIMESTAMP;
		submit.submittedTo = $scope.validationManager;
		firebase.database().ref()
		.child('protectedResidentialVersions/'+$scope.data.city+'/projects/'+submittedProjectObject.projectId+'/submitted')
		.set(submit);

		// 2
		firebase.database().ref()
		.child('projectApproval/'+$scope.validationManager+'/'+$scope.data.city+'/'+submittedProjectObject.projectId)
		.set(submit);
		

		// 3
		var newEditableData = submittedProjectObject;
		var ver = checkVersion(newEditableData.version);
		var subv = checkSubVersion(newEditableData.version);
		// 4
		console.log('protectedResidential/'+$scope.data.city+'/projects/'+submittedProjectObject.projectId+'/'+submittedProjectObject.version);
		firebase.database()
		.ref('protectedResidential/'+$scope.data.city+'/projects/'+submittedProjectObject.projectId+'/'+submittedProjectObject.version)
		.once('value', function(snapshot){

			$timeout(function() {

				var newVersion = ver+'-'+(subv+1);
				console.log(snapshot.val());

				firebase.database().ref()
				.child('protectedResidential/'+$scope.data.city+'/projects/'+submittedProjectObject.projectId+'/'+newVersion)
				.set(snapshot.val(), function(){
					firebase.database().ref()
					.child('protectedResidential/'+$scope.data.city+'/projects/'+submittedProjectObject.projectId+'/'+newVersion+'/version')
					.set(newVersion);
				});

			}, 10);

		});
		
		var newVersion = ver+'-'+(subv+1);
		newEditableData['version'] = newVersion;
		firebase.database().ref()
		.child('protectedResidentialVersions/'+$scope.data.city+'/projects/'+submittedProjectObject.projectId+'/editable')
		.set(newEditableData);

	}
});