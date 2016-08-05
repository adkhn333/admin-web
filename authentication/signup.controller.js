// Not Tested
app.controller("signupCtrl", ['$scope', '$http', '$rootScope', '$location', '$mdDialog', function($scope, $http, $rootScope, $location, $mdDialog){

   try {   
      var ref = firebase.database().ref("admins");

      params = window.location.href.split("&");
      console.log(params);
      var paramList = [];
      for (var i = 0; i < params.length; i++) {
            console.log(params[i].split("=").pop());
            paramList.push(params[i].split("=").pop());
      }
      console.log(paramList);
      $scope.emailid = paramList[1];
   }
   catch(error) {
      var msg = 'Unhandled Exception';
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', msg);
      console.error(error);
   }

   $scope.signup = function(form){
      try {
            $scope.notouchlogin = true;
            if(form.$invalid) return;
            if($scope.userPassword == $scope.userPasswordVerify){
            var signupObject = {
                  adminId: paramList[0],
                  matchId: paramList[1],
                  code: paramList[2],
                  opt: paramList[3]
            };
            console.log(signupObject);
            $http.post("http://139.162.3.205/api/verifyAdmin", signupObject)
                  .success(function(response){
                  console.log(response);
                  if(response == true){
                        firebase.auth().createUserWithEmailAndPassword($scope.emailid, $scope.userPassword).then(function(user){
                        console.log(user);
                        console.log(ref.child(paramList[0]));
                        var createObject = {
                              id: paramList[0],
                              uid: user.uid
                        }
                        $http.post("http://139.162.3.205/api/createAdmin", createObject)
                              .success(function(response){
                                    console.log("success");
                                    console.log(response);
                                    $location.path("/login");
                              })
                              .error(function(response){
                                    console.log("error");
                                    console.log(response);
                              });
                        }).catch(function(error) {
                              var msg = 'Unhandled Exception';
                              $rootScope.isLoading = false;
                              ErrorMessage.showMessage('Something Went Wrong', msg);
                              console.error(error);
                        });

                  }
                  })
                  .error(function(data){
                        var msg = 'Unhandled Exception';
                        $rootScope.isLoading = false;
                        ErrorMessage.showMessage('Something Went Wrong', msg);
                        console.error(error);
                  });
            }
            else{
            console.log("passwords not same");
            // $mdDialog.show(
            //       $mdDialog.alert()

            //       .clickOutsideToClose(true)
            //       .title('Passwords Do Not Match')
            //       .textContent('The password should be of the format: minimum 6 characters, atleast one uppercase, one lowercase and one numeric character.')
            //       .ariaLabel('Passwords Do Not Match')
            //       .ok('Got it!')
            //       //  .targetEvent(ev)
            // );
            ErrorMessage.showMessage('Passwords Do Not Match', 
                  'The Password Should Be Of The Format: Minimum 6 Characters, '+ 
                  'Atleast One Uppercase, One Lowercase And One Numeric Character.');
            }
      }
      catch(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
      }
   };
}]);
