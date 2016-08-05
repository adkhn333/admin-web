app.factory("BuilderService", ['$http', '$rootScope', 'ErrorMessage', '$localStorage', '$mdToast', '$mdDialog', '$q', '$firebaseArray', function($http, $rootScope, ErrorMessage, $localStorage, $mdToast, $mdDialog, $q, $firebaseArray){
   var service = {};

   service.getAllBuildersRequest = getAllBuildersRequest;

   return service;

   function getAllBuildersRequest() {
      try {
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
}])
