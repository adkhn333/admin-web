app.controller("listConstructionPartnerCtrl", ['$scope', '$http', '$mdToast', '$mdDialog', 'ConstructionPartnerService', function($scope, $http, $mdToast, $mdDialog, ConstructionPartnerService){

   partner_list = ConstructionPartnerService.getAllConstructionPartnersRequest();
   console.log(partner_list);
   partner_list.then(function(allpartners){
      $scope.partnerList = allpartners;
      console.log($scope.partnerList);
   });
}]);
