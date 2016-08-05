app
.controller('submitProjectCtrl', function($scope, $rootScope, ErrorMessage, $timeout, $localStorage){

	$scope.dataloaded = false;
	try {
		var uid = $localStorage.currentUser.uid;
		var email = $localStorage.currentUser.email;

		$scope.submitted = false;

		//Get all cities
		firebase.database().ref().child('admins/'+uid).once('value', function(snapshot){
			$timeout(function(){
				$scope.dataloaded = true;
				$scope.userData = snapshot.val(); //validationManager
				$scope.cities = $scope.userData.projectAccess;
				// console.log($scope.userData);
				$scope.validationManager = $scope.userData.validationManager;
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

	// called when city changes
	// @param: string (selected city id)
	$scope.getProjects = function(cityId){
		$scope.projects = $scope.cities[cityId].projects;
	};

	// called when project changes
	// @param: string (selected city id)
	$scope.getProject = function(cityId, projectId){
		try {
			$scope.dataloaded = false;
			firebase.database()
			.ref('protectedResidentialVersions/'+cityId+'/projects')
			.once('value', function(projectSnapshot) {
				$timeout(function(){
					$scope.dataloaded = true;
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
		try {
			firebase.database()
			.ref('protectedResidentialVersions/'+$scope.data.city+'/projects/'+projectId+'/editable')
			.once('value', function(snapshot) {
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
			}).then(function(){

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
			if(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
         }
		}
	}
});


// Example Of Error handling in Nested firebase calls

// articleRef.once('value').then(function(snapshot) {
//   // The first promise succeeded. Save snapshot for later.
//   article = snapshot.val();
//   // By returning a Promise, we know the function passed to "then" below
//   // will execute after the transaction finishes.
//   return articleRef.child('readCount').transaction(function(current) {
//     // Increment readCount by 1, or set to 1 if it was undefined before.
//     return (current || 0) + 1;
//   });
// }).then(function(readCountTxn) {
//   // All promises succeeded.
//   renderBlog({
//     article: article,
//     readCount: readCountTxn.snapshot.val()
//   });
// }, function(error) {
//   // Something went wrong.
//   console.error(error);
// });