app.factory("AdminService", ['$http', '$rootScope', '$localStorage', '$mdToast', '$mdDialog', '$q', '$firebaseArray', function($http, $rootScope, $localStorage, $mdToast, $mdDialog, $q, $firebaseArray){
   var service = {};

   service.getAllAdminDetailsRequest = getAllAdminDetailsRequest;

   return service;

   function getAllAdminDetailsRequest(){
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
      }, function(errorObject){
         console.log(errorObject);
      });

      // even slower method but provides realtime view update capabilities
      // adminlist = $firebaseArray(ref);
      // $rootScope.$watch('adminlist');
      // console.log(adminlist);
      // deferred.resolve(adminlist);

      return deferred.promise;
   }
}]);
