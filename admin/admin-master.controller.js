app.controller("adminMasterCtrl", ['$scope', '$location', '$http', '$mdToast', '$mdDialog', '$localStorage', '$mdSidenav', 'AdminService', '$firebaseArray', '$timeout', function($scope, $location, $http, $mdToast, $mdDialog, $localStorage, $mdSidenav, AdminService, $firebaseArray, $timeout){
   if($localStorage.currentUser){
      $scope.emailid = $localStorage.currentUser.email;
      // console.log($scope.emailid);

      list_service = AdminService.getAllAdminDetailsRequest();
      // console.log(list_service);
      list_service.then(function(alladminlist){
         $scope.adminlist = alladminlist;
         console.log($scope.adminlist);
      });

      // var ref = db.ref().child("admins");
      // $scope.adminlist = $firebaseArray(ref);
      // $scope.$watch('adminlist', function (){});
      // console.log($scope.adminlist);

      $scope.setStatusFilter = function(statusValue) {
         $scope.showStatus = statusValue;
         $scope.statusFilter = function(item) {
            if(statusValue==='All')
               return true;
            return item.status === statusValue;
         };
      };
      $scope.AddNewAdmin = function(){
         // console.log($scope.fullname);
         // console.log($scope.email);
         var adminObject = {
            fname: $scope.firstname,
            lname: $scope.lastname,
            email: $scope.email,
            tracking_id: $localStorage.currentUser.uid // uid of admin who added the new admin
         }
         console.log(adminObject);

         // add status to admin object
         $http.post("http://139.162.3.205/api/addNewAdmin", adminObject)
            .success(function(data){
               console.log(data);
               if(data.StatusCode == '200'){
                  $mdToast.show(
                     $mdToast.simple()
                     .textContent('User Inserted Successfully')
                     .hideDelay(3000)
                  );
                  $scope.adminlist.push({
                     fname: $scope.firstname,
                     lname: $scope.lastname,
                     email: $scope.email
                  });

                  // reset form
                  $scope.firstname = '';
                  $scope.lastname = '';
                  $scope.email = '';
                  $scope.addAdminForm.$setPristine();
                  $scope.addAdminForm.$setUntouched();
               }
               else{
                  $mdToast.show(
                     $mdToast.simple()
                     .textContent(data.Message)
                     .hideDelay(3000)
                  );
               }
            })
            .error(function(data){
               $mdDialog.show(
                  $mdDialog.alert()
                  .clickOutsideToClose(false)
                  .title('Something went wrong!')
                  .textContent('Please refresh the page.')
                  .ariaLabel('Something went wrong.')
                  .ok('OK!')
               );
            });
      }
   }
}]);
