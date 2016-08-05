app
.controller('clubHouseDetailsCtrl', function($scope, $rootScope, ErrorMessage, $mdpTimePicker, $filter) {
    $scope.submit = function(clubhouse) {
      try {
        $rootScope.isLoading = true;
        var key=$localStorage.key;
        var city=$localStorage.city;
        var zone=$localStorage.zone;
        firebase.database().ref('/protectedResidential/'+city+'/projects/'+key+'/1-1').update({
            clubhouse
        },function(error) {
          if(error) {
            var msg = 'Unhandled Exception';
            if(error.stack.indexOf('undefined') != -1) msg = 'One Or More Necessary Value Is Empty';
            // $rootScope.isLoading = false;
            LoadingIndicatorService.loadingEnd();
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
          }
        });
      }
      catch(error) {
        if(error) {
          var msg = 'Unhandled Exception';
          if(error.stack.indexOf('undefined') != -1) msg = 'One Or More Necessary Value Is Empty';
          // $rootScope.isLoading = false;
          LoadingIndicatorService.loadingEnd();
          ErrorMessage.showMessage('Something Went Wrong', msg);
          console.error(error);
        }
      }
    };
    
    $scope.showTimePicker = function(event, obj) {
      $mdpTimePicker($scope.clubhouse.operatingTimes.start, {
        targetEvent: event
      }).then(function(selectedTime) {
        $scope.clubhouse.operatingTimes[obj] = $filter('date')(selectedTime, 'hh:mm a');
      })
    }
})
;