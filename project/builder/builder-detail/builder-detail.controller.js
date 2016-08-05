app.controller("detailBuilderCtrl", ['$scope', '$rootScope', 'ErrorMessage', '$stateParams', '$timeout', function($scope, $rootScope, ErrorMessage, $stateParams, $timeout){
   $scope.id = $stateParams.builderId;
   try {
      $rootScope.isLoading = true;
      var ref = db.ref().child("builders").child($scope.id);
      ref.on('value', function(snapshot) {
          $timeout(function() {
            console.log(snapshot.val());
            $scope.builder = snapshot.val();
          }, 0);
          $rootScope.isLoading = false;
      }, function(error) {
          if(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
         }
          // $mdDialog.show(
          //   $mdDialog.alert()
          //   .clickOutsideToClose(false)
          //   .title('Something went wrong!')
          //   .textContent('Please refresh the page.')
          //   .ariaLabel('Something went wrong.')
          //   .ok('OK!')
          // );
      });
   }
   catch(error) {
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', 'Unhandled Exception');
      console.log(error);
   }

   $scope.updateBuilder = function(form) {
      try {
        var devObj = {
          name: $scope.builder.name,
          address1: $scope.builder.address1,
          address2: $scope.builder.address2,
          landmark: $scope.builder.landmark,
          city: $scope.builder.city,
          about: $scope.builder.about,
          established: $scope.builder.established,
          areaConstructed: $scope.builder.areaConstructed,
          email: $scope.builder.email,
          website: $scope.builder.website,
          mobile: $scope.builder.mobile,
          altMob: $scope.builder.altMob || ''
        }
        console.log(devObj);
        ref.update(devObj, function(error) {
          if(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
         }
        });
        //TODO: error handling
      }
      catch(error) {
        $rootScope.isLoading = false;
        ErrorMessage.showMessage('Something Went Wrong', 'Unhandled Exception');
        console.log(error);
      }
   }
}]);
