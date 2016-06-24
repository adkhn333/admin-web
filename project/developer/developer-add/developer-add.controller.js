app.controller("addDeveloperCtrl", ['$scope', '$http','$mdToast', '$location', '$localStorage', '$mdDialog', '$timeout', function($scope, $http, $mdToast, $location, $localStorage, $mdDialog, $timeout){

   $scope.submitDeveloper = function(form){
      $scope.noTouchDeveloper = true;
      if(form.$invalid){
         return;
      }

      var devObject = {
         name: $scope.fullname,
         address1: $scope.address1,
         address2: $scope.address2,
         landmark: $scope.landmark,
         city: $scope.city,
         about: $scope.about,
         established: $scope.established,
         area_constructed: $scope.area_constructed,
         email: $scope.email,
         website: $scope.website,
         mobile: $scope.mobile,
         alt_mob: $scope.alt_mob || '',
         tracking_id: $localStorage.currentUser.uid,
         active_flag: 1,
         created_date: new Date()
      }
      console.log(devObject);

      var ref = db.ref().child("developers");
      ref.push(devObject).then(function(data){
         console.log(data);
         console.log(data.key);
         ref.child(data.key).update({
            developer_id: data.key
         });
         $timeout(function () {
            $location.path("/developer/list");
         },0);
      });
   }
}]);
