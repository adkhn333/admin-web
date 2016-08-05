app.controller('tasksCtrl',  function($scope, $rootScope, ErrorMessage, $filter, $firebaseArray,$state){
    console.log("running");
    $rootScope.isLoading = true;

    try {
        $scope.date = new Date();
        var dates = $filter('date')($scope.date, 'dd-MM-yy');
    }
    catch(error) {
      var msg = 'Unhandled Exception';
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', msg);
      console.error(error);
    }

    console.log('/activity/' + 'lAZxYUXSPHTFi3HreIRc58g1ZjE2' + '/' + dates);

	function getActivities() {
        var ref = firebase.database().ref('/activity/' + 'aIwD2qBi2qe5PdHYBmWNgN9gQhi2' + '/' + dates);
        return $firebaseArray(ref);
    };

    getActivities().$loaded().then(function(obj) {
        $scope.activities = obj;
        $rootScope.isLoading = false;
        console.log($scope.activities);
    });
    
    console.log($scope.activities);

    $scope.myFunc = function(x,y) {
        try {
            console.log(x);
            console.log(y);
            // if (x == "appoitment")
            //       $state.go('appointment', {
            //           activityId: y
            //       });
            if (x == "phoneCalls")
                $state.go('phoneCalls',{activityId: y});
            else if (x == "leave")
                $state.go('leave',{activityId: y} );
            else if (x == "DataEntry")
                $state.go('dataEntry',{activityId: y});
            else if (x == "localTravel")
                $state.go('travelLocal',{activityId: y});
            else if (x == "OutstationTravel")
                $state.go('travelOutstation',{activityId: y});
            //   else if (x == 'Email')
            //       $state.go('email', {
            //           activityId: y
            //       });
            //   else if (x == "onlineResearch")
            //       $state.go('online_research', {
            //           activityId: y
            //       });
            //   else if (x == "leave")
            //       $state.go('leave', {
            //           activityId: y
            //       });
            //   else if (x == 'DataEntry')
            //       $state.go('data_entry', {
            //           activityId: y
            //       });
            //   else if (x == 9)
            //       $state.go('meeting', {
            //           activityId: y
            //       });
            //   else if (x == 10)
            //       $state.go('training', {
            //           activityId: y
            //       });
            //   else if (x == 11)
            //       $state.go('planning', {
            //           activityId: y
            //       });
            //   else if (x == 12)
            //       $state.go('break', {
            //           activityId: y
            //       });
            //   else if (x == 13)
            //       $state.go('others', {
            //           activityId: y
            //       });
            //   else if (x == 14) //end day
            //       $state.go('timeline1', {
            //       activityId: y
            //   });
        }
        catch(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
        }
    }
});
