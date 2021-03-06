app.controller('travelLocalPlannerCtrl', function($timeout, $localStorage, $scope, $stateParams, $q, $mdDialog, $mdMedia,$location,$state) {

    console.log($stateParams);

    $scope.cities=[];
    $scope.projects=[];
    $scope.dats = {
        availableModes:[
            {mode:"car"},
            {mode:"bike"},
            {mode:"metro"},
            {mode:"bus"}
        ]
    };
    $scope.repeatSelect;
    try {
        firebase.database().ref('city').once('value', function(data) {
            console.log(data.val());
            $timeout(function(){
                angular.forEach(data.val(), function(value, key){
                    console.log(key);
                    $scope.cities.push(value);
                });
            }, 50);    
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
        if(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
        }
    } 
    $scope.getProjects=function(cityId){
        firebase.database().ref('admins/'+$stateParams.userid+'/projectAccess/'+cityId).on('value', function (snapshot) {
          $timeout(function(){
            var cityIdData=snapshot.val();
            console.log(cityIdData);
            $scope.projects=cityIdData.projects;        
          },50);

        }, function(error) {
            if(error) {
                var msg = 'Unhandled Exception';
                $rootScope.isLoading = false;
                ErrorMessage.showMessage('Something Went Wrong', msg);
                console.error(error);
            }
        });

    };

    // firebase.database().ref('admins/'+$stateParams.userid+'/projectAccess/');

    if($stateParams.activityid) {
        console.log($stateParams);
        function getActivities() {
            try {
                var defer = $q.defer();
                firebase.database().ref('/activity/'+$stateParams.userid+'/'+$stateParams.date+'/' + $stateParams.activityid).on('value', function (snapshot) {
                    if(!snapshot.val()){
                        defer.reject('err no data');
                    }
                    else {
                        defer.resolve(snapshot.val());
                        //return snapshot.val();
                    }
                }, function(error) {
                    if(error) {
                        var msg = 'Unhandled Exception';
                        $rootScope.isLoading = false;
                        ErrorMessage.showMessage('Something Went Wrong', msg);
                        console.error(error);
                    }
                });
                return defer.promise;
            }
            catch(error) {
                if(error) {
                    var msg = 'Unhandled Exception';
                    $rootScope.isLoading = false;
                    ErrorMessage.showMessage('Something Went Wrong', msg);
                    console.error(error);
                }
            }
        };

        getActivities().then(function(snap){
            $scope.data = snap;
            console.log($scope.data);
        }, function(error){
            if(error) {
                var msg = 'Unhandled Exception';
                $rootScope.isLoading = false;
                ErrorMessage.showMessage('Something Went Wrong', msg);
                console.error(error);
            }
        });

    }
    
    $scope.eventplan = function(data,ev) {
        try {
            console.log(data);
            console.log($stateParams.date);

            $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Activity added')
            .textContent('You can add more activity.')
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
            .targetEvent(ev)
            );
            // $location.url("blank");
            $state.go("plannerMain.blank");

            if(!$stateParams.activityid) {
                var newPostKey = firebase.database().ref('/activity/'+$stateParams.userid).child($stateParams.date).push().key;
            }
            else var newPostKey = $stateParams.activityid;

            data.planning.start.lat = 22.32323;
            data.planning.start.lng = 77.43434;
            data.planning.end.lat = 22.11212;
            data.planning.end.lng = 77.33333;


            var updates = {};
            updates['/activity/' + $stateParams.userid  + '/' + $stateParams.date + '/' + newPostKey + '/type'] = "localTravel";
            data.planning.active=true;
            updates['/activity/' + $stateParams.userid  + '/' + $stateParams.date + '/' + newPostKey + '/planning'] = data.planning;
            

            firebase.database().ref().update(updates, function(error) {
                if(error) {
                    var msg = 'Unhandled Exception';
                    $rootScope.isLoading = false;
                    ErrorMessage.showMessage('Something Went Wrong', msg);
                    console.error(error);
                }
            });
        }
        catch(error) {
            if(error) {
                var msg = 'Unhandled Exception';
                $rootScope.isLoading = false;
                ErrorMessage.showMessage('Something Went Wrong', msg);
                console.error(error);
            }
        }
        
    };

}); // Controller