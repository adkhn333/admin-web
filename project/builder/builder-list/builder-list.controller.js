app.controller("builderListCtrl", ['$scope', '$rootScope', 'ErrorMessage', '$http', '$mdToast', '$mdDialog', 'BuilderService', function($scope, $rootScope, ErrorMessage, $http, $mdToast, $mdDialog, BuilderService){
   $rootScope.isLoading = true;
   try {
      dev_list = BuilderService.getAllBuildersRequest();
      console.log(dev_list);
      dev_list.then(function(allbuilders){
         console.log(allbuilders);
         $scope.devList = allbuilders;
         $rootScope.isLoading = false;
         // console.log($scope.devList);
      });
   }
   catch(error) {
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', 'Unhandled Exception');
      console.log(error);
   }
}]);
