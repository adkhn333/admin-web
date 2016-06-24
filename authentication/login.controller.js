app.controller("loginCtrl", ['$scope', '$http', '$location', '$mdToast', '$localStorage', 'AuthenticationService', function($scope, $http, $location, $mdToast, $localStorage, AuthenticationService){
   $scope.Login = function(form){
      $scope.notouchlogin = true;
      if(form.$invalid){
         return;
      }
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
   AuthenticationService.Logout();
}]);
