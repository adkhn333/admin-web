app.controller("forgotPasswordCtrl", ['$scope', '$rootScope', 'ErrorMessage', 'LoadingIndicatorService', '$mdDialog', '$location', '$http', '$mdToast', '$timeout', function($scope, $rootScope, ErrorMessage, LoadingIndicatorService, $mdDialog, $location, $http, $mdToast, $timeout){
   $scope.submitEmail = function(form) {
      $rootScope.isLoading = true;
      $scope.notouchreset = true;
      if(form.$invalid) return;
      try {
         var auth = firebase.auth();
         var emailAddress = $scope.emailReset;
         auth.sendPasswordResetEmail(emailAddress).then(function() {
            console.log("email sent");
            $timeout(function(){
               $rootScope.isLoading = false;
               $location.path('/login');
            }, 0);
         }, function(error) {
            if(error) {
               LoadingIndicatorService.loadingEnd().then(function() {
                  console.log(error);
                  $mdDialog.show(
                  $mdDialog.alert()
                     .clickOutsideToClose(false)
                     .title('Something went wrong!')
                     .textContent(error.message)
                     .ariaLabel('Something went wrong.')
                     .ok('OK!')
                  );
               });
            }
         });
      } 
      catch(error) {
         var msg = 'Unhandled Exception';
         $rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
      }
   }
}]);
