app.factory("ConstructionPartnerService", ['$http', '$rootScope', 'ErrorMessage', '$localStorage', '$mdToast', '$mdDialog', '$q', function($http, $rootScope, ErrorMessage, $localStorage, $mdToast, $mdDialog, $q){
   var service = {};

   service.getAllConstructionPartnersRequest = getAllConstructionPartnersRequest;

   return service;

   function getAllConstructionPartnersRequest() {
      try {
      var deferred = $q.defer();
      var ref = db.ref().child("constructionPartners");
      ref.on('value', function(snapshot){
         var partnerList = [];
         angular.forEach(snapshot.val(), function(value, key){
            value.partnerId = key;
            partnerList.push(value);
         });
         $mdToast.show(
            $mdToast.simple()
              .textContent("Construction Partners Data fetched Successfully")
              .hideDelay(3000)
         );
         deferred.resolve(partnerList);
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
