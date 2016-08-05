app.controller("loginCtrl", ['$scope', '$rootScope', 'ErrorMessage', '$http', '$location', '$mdToast', '$localStorage', 'AuthenticationService', function($scope, $rootScope, ErrorMessage, $http, $location, $mdToast, $localStorage, AuthenticationService){
   $rootScope.isLoading = false; 
   $scope.Login = function(form) {
     try {
        $scope.notouchlogin = true;
        if(form.$invalid) return;
        // if($scope.loginForm.$invalid) return;
        AuthenticationService.Login($scope.newUser.userEmail, $scope.newUser.userPassword, function(result){
            console.log(result);
            if(result === true){
              console.log(result);
              // $location.path("/dashboard");
            }
            else{
              console.log("result = false, error in login");
              $mdToast.show(
                  $mdToast.simple()
                    .textContent("Successfully Logged Out!")
                    .hideDelay(3000)
              );
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
   try {
   AuthenticationService.Logout();
   }
   catch(error) {
      var msg = 'Unhandled Exception';
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', msg);
      console.error(error);
   }
}]);
