app.controller("detailConstructionPartnerCtrl", ['$scope', '$rootScope', 'ErrorMessage', '$http', '$stateParams', '$mdToast', '$mdDialog', '$location', '$timeout', function($scope, $rootScope, ErrorMessage, $http, $stateParams, $mdToast, $mdDialog, $location, $timeout){
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
   }, function(error) {
      if(error) {
         var msg = 'Unhandled Exception';
         $rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
      }
      // $mdDialog.show(
      //    $mdDialog.alert()
      //    .clickOutsideToClose(false)
      //    .title('Something went wrong!')
      //    .textContent('Please refresh the page.')
      //    .ariaLabel('Something went wrong.')
      //    .ok('OK!')
      // );
   });

   $scope.updatePartner = function(form) {
      try {
         $scope.noTouchBuilder = true;
         if(form.$invalid) return;

         var partnerUpdateObject = {
            name: $scope.partner.name,
            companyType: $scope.partner.companyType,
            website: $scope.partner.website,
         }
         console.log(partnerUpdateObject);
         ref.update(partnerUpdateObject, function(error) {
            if(error) {
               var msg = 'Unhandled Exception';
               $rootScope.isLoading = false;
               ErrorMessage.showMessage('Something Went Wrong', msg);
               console.error(error);
            }
         });
         // TODO: error handling
      }
      catch(error) {
         $rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', 'Unhandled Exception');
         console.log(error);
      }
   }
}]);
