app.controller("signupCtrl", ['$scope', '$http', '$rootScope', '$location', '$mdDialog', function($scope, $http, $rootScope, $location, $mdDialog){

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

   $scope.signup = function(form){
      $scope.notouchlogin = true;
      if(form.$invalid){
         return;
      }
      if($scope.userPassword == $scope.userPassword_verify){
         var signupObject = {
            admin_id: paramList[0],
            match_id: paramList[1],
            code: paramList[2],
            opt: paramList[3]
         };
         console.log(signupObject);
         $http.post("http://139.162.44.67/verifyAdmin", signupObject)
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
                     $http.post("http://139.162.44.67/createAdmin", createObject)
                        .success(function(response){
                           console.log("success");
                           console.log(response);
                        })
                        .error(function(response){
                           console.log("error");
                           console.log(response);
                        });
                  }).catch(function(error) {
                     var errorCode = error.code;
                     var errorMessage = error.message;
                     console.log(errorCode);
                  });

               }
            })
            .error(function(data){
               console.log(data);
            });
      }
      else{
         console.log("passwords not same");
         $mdDialog.show(
            $mdDialog.alert()

            .clickOutsideToClose(true)
            .title('Passwords Do Not Match')
            .textContent('The password should be of the format: minimum 6 characters, atleast one uppercase, one lowercase and one numeric character.')
            .ariaLabel('Passwords Do Not Match')
            .ok('Got it!')
            //  .targetEvent(ev)
         );
      }
   };
}]);
