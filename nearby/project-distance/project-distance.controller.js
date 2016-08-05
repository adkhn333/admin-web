app.controller("getProjectDistanceCtrl", ['$scope', '$rootScope', 'ErrorMessage', '$http', '$firebaseArray', 'ProjectDistanceService', function($scope, $rootScope, ErrorMessage, $http, $firebaseArray, ProjectDistanceService){
   try {
      $rootScope.isLoading = true;
      var getcity = db.ref("city");
      $firebaseArray(getcity).$loaded().then(function(obj) {
         $scope.cities = obj;
         $rootScope.isLoading = false;
      });
   }
   catch(error) {
      var msg = 'Unhandled Exception';
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', msg);
      console.error(error);
   }

   $scope.onChange = function() {
      $rootScope.isLoading = true;
      console.log($scope.selectedCity);
      var nearbyPlaces = db.ref("nearby/"+$scope.selectedCity);
      $firebaseArray(nearbyPlaces).$loaded().then(function(obj) {
         $scope.allPlaces = obj;
         $rootScope.isLoading = false;
      });
   };

   $scope.getDistance = function() {
      try {
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
            }, function(error) {
               if(error) {
                  var msg = 'Unhandled Exception';
                  $rootScope.isLoading = false;
                  ErrorMessage.showMessage('Something Went Wrong', msg);
                  console.error(error);
               }
            });
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
   }
}]);
