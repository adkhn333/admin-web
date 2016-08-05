app.factory("AuthenticationService", function($http, $rootScope, ErrorMessage, $localStorage, $mdToast, $mdDialog, $location, $timeout){
   var service = {};
   service.Login = Login;
   service.Logout = Logout;
   service.checkAuthentication = checkAuthentication;

   return service;

   function Login(email, password, callback) {
      try {
         $rootScope.isLoading = true;
         firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
            console.log(user);
            console.log('uid',user.uid);
            $timeout(function(){
               $rootScope.isLoading = false;
               $location.path('/dashboard');
            }, 0);
            $localStorage.currentUser = {
               email: email,
               uid: user.uid
            };
         }).catch(function(error) {
            // if(error.code.indexOf('wrong-password') != -1) 
            // var errorCode = error.code;
            // var errorMessage = error.message;
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Error: '+error.code+' Something Went Wrong', error.message);
            // $mdDialog.show(
            // $mdDialog.alert()
            //    .clickOutsideToClose(false)
            //    .title('Something went wrong!')
            //    .textContent(errorMessage)
            //    .ariaLabel('Something went wrong.')
            //    .ok('OK!')
            // );
         });
      }
      catch(error) {
         var msg = 'Unhandled Exception';
         $rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
      }
   }

   function Logout(){
      try {
         $rootScope.isLoading = true;
         console.log($localStorage);
         if($localStorage.currentUser){
            firebase.auth().signOut().then(function() {
               console.log('Sign-out successful.');
               delete $localStorage.currentUser;
               console.log($localStorage);
            }, function(error) {
               if(error) {
                  var msg = 'Unhandled Exception';
                  $rootScope.isLoading = false;
                  ErrorMessage.showMessage('Something Went Wrong', msg);
                  console.error(error);
               }
            });
         }
         delete $localStorage.currentUser;
         $http.defaults.headers.common.uid = '';
         $rootScope.isLoading = false;
      }
      catch(error) {
         var msg = 'Unhandled Exception';
         $rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
      }
   }

   function checkAuthentication(){
      try {
         firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
               console.log("yes login");
               console.log(user);
               console.log(user.uid);
            } else {
               console.log("no login");
               $location.path("/login");
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
});
