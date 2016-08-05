app.controller("DataEntryCtrl", function($scope, $rootScope, ErrorMessage, $state, $timeout,$filter, $cordovaGeolocation, $ionicPopup, $localStorage) {
    try {
        $scope.activityId = $state.params.activityId; 
        console.log( $scope.activityId);
        var userid =  localStorage.getItem('uid');
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
            firebase.database().ref('/activity/' + userid + '/'+dates+'/' + $scope.activityId).on('value', function(snapshot) {
                $scope.actDetails = snapshot.val();
                console.log($scope.actDetails);
                $scope.planningDetails = $scope.actDetails.planning;
                console.log($scope.planningDetails.cityId);
                $scope.comments=$scope.actDetails.comments;
                $timeout(function(){
                    checkIfActivityStarted();
                },100);
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
    };

    getActivitydetails();

    function checkIfActivityStarted() { 
        console.log("check");
        //in execution
        if($scope.actDetails.planning.active == true) {
            $scope.toggle = "Start Activity";
           
        } else {
             
            if ($scope.actDetails.summary.status == "started")
                $scope.toggle = "End Activity";
            else if ($scope.actDetails.summary.status == "completed")
                $scope.toggle = "Completed";
            else if ($scope.actDetails.summary.status == "cancelled")
                $scope.toggle = "Cancelled";
        }
    };

    $scope.data_entry=function() {
        try {
            console.log($scope.planningDetails.cityId);
            localStorage.setItem("cityid",$scope.planningDetails.cityId);
            localStorage.setItem("projectid",$scope.planningDetails.projectId);
            $state.go('project-basic-details');
        }
        catch(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
        }
    };

    $scope.startActivity = function(foo) {
        try {
            console.log(foo);
            console.log("clicked");
        
            if ($scope.actDetails.planning.active ==true) {
                
                upd = {};
            
                upd['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/planning/active'] = "false";
                console.log("saved as false");
            
                firebase.database().ref().update(upd);
            }

            
            var posOptions = {
                timeout: 10000,
                enableHighAccuracy: false
            };
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function(position) {
                    $scope.latitude = position.coords.latitude;
                    $scope.longitude = position.coords.longitude;
                    $scope.time = position.timestamp;

                    console.log($scope.latitude);
                    console.log($scope.longitude);
                    console.log($scope.time);
                    executionComp = {
                        "lat": $scope.latitude,
                        "lng": $scope.longitude,
                        "time": $scope.time
                    };

                    if ($scope.toggle == "Start Activity") {
                        $ionicPopup.alert({
                            title: "Activity started !!",
                            template: 'Fill the summary now :)'
                        });

                        //send lat ,lang n time
                        $scope.startTime = $scope.time;

                        console.log(executionComp);
                        updates = {};
                        updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/start'] = executionComp;
                        updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "started";
                        firebase.database().ref().update(updates);
                                        
                        $scope.toggle = "End Activity";
                    
                    } 
                    else if ($scope.toggle == "End Activity") {
                        $ionicPopup.alert({
                        title: "Activity completed !!",
                        template: 'Go to another activity now :)'
                        });
                        //send lat,long and time
                        console.log(foo);
                        console.log(executionComp);
                        $scope.endTime = $scope.time;
                        //console.log(foo.mode);
                        updates = {};
                        updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/end'] = executionComp;
                        updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "completed";
                        updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/remark'] = foo.remark;
                        firebase.database().ref().update(updates);
                        $scope.toggle = "Completed";
                    }
                    else if ($scope.toggle == "Completed") {
                        $ionicPopup.alert({
                            title: "Already completed !!",
                            template: 'You can now start next activity :)'
                        });
                    } 

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
    };

    $scope.cancel = function() {
        try {
            if($scope.actDetails.summary.status=="")
            {
                upd = {};
                upd['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "cancelled";
                firebase.database().ref().update(upd, function(error) {
                    if(error) {
                        var msg = 'Unhandled Exception';
                        $rootScope.isLoading = false;
                        ErrorMessage.showMessage('Something Went Wrong', msg);
                        console.error(error);
                    }
                });
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