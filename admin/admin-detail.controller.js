app.controller("adminDetailCtrl", ['$scope', '$rootScope', 'ErrorMessage', '$stateParams', '$http', '$location', '$mdSidenav', '$localStorage', '$mdToast', '$mdDialog', 'AdminService', function($scope, $rootScope, ErrorMessage, $stateParams, $http, $location, $mdSidenav, $localStorage, $mdToast, $mdDialog, AdminService){

   $scope.emailid = $localStorage.currentUser.email;
   $scope.id = $stateParams.adminId;
   // console.log($scope.id);
   $scope.admin = [];
   // console.log($scope.id);

   // get data of the particular admin
   $rootScope.isLoading = true;
   try {
      var ref = db.ref().child("admins").child($scope.id);
      ref.once("value", function(snapshot){
         $scope.admin = snapshot.val();
         // console.log($scope.admin);
      }, function(error){
         // console.log(error);
         if(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
         }
      });
   }
   catch(error) {
      var msg = 'Unhandled Exception';
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', msg);
      console.error(error);
   }

   try {
      // TODO: check whether getting distinct designations from server is better or directly
      list_service = AdminService.getAllAdminDetailsRequest();
      // console.log(list_service);
      list_service.then(function(alladminlist) {
         $scope.alladminlist = alladminlist;
         // console.log(alladminlist);
         $scope.allDesignationsList = [];
         for(var i=0; i<alladminlist.length; i++){
            // console.log(alladminlist[i].designation);
            if($scope.allDesignationsList.indexOf(alladminlist[i].designation) == -1 && alladminlist[i].designation != undefined){
               $scope.allDesignationsList.push(alladminlist[i].designation);
            }
         }
         // console.log($scope.allDesignationsList);
      });
   }
   catch(error) {
      var msg = 'Unhandled Exception';
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', msg);
      console.error(error);
   }

   var old_marketing, old_validation, new_marketing, new_validation;

   $scope.$watch('admin.marketingManager', function(newValue, oldValue){
      new_marketing = newValue;
      old_marketing = oldValue;
   });
   $scope.$watch('admin.validationManager', function(newValue, oldValue){
      new_validation = newValue;
      old_validation = oldValue;
   });
   $scope.enterAdminPostionDetails = function(){
      try {
         var posObject = {
            adminId: $scope.id,
            team: $scope.admin.team,
            employeeNumber: $scope.admin.employeeNumber,
            designation: $scope.admin.designation,
            marketingManager: $scope.admin.marketingManager,
            validationManager: $scope.admin.validationManager,
            current_city: '1',
            trackingId: $localStorage.currentUser.uid
         }
         console.log(posObject);
         var ref = db.ref().child("admins").child($scope.id);
         ref.update(posObject, function(error) {
            if(error) {
               var msg = 'Unhandled Exception';
               $rootScope.isLoading = false;
               ErrorMessage.showMessage('Something Went Wrong', msg);
               console.error(error);
            }
         });

         var marketing_updates = {};
         marketing_updates['/admins/' + $scope.admin.marketingManager + '/managerFor/marketing/' + $scope.id] = true;
         db.ref().update(marketing_updates, function(error) {
            if(error) {
               var msg = 'Unhandled Exception';
               $rootScope.isLoading = false;
               ErrorMessage.showMessage('Something Went Wrong', msg);
               console.error(error);
            }
         });

         var data_validation_updates = {};
         data_validation_updates['/admins/' + $scope.admin.validationManager + '/managerFor/dataValidation/' + $scope.id] = true;
         db.ref().update(data_validation_updates, function(error) {
            if(error) {
               var msg = 'Unhandled Exception';
               $rootScope.isLoading = false;
               ErrorMessage.showMessage('Something Went Wrong', msg);
               console.error(error);
            }
         });

         if(old_marketing != undefined){
            console.log(old_marketing);
            var old_marketing_updates = {};
            old_marketing_updates['/admins/' + old_marketing + '/managerFor/marketing/' + $scope.id] = false;
            db.ref().update(old_marketing_updates, function(error) {
               if(error) {
                  var msg = 'Unhandled Exception';
                  $rootScope.isLoading = false;
                  ErrorMessage.showMessage('Something Went Wrong', msg);
                  console.error(error);
               }
            });
         }

         if(old_validation != undefined){
            var old_data_validation_updates = {};
            old_data_validation_updates['/admins/' + old_validation + '/managerFor/dataValidation/' + $scope.id] = false;
            db.ref().update(old_data_validation_updates, function(error) {
               if(error) {
                  var msg = 'Unhandled Exception';
                  $rootScope.isLoading = false;
                  ErrorMessage.showMessage('Something Went Wrong', msg);
                  console.error(error);
               }
            });
         }
      }
      catch(error) {
         var msg = 'Unhandled Exception';
         $rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
      }
   };

   // function getAllCities(){
   //    $http({
   //       method: 'GET',
   //       url: 'http://139.162.3.205/api/getLocationDetails'
   //    })
   //    .then(function successCallback(response){
   //       if(response.data.StatusCode == '200'){
   //          $scope.allCities = response.data.Items;
   //          // console.log($scope.allCities);
   //       }
   //       else{
   //          $mdToast.show(
   //             $mdToast.simple()
   //               .textContent(data.Message)
   //               .hideDelay(3000)
   //          );
   //       }
   //    }, function errorCallback(response){
   //       console.log("Error in callback get cities");
   //    });
   // }
   //
   // getAllCities();

}]);
