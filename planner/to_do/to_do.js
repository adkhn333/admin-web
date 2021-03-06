app.controller('to_doCtrl', ['$scope', '$rootScope', 'ErrorMessage', '$location','$timeout', '$q', '$filter', '$firebaseArray', '$firebaseObject','$mdDialog', '$mdMedia','$state', '$localStorage', function($scope, $rootScope , ErrorMessage, $location, $timeout, $q, $filter, $firebaseArray, $firebaseObject, $mdDialog, $mdMedia, $state, $localStorage) {
    try {
        $scope.userid=$localStorage.currentUser.uid;
        $scope.date = new Date();
    }
    catch(error) {
        if(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
        }
    }
    $scope.data = {
        repeatSelect: null,
        availableOptions: [
          //{id: '1', name: 'Appointment'},
          {id: '2', name: 'Travel_local'},
          {id: '3', name: 'Travel_outstation'},
          {id: '4', name: 'Phone_calls'},
          {id: '5', name: 'Email'},
          {id: '6', name: 'Online_research'},
          {id: '7', name: 'Leave'},
          {id: '8', name: 'Data_entry'}
          // {id: '9', name: 'Meeting'},
          // {id: '10', name: 'Training'},
          // {id: '11', name: 'Planning'},
          // {id: '12', name: 'Break'},
          // {id: '13', name: 'Others'}
        ],
    };
    $scope.getActivities = function() {
        try {
            console.log("hello");
            var dates = $filter('date')($scope.date, 'dd-MM-yy');
            console.log(dates);
            console.log($scope.userid);

            var ref = firebase.database().ref('/activity/' + $scope.userid + '/' + dates);
            console.log();
            $scope.todos = $firebaseArray(ref);
            console.log( $scope.todos);
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
    
    $scope.delete=function(x,ev){
        try {
            console.log("deleting");
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this activity?')
                .textContent('')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');
            $mdDialog.show(confirm).then(function() {
                var dates = $filter('date')($scope.date, 'dd-MM-yy');
                var updates = {};
                updates['/activity/' + $scope.userid + '/' + dates + '/' + x] = null;
                return firebase.database().ref().update(updates, function(error) {
                    if(error) {
                        var msg = 'Unhandled Exception';
                        $rootScope.isLoading = false;
                        ErrorMessage.showMessage('Something Went Wrong', msg);
                        console.error(error);
                    }
                });
            }, function() {
     
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
    //x is activity
    $scope.edit=function(x){
        try {
            console.log(x);
            var dates = $filter('date')($scope.date, 'dd-MM-yy');
            console.log(x.type);
            var type=x.type;
            if(type=="localTravel")type="travelLocal";
            if(type=="DataEntry")type="dataEntry";
            if(type=="Email")type="email";

            if(type=="OutstationTravel")type="travelOutstation";

            $state.go("plannerMain."+type,{date:dates, userid:$scope.userid,activityid:x.$id});
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
    $scope.activitySelect=function(x) {
        console.log(x);
        var dates = $filter('date')($scope.date, 'dd-MM-yy');
        console.log(dates);
        if(x==1)
            $location.url("plannerMain.appointment").search({date:dates, userid:$scope.userid,activityid:x.$id}); 
        else if(x==2)
            $state.go("plannerMain.travelLocal",{date:dates, userid:$scope.userid,activityid:x.$id});
        else if(x==3)
                $state.go("plannerMain.travelOutstation",{date:dates, userid:$scope.userid,activityid:x.$id});
        else if(x==4)
            $state.go("plannerMain.phoneCalls",{date:dates, userid:$scope.userid,activityid:x.$id});
        else if(x==5)
            $state.go("plannerMain.email",{date:dates, userid:$scope.userid,activityid:x.$id});
        else if(x==6)
            $state.go("plannerMain.onlineResearch",{date:dates, userid:$scope.userid,activityid:x.$id});
        else if(x==7)
            $state.go("plannerMain.leave",{date:dates, userid:$scope.userid,activityid:x.$id});
        else if(x==8)
        $state.go("plannerMain.dataEntry",{date:dates, userid:$scope.userid,activityid:x.$id}); 
    };
}]);