app.controller("addNearbyCtrl", ['$scope', '$rootScope', 'ErrorMessage', '$firebaseArray', '$location', 'NgMap', function($scope, $rootScope, ErrorMessage, $firebaseArray, $location, NgMap){
   // var getcity = db.ref("city");
   // $rootScope.isLoading = true;
   // Below Link Is Changed To Cooperate with Loader
   // $scope.cities = $firebaseArray(getcity);
   $scope.placeChanged = function(){
      try {
         $scope.place = this.getPlace();
         console.log($scope.place);
         // console.log('location', $scope.place.geometry.location);
         $scope.map.setCenter($scope.place.geometry.location);
         $scope.placeid = $scope.place.place_id;
         $scope.latitude = $scope.place.geometry.location.lat();
         $scope.longitude = $scope.place.geometry.location.lng();
         // console.log($scope.placeid);
         console.log($scope.place.geometry.location.lat());
         console.log($scope.place.geometry.location.lng());
      }
      catch(error) {
         var msg = 'Unhandled Exception';
         $rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
      }
   }
   try {
      var getcity = db.ref("city");
      $rootScope.isLoading = true;
      NgMap.getMap().then(function(map) {
         $scope.map = map;
         $firebaseArray(getcity).$loaded().then(function(obj){
            $scope.cities = obj;
            $rootScope.isLoading = false;
         }).catch(function(error) {
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', 'Unhandled Exception');
            console.log(error);
         });
      });
   }
   catch(error) {
      var msg = 'Unhandled Exception';
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', msg);
      console.error(error);
   }
   $scope.submitNearby = function(){
      try {
         $rootScope.isLoading = true;
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
            placeId:$scope.placeid,
            // type: $scope.type
         }

         console.log(obj);

         var newNearbyKey = db.ref().push().key;

         obj['nearbyId'] = newNearbyKey;
         var updatesNearby = {};
         updatesNearby['/nearby/'+$scope.selectedCity+"/"+newNearbyKey] = obj;
         db.ref().update(updatesNearby, function(error) {
            if(error) {
               var msg = 'Unhandled Exception';
               $rootScope.isLoading = false;
               ErrorMessage.showMessage('Something Went Wrong', msg);
               console.error(error);
            }
         }).then(function() {
            console.log("success");
            $location.path("/nearby/list");
            $rootScope.isLoading = false;
         });
      }
      catch(error) {
         var msg = "Unhandled Exception";
         $rootScope.isLoading = false;
         if(error.stack.indexOf('First argument contains undefined') != -1) {
            msg = "One or More of The Neccessary Field Is Undefined";
         }
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.log(error);
      }
   };
}]);
