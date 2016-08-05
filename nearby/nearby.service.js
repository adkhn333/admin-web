app.factory("NearbyService", ['$http', '$rootScope', 'ErrorMessage', '$localStorage', '$mdToast', '$mdDialog', '$q', '$firebaseArray', function($http, $rootScope, ErrorMessage, $localStorage, $mdToast, $mdDialog, $q, $firebaseArray){
   var service = {};

   service.getAllNearbyPlacesRequest = getAllNearbyPlacesRequest;

   return service;

   function getAllNearbyPlacesRequest(){
      try {
         var deferred = $q.defer();
         var ref = db.ref().child("nearby");
         ref.on('value', function(snapshot){
            var nearbyList = [];
            deferred.resolve(nearbyList);
         }, function(error){
            if(error) {
               var msg = 'Unhandled Exception';
               $rootScope.isLoading = false;
               ErrorMessage.showMessage('Something Went Wrong', msg);
               console.error(error);
            }
         });
         return deferred.promise;
      }
      catch(error) {
         var msg = 'Unhandled Exception';
         $rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
      }
   }
}]);
