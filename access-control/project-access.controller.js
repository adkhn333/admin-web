app.controller('projectAccessCtrl', ['$scope', '$timeout', function($scope, $timeout) {
   db.ref().child('city').once('value', function(citySnapshot) {
      $timeout(function() {
         $scope.cities = citySnapshot.val();
         //console.log(citySnapshot.val());
      }, 0);
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
   };

   $scope.adminAccess = {};
   $scope.loadAdmins = function() {
      $timeout(function () {
         $scope.admins = [];
      }, 0);
      var projectAdminsList = {};
      db.ref().child('admins').once('value', function(adminSnapshot) {
         $scope.allAdminInit = adminSnapshot.val();
         // console.log($scope.allAdminInit);
         $scope.allAdmin = adminSnapshot.val();
         db.ref('/adminProjectAccess/' + $scope.cityid + '/projects/' + $scope.project).once("value", function(snapshot) {
            var currentAdmin = snapshot.val();
            angular.forEach(currentAdmin, function(value, key) {
               $scope.allAdmin[value.adminId].value1 = true;
               // console.log($scope.allAdmin);
            });
            $timeout(function() {
               $scope.admins = $scope.allAdmin;
            }, 0);
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
      console.log($scope.allAdminInit);
      angular.forEach($scope.allAdminInit, function(value, key) {
         console.log(key, value.uid);
         //	console.log($scope.adminAccess[value.adminId]);
         if ($scope.adminAccess[value.uid] == true) {
            console.log($scope.projects[$scope.project].projectName);
            console.log(key, value.uid);
            var addProjectAccess = {}
            addProjectAccess['admins/'+key+'/projectAccess/'+$scope.cityid+'/cityId'] = $scope.cityid;
            addProjectAccess['admins/'+key+'/projectAccess/'+$scope.cityid+'/cityName'] = $scope.cities[$scope.cityid].cityName;
            addProjectAccess['admins/' + key + '/projectAccess/' + $scope.cityid + '/projects/' + $scope.project] = proj;
            // console.log(addProjectAccess);
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
}]);
