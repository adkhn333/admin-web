app.controller("builderListCtrl", ['$scope', '$http', '$mdToast', '$mdDialog', 'BuilderService', function($scope, $http, $mdToast, $mdDialog, BuilderService){

   dev_list = BuilderService.getAllBuildersRequest();
   console.log(dev_list);
   dev_list.then(function(allbuilders){
   	  console.log(allbuilders);
      $scope.devList = allbuilders;
      // console.log($scope.devList);
   });
}]);
