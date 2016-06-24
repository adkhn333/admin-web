app.factory("AuthenticationService", function($http, $localStorage, $mdToast, $mdDialog, $location, $timeout){
   var service = {};
   service.Login = Login;
   service.Logout = Logout;
   service.checkAuthentication = checkAuthentication;

   return service;

   function Login(email, password, callback){
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
         console.log(user);
         console.log('uid',user.uid);
         $timeout(function(){
            $location.path('/dashboard');
         }, 0);
         $localStorage.currentUser = {
            email: email,
            uid: user.uid
         };
      }).catch(function(error) {
         var errorCode = error.code;
         var errorMessage = error.message;
         $mdDialog.show(
         $mdDialog.alert()
            .clickOutsideToClose(false)
            .title('Something went wrong!')
            .textContent(errorMessage)
            .ariaLabel('Something went wrong.')
            .ok('OK!')
         );
      });
   }

   function Logout(){
      console.log($localStorage);
      if($localStorage.currentUser){
         firebase.auth().signOut().then(function() {
            console.log('Sign-out successful.');
            delete $localStorage.currentUser;
            console.log($localStorage);
         }, function(error) {
            console.log("error");
         });
      }
      delete $localStorage.currentUser;
      $http.defaults.headers.common.uid = '';
   }

   function checkAuthentication(){
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
});
