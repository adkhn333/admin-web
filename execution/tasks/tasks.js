app.controller('tasksCtrl',  function($scope, $filter, $firebaseArray,$state){
   console.log("running");

	$scope.date = new Date();
    var dates = $filter('date')($scope.date, 'dd-MM-yy');

    console.log('/activity/' + 'lAZxYUXSPHTFi3HreIRc58g1ZjE2' + '/' + dates);


	function getActivities() {
        var ref = firebase.database().ref('/activity/' + 'aIwD2qBi2qe5PdHYBmWNgN9gQhi2' + '/' + dates);
        return $firebaseArray(ref);
    };

    $scope.activities = getActivities();
    console.log($scope.activities);

    $scope.myFunc = function(x,y)
    {
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
});
