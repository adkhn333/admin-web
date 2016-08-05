app.factory("AdminService", [
  '$http', 
  '$rootScope', 
  'ErrorMessage',
  '$localStorage', 
  '$mdToast', 
  '$mdDialog', 
  '$q', 
  '$firebaseArray', function( 
    $http, 
    $rootScope, 
    ErrorMessage,
    $localStorage, 
    $mdToast, 
    $mdDialog, 
    $q, 
    $firebaseArray
  ) {
   var service = {};

   service.getAllAdminDetailsRequest = getAllAdminDetailsRequest;

   return service;

   function getAllAdminDetailsRequest() {
      try {
        var deferred = $q.defer();
        console.log("getAllAdmins");

        var ref = db.ref().child("admins");

        // slow method but no realtime view update capabilities
        ref.on('value', function(snapshot){
          var adminlist = [];
          angular.forEach(snapshot.val(), function(value, key){
              value.adminId = key;
              adminlist.push(value);
          })
          console.log(adminlist);
              $mdToast.show(
                $mdToast.simple()
                  .textContent("Admins fetched Successfully")
                  .hideDelay(3000)
              );
              deferred.resolve(adminlist);
        }, function(error) {
          if(error) {
            var msg = "Unhandled Exception";
            if(error.stack.indexOf('permission_denied') != -1) {
              msg = "PERMISSION_DENIED";
            }
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
          }
        });

        // even slower method but provides realtime view update capabilities
        // adminlist = $firebaseArray(ref);
        // $rootScope.$watch('adminlist');
        // console.log(adminlist);
        // deferred.resolve(adminlist);

        return deferred.promise;
      }
      catch(error) {
        $rootScope.isLoading = false;
        ErrorMessage.showMessage('Something Went Wrong', msg);
        console.error(error);
      }
   }
}]);
