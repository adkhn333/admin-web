app.controller("teamDetailCtrl", ['$scope', '$http', '$stateParams', '$mdDialog', '$mdToast', '$localStorage', '$location', '$mdSidenav', 'AdminService', function($scope, $http, $stateParams, $mdDialog, $mdToast, $localStorage, $location, $mdSidenav, AdminService){

   $scope.setStatusFilter = function(statusValue) {
      $scope.showStatus = statusValue;
      $scope.statusFilter = function(item) {
         if(statusValue==='All')
            return true;
         return item.status === statusValue;
      };
   };

   console.log($stateParams.name);
   $scope.team_name = $stateParams.name;
   $scope.team = [];

   list_service = AdminService.getAllAdminDetailsRequest();
   // console.log(list_service);
   list_service.then(function(alladminlist){
      $scope.adminlist = [];
      for(var i = 0; i<alladminlist.length;i++){
         if(alladminlist[i].team == $scope.team_name){
            $scope.adminlist.push(alladminlist[i]);
         }
      }
      console.log($scope.adminlist);
   });


}]);
