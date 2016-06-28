app.controller("detailBuilderCtrl", ['$scope','$stateParams', '$timeout', function($scope, $stateParams, $timeout){
   $scope.id = $stateParams.builder_id;

   var ref = db.ref().child("builders").child($scope.id);
   ref.on('value', function(snapshot){
      $timeout(function() {
         console.log(snapshot.val());
         $scope.builder = snapshot.val();
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

   $scope.updateBuilder = function(form){
      var devObj = {
         name: $scope.builder.name,
         address1: $scope.builder.address1,
         address2: $scope.builder.address2,
         landmark: $scope.builder.landmark,
         city: $scope.builder.city,
         about: $scope.builder.about,
         established: $scope.builder.established,
         area_constructed: $scope.builder.area_constructed,
         email: $scope.builder.email,
         website: $scope.builder.website,
         mobile: $scope.builder.mobile,
         alt_mob: $scope.builder.alt_mob || ''
      }
      console.log(devObj);
      ref.update(devObj);
      //TODO: error handling
   }
}]);
