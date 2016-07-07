app.controller("nearbyListCtrl", ['$scope', '$firebaseArray', function($scope, $firebaseArray){

   var getcity = db.ref("city");
   $scope.cities = $firebaseArray(getcity);

   $scope.submitCity = function(){
      var nearbyList = db.ref("nearby/"+$scope.selectedCity);
      $scope.nearbyList = $firebaseArray(nearbyList);   
   }
}]);
