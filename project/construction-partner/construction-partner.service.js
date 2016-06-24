app.factory("ConstructionPartnerService", ['$http', '$localStorage', '$mdToast', '$mdDialog', '$q', function($http, $localStorage, $mdToast, $mdDialog, $q){
   var service = {};

   service.getAllConstructionPartnersRequest = getAllConstructionPartnersRequest;

   return service;

   function getAllConstructionPartnersRequest(){
      var deferred = $q.defer();
      var ref = db.ref().child("constructionPartners");
      ref.on('value', function(snapshot){
         var partnerList = [];
         angular.forEach(snapshot.val(), function(value, key){
            value.partner_id = key;
            partnerList.push(value);
         });
         $mdToast.show(
            $mdToast.simple()
              .textContent("Construction Partners Data fetched Successfully")
              .hideDelay(3000)
         );
         deferred.resolve(partnerList);
      }, function(errorObject){
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
}]);
