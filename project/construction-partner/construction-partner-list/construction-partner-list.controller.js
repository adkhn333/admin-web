app.controller("listConstructionPartnerCtrl", ['$scope', '$rootScope', 'ErrorMessage', '$http', '$mdToast', '$mdDialog', 'ConstructionPartnerService', function($scope, $rootScope, ErrorMessage, $http, $mdToast, $mdDialog, ConstructionPartnerService){
   $rootScope.isLoading = true;
   try {
      partner_list = ConstructionPartnerService.getAllConstructionPartnersRequest();
      console.log(partner_list);
      partner_list.then(function(allpartners){
         $scope.partnerList = allpartners;
         console.log($scope.partnerList);
         $rootScope.isLoading = false;
      });
   }
   catch(error) {
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', 'Unhandled Exception');
      console.log(error);
   }
}]);
