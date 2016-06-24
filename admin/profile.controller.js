app.controller("profileCtrl", ['$scope', '$location', '$localStorage', '$http', '$mdSidenav', '$mdToast', '$mdDialog', '$timeout', function($scope, $location, $localStorage, $http, $mdSidenav, $mdToast, $mdDialog, $timeout) {
   if($localStorage.currentUser){
      var emailid = $localStorage.currentUser.email;
      var uid = $localStorage.currentUser.uid;

      var profile = db.ref('admins/'+uid);
      profile.on("value", function(snapshot){
         $timeout(function () {
            $scope.admin = snapshot.val();
            console.log($scope.admin);
         }, 0);
      });

      $scope.updateDetails = function(){

         console.log($scope.admin.dob);
         var tzoffset = (new Date($scope.admin.dob)).getTimezoneOffset() * 60000;
         console.log(tzoffset);

         // console.log($scope.admin.dob.toISOString());
         // var birthdate = $scope.admin.dob.toISOString().split('T')[0];
         // console.log(birthdate);

         var localISOTime = (new Date(new Date($scope.admin.dob).getTime() - tzoffset)).toISOString();

         console.log(localISOTime);
         console.log(localISOTime.split('T')[0]);
         finalTime = localISOTime.split('T')[0];


         var adminObject = {
            mobile: $scope.admin.mobile,
            alt_mob: $scope.admin.alt_mob,
            city: $scope.admin.city,
            address: $scope.admin.address,
            dob: finalTime,
            gender: $scope.admin.gender
         }
         console.log(adminObject);
         var updates = {};
         updates['admins/'+uid] = adminObject;
         db.ref().update(updates);
      }
   }
}]);
