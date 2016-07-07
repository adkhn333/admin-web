app.controller("detailConstructionPartnerCtrl", ['$scope', '$http', '$stateParams', '$mdToast', '$mdDialog', '$location', '$timeout', function($scope, $http, $stateParams, $mdToast, $mdDialog, $location, $timeout){
   $scope.id = $stateParams.partnerId;

   $scope.compTypeList = [
      {'name': 'Construction Company'},
      {'name': 'Architect'},
      {'name': 'Landscape Design'}
   ];

   var ref = db.ref().child("constructionPartners").child($scope.id);
   ref.on('value', function(snapshot){
      $timeout(function () {
         console.log(snapshot.val());
         $scope.partner = snapshot.val();
      },0);
   }, function(errorObject){
      console.log(errorObject);
      $mdDialog.show(
         $mdDialog.alert()
         .clickOutsideToClose(false)
         .title('Something went wrong!')
         .textContent('Please refresh the page.')
         .ariaLabel('Something went wrong.')
         .ok('OK!')
      );
   });

   $scope.updatePartner = function(form){
      $scope.noTouchBuilder = true;
      if(form.$invalid){
         return;
      }

      var partnerUpdateObject = {
         name: $scope.partner.name,
         companyType: $scope.partner.companyType,
         website: $scope.partner.website,
      }
      console.log(partnerUpdateObject);
      ref.update(partnerUpdateObject);
      // TODO: error handling
   }
}]);
