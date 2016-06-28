app.factory("BuilderService", ['$http', '$rootScope', '$localStorage', '$mdToast', '$mdDialog', '$q', '$firebaseArray', function($http, $rootScope, $localStorage, $mdToast, $mdDialog, $q, $firebaseArray){
   var service = {};

   service.getAllBuildersRequest = getAllBuildersRequest;

   return service;

   function getAllBuildersRequest(){

      var deferred = $q.defer();

      var ref = db.ref().child("builders");

      // devList = $firebaseArray(ref);
      // $rootScope.$watch('devList');
      // console.log(devList);
      // deferred.resolve(devList);

      ref.on('value', function(snapshot){
         var devList = [];
         angular.forEach(snapshot.val(), function(value, key){
            value.builderId = key;
            devList.push(value);
         });
         $mdToast.show(
            $mdToast.simple()
              .textContent("Builders Data fetched Successfully")
              .hideDelay(3000)
         );
         deferred.resolve(devList);
      }, function(errorObject){
         console.log(errorObject);
         console.log("error");
      });

      return deferred.promise;
   }
}])
