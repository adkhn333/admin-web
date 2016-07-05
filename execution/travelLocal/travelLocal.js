    

app.controller("travelLocalCtrl", function($scope, $q, $timeout, $filter, $firebaseArray, $mdDialog,$stateParams,$localStorage) {
    $scope.activityId = $stateParams.activityId;
    console.log($scope.activityId);
    var userid =  $localStorage.currentUser.uid;
    console.log(userid);

    $scope.date=new Date();
    var dates = $filter('date')($scope.date, 'dd-MM-yy');

    function getActivitydetails() {
        console.log('/activity/' + userid + '/'+dates+'/' + $scope.activityId);       
        firebase.database().ref('/activity/' + userid + '/'+dates+'/' + $scope.activityId).on('value', function(snapshot) {
            $scope.actDetails = snapshot.val();
            console.log($scope.actDetails);
            $scope.planningDetails = $scope.actDetails.planning;
            $scope.comments=$scope.actDetails.comments;
             $timeout(function() {
             checkIfActivityStarted();
           }, 50); 
           
        });
    };
    

    getActivitydetails();

   function checkIfActivityStarted() { 
        console.log("check");
        //in execution
        if($scope.actDetails.planning.active == true) {
            console.log("dd");
           
                $scope.toggle = "Start Activity";
        
           
        } else {
            
             
            if ($scope.actDetails.summary.status == "started") {
               
                    $scope.toggle = "End Activity";
                
            } else if ($scope.actDetails.summary.status == "completed") {
              
                    $scope.toggle = "Completed";
              
               
            }
            else if ($scope.actDetails.summary.status == "cancelled") {
             
                    $scope.toggle = "Cancelled";
               
                
            }
        }
    };


    $scope.startActivity = function(foo) {       
         if ($scope.actDetails.planning.active ==true) {
            upd = {};
           
            upd['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/planning/active'] = "false";
            console.log("saved as false");
        
            firebase.database().ref().update(upd);
        }

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
               
                    $scope.latitude = position.coords.latitude;
                    $scope.longitude = position.coords.longitude;
                    $scope.time = position.timestamp;
                    executionComp = {
                        "lat": $scope.latitude,
                        "lng": $scope.longitude,
                        "time": $scope.time
                    };

                if ($scope.toggle == "Start Activity") {

                 $mdDialog.show(
                  $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Activity started !!')
                    .textContent('Fill the summary now')
                    .ariaLabel('Alert Dialog')
                    .ok('Got it!')
                );
               
                    //send lat ,lang n time
                    $scope.startLatitude = $scope.latitude;
                    $scope.startLongitude = $scope.longitude;
                    $scope.startTime = $scope.time;
                    console.log($scope.latitude);

           
                    updates = {};
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/start'] = executionComp;
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "started";
                    firebase.database().ref().update(updates);
                                      
                    $scope.toggle = "End Activity";
                
                   
        } else if ($scope.toggle == "End Activity") {

                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Activity completed !!')
                        .textContent('Go to another activity now')
                        .ariaLabel('Alert Dialog')
                        .ok('Got it!')
                    );
                
                    console.log(foo);
                    console.log(executionComp);
                    $scope.endLatitude = $scope.latitude;
                    $scope.endLongitude = $scope.longitude;
                    $scope.endTime = $scope.time;
                    console.log(foo.mode);
                    updates = {};
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/end'] = executionComp;
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "completed";
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/mode'] = foo.mode;
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/remark'] = foo.remark;
                    firebase.database().ref().update(updates);
                    $scope.toggle = "Completed";

         } else if ($scope.toggle == "Completed") {
                 $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Activity completed !!')
                        .textContent('You can now start next activity')
                        .ariaLabel('Alert Dialog')
                        .ok('Got it!')
                    );
                
         } 
               

                }, function() {
                    
                });
            } else {
               
            }
       

      

        };

    $scope.cancel = function() {
        if($scope.actDetails.summary.status=="")
        {
             upd = {};
            upd['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "cancelled";
            firebase.database().ref().update(upd);
            alert(" cancelled !!");
        }
        else {
            alert("cannot cancel !!");
        } 
   
    };
   //comments
    $scope.add_comment = function(com) {
        console.log("adding comment");
        up = {};
        console.log(com);
        com.userid = userid;
        com.name = localStorage.getItem("username");
        com.time = new Date();
        var newkey=firebase.database().ref('/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/comments').push().key;
        up['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/comments/' + newkey] = com;
        firebase.database().ref().update(up);


    };

});