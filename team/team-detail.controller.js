app.controller("teamDetailCtrl", ['$scope', '$rootScope', 'ErrorMessage', '$http', '$stateParams', '$mdDialog', '$mdToast', '$localStorage', '$location', '$mdSidenav', 'AdminService', function($scope, $rootScope, ErrorMessage, $http, $stateParams, $mdDialog, $mdToast, $localStorage, $location, $mdSidenav, AdminService){

   $scope.setStatusFilter = function(statusValue) {
      $scope.showStatus = statusValue;
      $scope.statusFilter = function(item) {
         if(statusValue==='All')
            return true;
         return item.status === statusValue;
      };
   };

   console.log($stateParams.name);
   $scope.teamName = $stateParams.name;
   $scope.team = [];

   $rootScope.isLoading = true;

   list_service = AdminService.getAllAdminDetailsRequest();
   // console.log(list_service);
   try {
      list_service.then(function(alladminlist){
         $rootScope.isLoading = false;
         $scope.adminlist = [];
         for(var i = 0; i<alladminlist.length;i++){
            if(alladminlist[i].team == $scope.teamName){
               $scope.adminlist.push(alladminlist[i]);
            }
         }
         console.log($scope.adminlist);
      });
   }
   catch(error) {
      if(error) {
         var msg = 'Unhandled Exception';
         $rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
      }
   }


}]);
