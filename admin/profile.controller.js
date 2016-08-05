app.controller("profileCtrl", ['$scope', '$rootScope', '$location', '$localStorage', '$http', '$mdSidenav', '$mdToast', '$mdDialog', '$timeout', function($scope, $rootScope, $location, $localStorage, $http, $mdSidenav, $mdToast, $mdDialog, $timeout) {

   if($localStorage.currentUser) {
      try {
         var emailid = $localStorage.currentUser.email;
         var uid = $localStorage.currentUser.uid;

         var profile = db.ref('admins/'+uid);
         profile.on("value", function(snapshot){
            $timeout(function () {
               $scope.admin = snapshot.val();
               // Below Line is Used To Override Default String value of 'dob'
               // into a proper Javascript Date Model for md-date-picker
               $scope.admin['dob'] = new Date(snapshot.val().dob);
               console.log($scope.admin);
            }, 0);
         });
      }
      catch(error) {
         var msg = 'Unhandled Exception';
         $rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
      }

      $scope.updateDetails = function() {
         try {
            $rootScope.isLoading = true;

            // console.log($scope.admin.dob);
            // var tzoffset = (new Date($scope.admin.dob)).getTimezoneOffset() * 60000;
            // console.log(tzoffset);

            // console.log($scope.admin.dob.toISOString());
            // var birthdate = $scope.admin.dob.toISOString().split('T')[0];
            // console.log(birthdate);

            // var localISOTime = (new Date(new Date($scope.admin.dob).getTime() - tzoffset)).toISOString();
            //
            // console.log(localISOTime);
            // console.log(localISOTime.split('T')[0]);
            // finalTime = localISOTime.split('T')[0];

            console.log($scope.admin.dob);

            var adminObject = {
               mobile: $scope.admin.mobile,
               altMob: $scope.admin.altMob,
               city: $scope.admin.city,
               address: $scope.admin.address,
               // dob is explicitly converted to string to remove the invalid date format error
               dob: $scope.admin.dob.toString(),
               // dob: finalTime,
               gender: $scope.admin.gender
            }
            console.log(adminObject);
            var updates = {};
            updates['admins/'+uid] = adminObject;
            db.ref().update(updates, function(error) {
               if(error) {
                  var msg = 'Unhandled Exception';
                  $rootScope.isLoading = false;
                  ErrorMessage.showMessage('Something Went Wrong', msg);
                  console.error(error);
               }
            });
            $rootScope.isLoading = false;
         }
         catch(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
         }
      }
   }
}]);
