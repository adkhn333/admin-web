app.controller("adminDetailCtrl", ['$scope', '$stateParams', '$http', '$location', '$mdSidenav', '$localStorage', '$mdToast', '$mdDialog', 'AdminService', function($scope, $stateParams, $http, $location, $mdSidenav, $localStorage, $mdToast, $mdDialog, AdminService){

   $scope.emailid = $localStorage.currentUser.email;
   $scope.id = $stateParams.admin_id;
   // console.log($scope.id);
   $scope.admin = [];
   // console.log($scope.id);

   // get data of the particular admin
   var ref = db.ref().child("admins").child($scope.id);
   ref.once("value", function(snapshot){
      $scope.admin = snapshot.val();
      // console.log($scope.admin);
   }, function(errorObject){
      // console.log(errorObject);
   });

   // TODO: check whether getting distinct designations from server is better or directly
   list_service = AdminService.getAllAdminDetailsRequest();
   // console.log(list_service);
   list_service.then(function(alladminlist){
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

   var old_marketing, old_validation, new_marketing, new_validation;

   $scope.$watch('admin.marketing_manager', function(newValue, oldValue){
      new_marketing = newValue;
      old_marketing = oldValue;
   });
   $scope.$watch('admin.validation_manager', function(newValue, oldValue){
      new_validation = newValue;
      old_validation = oldValue;
   });
   $scope.enterAdminPostionDetails = function(){
      var posObject = {
         admin_id: $scope.id,
         team: $scope.admin.team,
         employee_number: $scope.admin.employee_number,
         designation: $scope.admin.designation,
         marketing_manager: $scope.admin.marketing_manager,
         validation_manager: $scope.admin.validation_manager,
         current_city: '1',
         tracking_id: $localStorage.currentUser.uid
      }
      console.log(posObject);
      var ref = db.ref().child("admins").child($scope.id);
      ref.update(posObject);

      var marketing_updates = {};
      marketing_updates['/admins/' + $scope.admin.marketing_manager + '/managerFor/marketing/' + $scope.id] = true;
      db.ref().update(marketing_updates);

      var data_validation_updates = {};
      data_validation_updates['/admins/' + $scope.admin.validation_manager + '/managerFor/dataValidation/' + $scope.id] = true;
      db.ref().update(data_validation_updates);

      if(old_marketing != undefined){
         console.log(old_marketing);
         var old_marketing_updates = {};
         old_marketing_updates['/admins/' + old_marketing + '/managerFor/marketing/' + $scope.id] = false;
         db.ref().update(old_marketing_updates);
      }

      if(old_validation != undefined){
         var old_data_validation_updates = {};
         old_data_validation_updates['/admins/' + old_validation + '/managerFor/dataValidation/' + $scope.id] = false;
         db.ref().update(old_data_validation_updates);
      }
   };

   // function getAllCities(){
   //    $http({
   //       method: 'GET',
   //       url: 'http://139.162.44.67/getLocationDetails'
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
