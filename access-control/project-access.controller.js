app.controller('projectAccessCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    var db = firebase.database();
    // $scope.cities = [{
    //         name: 'Gurgaon',
    //         id: 1234
    //     }

    // ];

    db.ref().child('city').once('value', function(citySnapshot) {
        $timeout(function() {
            $scope.cities = citySnapshot.val();
            //console.log(citySnapshot.val());
        }, 50);
    });

    // called when city changes
    $scope.getProjects = function(val) {
        $scope.projects = $scope.cities[val].projects;
        $scope.cityid = val;
        //console.log($scope.projects);
    };


    // called when project changes
    $scope.getProject = function(data) {
        //protectedResidentialVersions
        $scope.project = data;
        console.log(data);
        // firebase.database()
        // 	.ref()
        // 	.child('protectedResidentialVersions/'+$scope.data.city+'/projects')
        // 	.once('value', function(projectSnapshot){
        // 		//console.log(projectSnapshot.val());
        // 		$timeout(function(){
        // 			$scope.editableProject = projectSnapshot.val();
        // 			console.log($scope.editableProject);
        // 		},50);
        // 	});
        // $scope.projects = $scope.cities[val].projects;
    };




    // $scope.projects = [];
    // $scope.loadProjects = function(city) {

    //     db.ref('/protectedResidential/' + $scope.cityid + '/projects').on("child_added", function(snapshot) {
    //         $timeout(function() {
    //             $scope.projects = snapshot.val();
    //         }, 100);
    //     });

    // }
    $scope.adminAccess = {};
    $scope.locadAdmins = function() {
        var projectAdminsList = {};


        db.ref().child('admins').once('value', function(adminSnapshot) {
            $scope.allAdminInit = adminSnapshot.val();

            $scope.allAdmin = adminSnapshot.val();
            db.ref('/adminProjectAccess/' + $scope.cityid + '/projects/' + $scope.project).once("value", function(snapshot) {
                var currentAdmin = snapshot.val();
                angular.forEach(currentAdmin, function(value, key) {



                    $scope.allAdmin[value.adminId].value1 = true;
                    console.log($scope.allAdmin);

                });
                $timeout(function() {
                    $scope.admins = $scope.allAdmin;
                    //console.log(citySnapshot.val());
                }, 50);
            });

        });

    };

    $scope.finalAdminAccess = [];
    $scope.finalProjectAccess = [];
    $scope.giveAccess = function() {

        var proj = {

            projectId: $scope.project,
            projectName: $scope.projects[$scope.project].projectName

        }

        angular.forEach($scope.allAdminInit, function(value, key) {

            //	console.log($scope.adminAccess[value.adminId]);
            if ($scope.adminAccess[value.uid] == true) {
                console.log($scope.projects[$scope.project].projectName);
                var addProjectAccess = {}
                addProjectAccess['admins/'+value.uid+'/projectAccess/'+$scope.cityid+'/cityId'] = $scope.cityid;
      			addProjectAccess['admins/'+value.uid+'/projectAccess/'+$scope.cityid+'/cityName'] = $scope.cities[$scope.cityid].cityName;
      			addProjectAccess['admins/' + value.uid + '/projectAccess/' + $scope.cityid + '/projects/' + $scope.project] = proj;

      			console.log(addProjectAccess);
                db.ref().update(addProjectAccess);
                var obj = {
                    adminId: value.uid,
                    adminName: $scope.allAdminInit[value.uid].fname
                };
                $scope.finalAdminAccess[value.uid] = obj;
            } else if ($scope.adminAccess[value.uid] == false) {

                db.ref('admins/' + value.uid + '/projectAccess/' + $scope.cityid + '/projects/' + $scope.project).remove();
                db.ref('adminProjectAccess/' + $scope.cityid + '/projects/' + $scope.project + '/' + value.uid).remove();

            }
        });

        db.ref('adminProjectAccess/' + $scope.cityid + '/projects/' + $scope.project).set($scope.finalAdminAccess);

    };

    //     db.ref('/protectedResidential/' + $scope.cityid + '/projects/' + $scope.project + '/' + $scope.version + '/admins').on("value", function(snapshot) {
    //         projectAdminsList = snapshot.val();
    //           angular.forEach(projectAdminsList, function(value, key1) {

    //           	console.log(value);

    //           }
    //     });
    //     $scope.admins = [];
    //     angular.forEach(projectAdminsList, function(value, key1) {
    //         db.ref('/admins/' + key1).on("value", function(snapshot) {
    //             $timeout(function() {
    //                 var obj = {
    //                     fname: snapshot.val().fname,
    //                     lname: snapshot.val().lname,
    //                     id: snapshot.val().id,
    //                     value: value
    //                 }
    //                 $scope.admins.push(obj);
    //             }, 500);

    //         });
    //     });
    // }
    // $scope.adminAccess = {};
    // $scope.giveAccess = function() {
    //     db.ref('/protectedResidential/' + $scope.cityid + '/projects/' + $scope.project + '/' + $scope.version + '/admins').update($scope.adminAccess, function(val) {
    //         if (val != null) {
    //             console.log(val.message);
    //         } else {
    //             angular.forEach($scope.adminAccess, function(value, key) {
    //                 var project = {};
    //                 db.ref('protectedResidential/' + $scope.cityid + '/projects/' + $scope.project + '/').on("child_added", function(snapshot) {
    //                     project = snapshot.val();
    //                 });
    //                 db.ref('/admins/' + key + '/projects/' + project.projectId).update({
    //                     projectName: project.projectDetails.projectName,
    //                     projectId: project.projectId,
    //                     cityName: project.projectDetails.address.cityName,
    //                     cityId: project.projectDetails.address.cityId
    //                 });
    //             });
    //             console.log('Success');
    //         }
    //     });
    // }

}]);
