app.controller("forgotPasswordCtrl", ['$scope', '$location', '$http', '$mdToast', '$timeout', function($scope, $location, $http, $mdToast, $timeout){
   $scope.submitEmail = function(form) {
      $scope.notouchreset = true;
      if(form.$invalid){
         return ;
      }
      var auth = firebase.auth();
      var emailAddress = $scope.emailReset;
      auth.sendPasswordResetEmail(emailAddress).then(function() {
         console.log("email sent");
         $timeout(function(){
            $location.path('/login');
         }, 0);
      }, function(error) {
         console.log(error);
      });
   }
}]);
