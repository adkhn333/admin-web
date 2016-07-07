app.controller("addNearbyCtrl", ['$scope', '$firebaseArray', '$location', function($scope, $firebaseArray, $location){
   var getcity = db.ref("city");
   $scope.cities = $firebaseArray(getcity);

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
         // type: $scope.type
      }

      console.log(obj);

      var newNearbyKey = db.ref().push().key;

      obj['nearbyId'] = newNearbyKey;
      var updatesNearby = {};
      updatesNearby['/nearby/'+$scope.selectedCity+"/"+newNearbyKey] = obj;
      db.ref().update(updates).then(function(){
         console.log("success");
         $location.path("/nearby/list");
      });

      // var updatesNearbyDistance = {};
      // var allprojects = db.ref("projects")
      // allprojects.on("value", function(snapshot){
      //    console.log(snapshot.val());
         // for(var i in snapshot.val())
      // });
      // updatesNearbyDistance['nearbyDistance/'+$scope.selectedCity+"/"+newNearbyKey+""]
   };
}]);
