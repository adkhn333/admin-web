app.controller('data_entryPlannerCtrl', function($timeout,$scope, $stateParams, $q,$mdDialog, $mdMedia,$location,$state) {

getCities();

$scope.repeatSelect;
$scope.cities=[];
$scope.city={};
$scope.projects=[];
$scope.data={};


    function getCities() {
        var cityData = firebase.database().ref('city');
        cityData.on('value', function(data) {
            console.log(data.val());
            $timeout(function(){
                angular.forEach(data.val(), function(value, key){
                    console.log(key);
                $scope.cities.push(value);
                
            })
            }, 50);
            
        });
    }

    $scope.getProjects=function(){
        console.log($scope.cityId);
        $scope.data.city_id=$scope.cityId;
        console.log('admins/'+$stateParams.userid+'/projectAccess/'+$scope.cityId);
        var cityId=$scope.cityId;
        firebase.database().ref('admins/'+$stateParams.userid+'/projectAccess/'+$scope.cityId).on('value', function (snapshot) {
            var cityIdData=snapshot.val();
            console.log(cityIdData);
            $scope.projects=cityIdData.projects;
            $scope.data.city_name=cityIdData.cityName;
            console.log($scope.projects);

        });

    };

     $scope.projectSelected=function(){
        console.log($scope.projectId);
        
    $scope.data.project_id=$scope.projectId;
       
        var projectId=$scope.projectId;
        firebase.database().ref('/city/'+$scope.cityId+'/projects/'+projectId).on('value', function (snapshot) {
            var projectIdData=snapshot.val();
            console.log(projectIdData);
            $scope.data.project_name=projectIdData.projectName;
            console.log($scope.projects);

        });

    };

if($stateParams.activityid) {

    console.log($stateParams);

    function getActivities() {
        var defer = $q.defer();
        firebase.database().ref('/activity/'+$stateParams.userid+'/'+$stateParams.date+'/'+$stateParams.activityid).on('value', function (snapshot) {
            if(!snapshot.val()){
            defer.reject('err no data');
            }else{
            defer.resolve(snapshot.val());
            }
        });
        return defer.promise;
    };


    getActivities().then(function(snap){
        $scope.data = snap;
        console.log($scope.data);
        }, function(err){
        //do something with the error
        console.log(err);
    });

}

$scope.eventplan = function() {
    console.log($scope.data);
    
    console.log($stateParams.date);
    $mdDialog.show(
    $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Activity added')
        .textContent('You can add more activity.')
        .ariaLabel('Alert Dialog Demo')
        .ok('OK')
    
    );
    $state.go("plannerMain.blank");
    if(!$stateParams.activityid) {
    var newPostKey = firebase.database().ref('/activity/'+$stateParams.userid).child($stateParams.date).push().key;
    }
    else var newPostKey = $stateParams.activityid;

    var updates = {};
    updates['/activity/' + $stateParams.userid  + '/' + $stateParams.date + '/' + newPostKey + '/type'] = "DataEntry";
    $scope.data.active=true;
   updates['/activity/' + $stateParams.userid  + '/' + $stateParams.date + '/' + newPostKey + '/planning'] = $scope.data;

    firebase.database().ref().update(updates);
    

};

}); // Controller