app.controller("travelOutstationCtrl", function($scope, $rootScope, ErrorMessage, $q, $timeout, $filter, $firebaseArray, $mdDialog,$stateParams,$localStorage) {
    var expanded = false;
    $scope.showCheckboxes=function() {
        console.log("showcheckbox called");
        var checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
        } else {
            checkboxes.style.display = "none";
            expanded = false;
        }
    }
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
                console.log($scope.actDetails);
                $scope.planningDetails = $scope.actDetails.planning;
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
    };
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
        if ($scope.actDetails.planning.active ==true) {
            upd = {}            
            upd['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/planning/active'] = "false";
            console.log("saved as false");        
            firebase.database().ref().update(upd, function(error) {
                if(error) {
                    var msg = 'Unhandled Exception';
                    $rootScope.isLoading = false;
                    ErrorMessage.showMessage('Something Went Wrong', msg);
                    console.error(error);
                }
            });
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

                    //  $mdDialog.show(
                    //   $mdDialog.alert()
                    //     .clickOutsideToClose(true)
                    //     .title('Activity started !!')
                    //     .textContent('Fill the summary now')
                    //     .ariaLabel('Alert Dialog')
                    //     .ok('Got it!')
                    // );
                    ErrorMessage.showMessage('Activity Started !!', 'Fill The Summary Now');
                
                    //send lat ,lang n time
                    $scope.startLatitude = $scope.latitude;
                    $scope.startLongitude = $scope.longitude;
                    $scope.startTime = $scope.time;
                    console.log($scope.latitude);
                    updates = {};
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/start'] = executionComp;
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "started";
                    firebase.database().ref().update(updates, function(error) {
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
                    $scope.endLatitude = $scope.latitude;
                    $scope.endLongitude = $scope.longitude;
                    $scope.endTime = $scope.time;
                    console.log(foo.mode);
                    updates = {};
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/end'] = executionComp;
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "completed";
                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/mode'] = foo.mode;
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
                    //     .title('Activity completed !!')
                    //     .textContent('You can now start next activity')
                    //     .ariaLabel('Alert Dialog')
                    //     .ok('Got it!')
                    // );
                    ErrorMessage.showMessage('Activity Completed !!', 'You Can Now Start Next Activity');
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
        else {
            // Browser doesn't support Geolocation
            //handleLocationError(false, infoWindow, map.getCenter());
        }
    };

    $scope.cancel = function() {
        try {
            if($scope.actDetails.summary.status=="") {
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
// app.controller("travelOutstationCtrl", function($scope, $q, $timeout, $filter, $firebaseArray, $mdDialog, $http) {
//     $scope.activityId = $stateParams.activityId;
//     console.log($scope.activityId);
//     var userid =  'lAZxYUXSPHTFi3HreIRc58g1ZjE2';
//     console.log(userid);

//     $scope.date=new Date();
//     var dates = $filter('date')($scope.date, 'dd-MM-yy');

//     function getActivitydetails() {
//         console.log('/activity/' + userid + '/'+dates+'/' + $scope.activityId);       
//         firebase.database().ref('/activity/' + userid + '/'+dates+'/' + $scope.activityId).on('value', function(snapshot) {
//             $scope.actDetails = snapshot.val();
//             console.log($scope.actDetails);
//             $scope.planningDetails = $scope.actDetails.planning;
//             $scope.comments=$scope.actDetails.comments;
            
//         });
//     };
//      $timeout(function() {
//              checkIfActivityStarted();
//         }, 5000); 

//     getActivitydetails();

//     function checkIfActivityStarted() { 
//         console.log("check");
//         //in execution
//         if($scope.actDetails.planning.active == true) {
//             console.log("dd");
           
//                 $scope.toggle = "Start Activity";
        
           
//         } else {
//             console.log("s");
             
//             if ($scope.actDetails.summary.status == "started") {
               
//                     $scope.toggle = "End Activity";
                
//             } else if ($scope.actDetails.summary.status == "completed") {
              
//                     $scope.toggle = "Completed";
              
               
//             }
//             else if ($scope.actDetails.summary.status == "cancelled") {
             
//                     $scope.toggle = "Cancelled";
               
                
//             }
//         }
//     };


//     $scope.startActivity = function(foo) {

//         console.log("clicked");
       
//          if ($scope.actDetails.planning.active ==true) {
//             //update the planning active false
//             //update the summary active true
//             upd = {};
           
//             upd['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/planning/active'] = "false";
//             console.log("saved as false");
        
//             firebase.database().ref().update(upd);
//         }

//           if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(function(position) {
//                 console.log(position);
//                 //$scope.$apply(function() {
//                     $scope.latitude = position.coords.latitude;
//                     $scope.longitude = position.coords.longitude;
//                     $scope.time = position.timestamp;
//                     executionComp = {
//                         "lat": $scope.latitude,
//                         "lng": $scope.longitude,
//                         "time": $scope.time
//                     };

//                        if ($scope.toggle == "Start Activity") {

//                  $mdDialog.show(
//                   $mdDialog.alert()
//                     .clickOutsideToClose(true)
//                     .title('Activity started !!')
//                     .textContent('Fill the summary now')
//                     .ariaLabel('Alert Dialog')
//                     .ok('Got it!')
//                 );
              
//                     //send lat ,lang n time
//                     $scope.startLatitude = $scope.latitude;
//                     $scope.startLongitude = $scope.longitude;
//                     $scope.startTime = $scope.time;
//                     console.log($scope.latitude);

//                     //console.log(executionComp);
//                     updates = {};
//                    updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/start'] = executionComp;
//                     updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "started";
//                     firebase.database().ref().update(updates);
                                      
//                     $scope.toggle = "End Activity";
                
                   
//         } else if ($scope.toggle == "End Activity") {

//                     $mdDialog.show(
//                       $mdDialog.alert()
//                         .clickOutsideToClose(true)
//                         .title('Activity completed !!')
//                         .textContent('Go to another activity now')
//                         .ariaLabel('Alert Dialog')
//                         .ok('Got it!')
//                     );
                 
//                     //send lat,long and time
//                     console.log(foo);
//                     console.log(executionComp);
//                     $scope.endLatitude = $scope.latitude;
//                     $scope.endLongitude = $scope.longitude;
//                     $scope.endTime = $scope.time;
//                     console.log(foo.mode);
//                     updates = {};
//                     updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/end'] = executionComp;
//                     updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "completed";
//                     updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/mode'] = foo.mode;
//                     updates['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/remark'] = foo.remark;
//                     firebase.database().ref().update(updates);
//                     $scope.toggle = "Completed";

//          } else if ($scope.toggle == "Completed") {
//                  $mdDialog.show(
//                       $mdDialog.alert()
//                         .clickOutsideToClose(true)
//                         .title('Activity completed !!')
//                         .textContent('You can now start next activity')
//                         .ariaLabel('Alert Dialog')
//                         .ok('Got it!')
//                     );
                 
//          } 
               

//                 }, function() {
//                     //handleLocationError(true, infoWindow, map.getCenter());
//                 });
//             } else {
//                 // Browser doesn't support Geolocation
//                 //handleLocationError(false, infoWindow, map.getCenter());
//             }

//         };

//     $scope.cancel = function() {
//         if($scope.actDetails.summary.status=="")
//         {
//              upd = {};
//             upd['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/summary/status'] = "cancelled";
//             firebase.database().ref().update(upd);
//             alert(" cancelled !!");
//         }
//         else {
//             alert("cannot cancel !!");
//         } 
   
//     };

//     $scope.add_comment = function(com) {
//         console.log("adding comment");
//         up = {};
//         console.log(com);
//         com.userid = userid;
//         com.name = localStorage.getItem("username");
//         com.time = new Date();
//         var newkey=firebase.database().ref('/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/comments').push().key;
//         up['/activity/' + userid + '/'+dates+'/' + $scope.activityId + '/comments/' + newkey] = com;
//         firebase.database().ref().update(up);


//     };

// });