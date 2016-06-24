app.controller("detailDeveloperCtrl", ['$scope','$stateParams', '$timeout', function($scope, $stateParams, $timeout){
   $scope.id = $stateParams.developer_id;

   var ref = db.ref().child("developers").child($scope.id);
   ref.on('value', function(snapshot){
      $timeout(function() {
         console.log(snapshot.val());
         $scope.developer = snapshot.val();
       }, 0);
   }, function(errorObject){
      console.log("error");
      $mdDialog.show(
         $mdDialog.alert()
         .clickOutsideToClose(false)
         .title('Something went wrong!')
         .textContent('Please refresh the page.')
         .ariaLabel('Something went wrong.')
         .ok('OK!')
      );
   });

   $scope.updateDeveloper = function(form){
      var devObj = {
         name: $scope.developer.name,
         address1: $scope.developer.address1,
         address2: $scope.developer.address2,
         landmark: $scope.developer.landmark,
         city: $scope.developer.city,
         about: $scope.developer.about,
         established: $scope.developer.established,
         area_constructed: $scope.developer.area_constructed,
         email: $scope.developer.email,
         website: $scope.developer.website,
         mobile: $scope.developer.mobile,
         alt_mob: $scope.developer.alt_mob || ''
      }
      console.log(devObj);
      ref.update(devObj);
      //TODO: error handling
   }
}]);
