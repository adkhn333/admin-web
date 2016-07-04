app.factory("NearbyService", ['$http', '$localStorage', '$mdToast', '$mdDialog', '$q', '$firebaseArray', function($http, $localStorage, $mdToast, $mdDialog, $q, $firebaseArray){
   var service = {};

   service.getAllNearbyPlacesRequest = getAllNearbyPlacesRequest;

   return service;

   function getAllNearbyPlacesRequest(){
      var deferred = $q.defer();
      var ref = db.ref().child("nearby");
      ref.on('value', function(snapshot){
         var nearbyList = [];
         deferred.resolve(nearbyList);
      }, function(errorObject){
         console.log("error");
      });
      return deferred.promise;
   }
}]);
