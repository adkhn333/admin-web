app.controller("leaveCtrl", function($scope, $rootScope, ErrorMessage, $q, $timeout, $filter, $firebaseArray, $mdDialog, $http,$stateParams,$localStorage) {
    try {
        $scope.activityId = $stateParams.activityId;
        console.log($scope.activityId);
        var userid =  $localStorage.currentUser.uid;
        console.log(userid);

        $scope.date=new Date();
        var dates = $filter('date')($scope.date, 'dd-MM-yy');
    }
    catch(error) {
      var msg = 'Unhandled Exception';
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', msg);
      console.error(error);
    }

    function getActivitydetails() {
        try {
            console.log('/activity/' + userid + '/'+dates+'/' + $scope.activityId);       
            firebase.database().ref('/activity/' + userid + '/'+dates+'/' + $scope.activityId).on('value', function(snapshot) {
                $scope.actDetails = snapshot.val();
                $scope.planningDetails = $scope.actDetails.planning;
                console.log($scope.planningDetails);
                $scope.comments=$scope.actDetails.comments;
                
            }, function(error) {
                if(error) {
                    var msg = 'Unhandled Exception';
                    $rootScope.isLoading = false;
                    ErrorMessage.showMessage('Something Went Wrong', msg);
                    console.error(error);
                }
            });
        }
        catch(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
        }
       
    }
    $timeout(function() {
        checkIfActivityStarted();
    }, 5000); 

    getActivitydetails();

    function checkIfActivityStarted() { 
        console.log("check");
        //in execution
        if($scope.actDetails.planning.active == true) {
            console.log("dd");
            $scope.toggle = "Start Activity";
        } 
        else {
            console.log("s");
            if ($scope.actDetails.summary.status == "started") {
                $scope.toggle = "End Activity";
            } 
            else if ($scope.actDetails.summary.status == "completed") {
                $scope.toggle = "Completed";
            }
            else if ($scope.actDetails.summary.status == "cancelled") {
                $scope.toggle = "Cancelled";
            }
        }
    };

    $scope.startActivity = function(foo) {
        console.log("clicked");
        if ($scope.actDetails.planning.active == true) {
            upd = {};
            upd['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/planning/active'] = "false";
            console.log("saved as false");
            firebase.database().ref().update(upd);
        }
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
                                    
            $scope.time = position.timestamp;
            var date = new Date($scope.time*1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            console.log(formattedTime);
            executionComp = {
                time: $scope.time
            };

            if ($scope.toggle == "Start Activity") {

            //     $mdDialog.show(
            //     $mdDialog.alert()
            //     .clickOutsideToClose(true)
            //     .title('Activity started !!')
            //     .textContent('Fill the summary now')
            //     .ariaLabel('Alert Dialog')
            //     .ok('Got it!')
            // );
            ErrorMessage.showMessage('Activity Started !!', 'Fill The Summary Now');
            
            $scope.startTime = $scope.time;
            
            updates = {};
            updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/start'] = executionComp;
            updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "started";
            firebase.database().ref().update(updates, function(error){
                if(error) {
                    var msg = 'Unhandled Exception';
                    $rootScope.isLoading = false;
                    ErrorMessage.showMessage('Something Went Wrong', msg);
                    console.error(error);
                }
            });
            $scope.toggle = "End Activity";      
            } 
            else if ($scope.toggle == "End Activity") {

                // $mdDialog.show(
                //     $mdDialog.alert()
                //     .clickOutsideToClose(true)
                //     .title('Activity completed !!')
                //     .textContent('Go to another activity now')
                //     .ariaLabel('Alert Dialog')
                //     .ok('Got it!')
                // );
                ErrorMessage.showMessage('Activity Completed !!', 'Go To Another Activity Now');
                
                console.log(foo);
                console.log(executionComp);
            
                $scope.endTime = $scope.time;
                
                updates = {};
                updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/end'] = executionComp;
                updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "completed";
                updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/remark'] = foo.remark;
                firebase.database().ref().update(updates, function(error) {
                    if(error) {
                        var msg = 'Unhandled Exception';
                        $rootScope.isLoading = false;
                        ErrorMessage.showMessage('Something Went Wrong', msg);
                        console.error(error);
                    }
                });
                $scope.toggle = "Completed";

            } 
            else if ($scope.toggle == "Completed") {
                // $mdDialog.show(
                //     $mdDialog.alert()
                //     .clickOutsideToClose(true)
                //     .title('Activity already completed !!')
                //     .textContent('You can now start next activity')
                //     .ariaLabel('Alert Dialog')
                //     .ok('Got it!')
                // );
                ErrorMessage.showMessage('Activity Already Completed !!', 'You Can Now Start Next Activity');
            } 
        }, function(error) {
            if(error) {
                var msg = 'Unhandled Exception';
                $rootScope.isLoading = false;
                ErrorMessage.showMessage('Something Went Wrong', msg);
                console.error(error);
            }
        });
    };

    $scope.cancel = function() {
        try {
            if($scope.actDetails.summary.status!="started" && $scope.actDetails.summary.status!="completed")
            {
                upd = {};
                upd['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "cancelled";
                firebase.database().ref().update(upd);
                alert(" cancelled !!");
            }
            else {
                alert("cannot cancel !!");
            } 
        }
        catch(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
        }
    };

    $scope.add_comment = function(com) {
        try {
            console.log("adding comment");
            up = {};
            console.log(com);
            com.userid = userid;
            com.name = localStorage.getItem("username");
            com.time = new Date();
            var newkey=firebase.database().ref('/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/comments').push().key;
            up['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/comments/' + newkey] = com;
            firebase.database().ref().update(up, function(error) {
                if(error) {
                    var msg = 'Unhandled Exception';
                    $rootScope.isLoading = false;
                    ErrorMessage.showMessage('Something Went Wrong', msg);
                    console.error(error);
                }
            });
        }
        catch(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
        }
    };

});