app.controller("addBuilderCtrl", ['$scope', '$http','$mdToast', '$location', '$localStorage', '$mdDialog', '$timeout', function($scope, $http, $mdToast, $location, $localStorage, $mdDialog, $timeout){

   $scope.submitBuilder = function(form){
      $scope.noTouchBuilder = true;
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
         areaConstructed: $scope.areaConstructed,
         email: $scope.email,
         website: $scope.website,
         mobile: $scope.mobile,
         altMob: $scope.altMob || '',
         trackingId: $localStorage.currentUser.uid,
         activeFlag: 1,
         createdDate: new Date()
      }
      console.log(devObject);

      var ref = db.ref().child("builders");
      ref.push(devObject).then(function(data){
         console.log(data);
         console.log(data.key);
         ref.child(data.key).update({
            builderId: data.key
         });
         $timeout(function () {
            $location.path("/builder/list");
         },0);
      });
   }
}]);
