app.controller("nearbyListCtrl", ['$scope', '$rootScope', 'ErrorMessage', '$firebaseArray', function($scope, $rootScope, ErrorMessage, $firebaseArray){
   try {
      $rootScope.isLoading = true;
      var getcity = db.ref("city");
      $firebaseArray(getcity).$loaded().then(function(obj) {
         $scope.cities = obj;
         $rootScope.isLoading = false;
      });
   }
   catch(error) {
      var msg = 'Unhandled Exception';
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', msg);
      console.error(error);
   }

   $scope.submitCity = function(obj){
      try {
         $rootScope.isLoading = true;
         var nearbyList = db.ref("nearby/"+$scope.selectedCity);
         $firebaseArray(nearbyList).$loaded().then(function(obj){
            console.log(obj);
            $scope.nearbyList = obj;
            $rootScope.isLoading = false;
         }); 
      }
      catch(error) {
         var msg = 'Unhandled Exception';
         $rootScope.isLoading = false;
         ErrorMessage.showMessage('Something Went Wrong', msg);
         console.error(error);
      }  
   }
}]);
