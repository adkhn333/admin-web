app.controller("addNearbyCtrl", ['$scope', '$firebaseArray', '$location','NgMap',function($scope, $firebaseArray, $location,NgMap){
   var getcity = db.ref("city");
   $scope.cities = $firebaseArray(getcity);
   $scope.placeChanged = function(){
      $scope.place = this.getPlace();
      //console.log('location', $scope.place.geometry.location);
      $scope.map.setCenter($scope.place.geometry.location);
      $scope.placeid = $scope.place.place_id;
      //console.log($scope.google_place_id);
   }
   NgMap.getMap().then(function(map) {
      $scope.map = map;
   });
   $scope.submitNearby = function(){

      var detailsObj = {
         website: $scope.website,
         phoneNo: $scope.mobile,
         email: $scope.email
      }
      var obj = {
         name: $scope.placename,
         type: $scope.placetype,
         address: $scope.address,
         landmark: $scope.landmark,
         latitude: $scope.latitude,
         longitude: $scope.longitude,
         city: $scope.selectedCity,
         details: detailsObj,
         placeid:$scope.placeid,
         // type: $scope.type
      }

      console.log(obj);

      var newNearbyKey = db.ref().push().key;

      obj['nearbyId'] = newNearbyKey;
      var updatesNearby = {};
      updatesNearby['/nearby/'+$scope.selectedCity+"/"+newNearbyKey] = obj;
      db.ref().update(updatesNearby).then(function(){
         console.log("success");
         $location.path("/nearby/list");
      });
   };
}]);
