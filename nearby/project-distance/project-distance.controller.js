app.controller("getProjectDistanceCtrl", ['$scope', '$http', '$firebaseArray', function($scope, $http, $firebaseArray){
   var getcity = db.ref("city");
   $scope.cities = $firebaseArray(getcity);

   $scope.onChange = function() {
      console.log($scope.selectedCity);

      var nearbyPlaces = db.ref("nearby/"+$scope.selectedCity);
      $scope.allPlaces = $firebaseArray(nearbyPlaces);
   };

   $scope.getDistance = function(){
      var object = {
         city: $scope.selectedCity,
         place: $scope.selectedPlace,
         time: $scope.time
      }
      console.log(object);

      var allProjects = db.ref("projects/"+$scope.selectedCity+"/residential");
      allProjects.on("value", function(snapshot){
         console.log(snapshot.val());
      });
      $http.get("https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:ChIJ__8PKZ0YDTkR5kCechetH68&destinations=place_id:ChIJa5eBWT8YDTkRpPAcyLWSglA&key=AIzaSyCAm8WiABW8aEssyzeEJz1kWoRjuZXZwfQ")
         .success(function(response){
            console.log(response);
         })
         .error(function(response){
            console.log(response);
         })
   }
}]);
