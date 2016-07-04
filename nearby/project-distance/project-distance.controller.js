app.controller("getProjectDistanceCtrl", ['$scope', '$http', '$firebaseArray', 'ProjectDistanceService', function($scope, $http, $firebaseArray, ProjectDistanceService){
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

      var nearbyPlaceDetails = db.ref("nearby/"+$scope.selectedCity+"/"+$scope.selectedPlace);
      nearbyPlaceDetails.on("value", function(snap){
         console.log(snap.val());
         var placeDetailsLat = snap.val().latitude;
         var placeDetailsLng = snap.val().longitude;
         console.log(placeDetailsLat, placeDetailsLng);
         var allProjects = db.ref("projects/"+$scope.selectedCity+"/residential");
         allProjects.on("value", function(snapshot){
            console.log(snapshot.val());
            var projects = snapshot.val();
            for(var i in projects){
               console.log(i, projects[i]);
               ProjectDistanceService.getProjectDistanceRequest($scope.selectedCity, $scope.selectedPlace, $scope.time, i, placeDetailsLat, placeDetailsLng);
            }
         });
      });
   }
}]);
