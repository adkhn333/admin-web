app.controller("developerListCtrl", ['$scope', '$http', '$mdToast', '$mdDialog', 'DeveloperService', function($scope, $http, $mdToast, $mdDialog, DeveloperService){

   dev_list = DeveloperService.getAllDevelopersRequest();
   console.log(dev_list);
   dev_list.then(function(alldevelopers){
   	  console.log(alldevelopers);
      $scope.devList = alldevelopers;
      // console.log($scope.devList);
   });
}]);
