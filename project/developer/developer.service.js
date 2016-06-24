app.factory("DeveloperService", ['$http', '$rootScope', '$localStorage', '$mdToast', '$mdDialog', '$q', '$firebaseArray', function($http, $rootScope, $localStorage, $mdToast, $mdDialog, $q, $firebaseArray){
   var service = {};

   service.getAllDevelopersRequest = getAllDevelopersRequest;

   return service;

   function getAllDevelopersRequest(){

      var deferred = $q.defer();

      var ref = db.ref().child("developers");

      // devList = $firebaseArray(ref);
      // $rootScope.$watch('devList');
      // console.log(devList);
      // deferred.resolve(devList);

      ref.on('value', function(snapshot){
         var devList = [];
         angular.forEach(snapshot.val(), function(value, key){
            value.developer_id = key;
            devList.push(value);
         });
         $mdToast.show(
            $mdToast.simple()
              .textContent("Developers Data fetched Successfully")
              .hideDelay(3000)
         );
         deferred.resolve(devList);
      }, function(errorObject){
         console.log(errorObject);
         console.log("error");
         $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(false)
            .title('Something went wrong!')
            .textContent('Please refresh the page.')
            .ariaLabel('Something went wrong.')
            .ok('OK!')
         );
      });

      return deferred.promise;
   }
}])
