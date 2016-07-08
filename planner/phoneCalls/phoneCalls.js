app.controller('phone_callsPlannerCtrl', function($timeout, $scope, $stateParams, $q,$mdDialog, $mdMedia,$location,$state) {
    console.log('Hello phone_callsCtrl');
  $scope.cities=[];
$scope.projects=[];


firebase.database().ref('city')
        .once('value', function(data) {
            console.log(data.val());
            $timeout(function(){
                angular.forEach(data.val(), function(value, key){
                    console.log(key);
                $scope.cities.push(value);
                
            })
            }, 50);
            
        });

    $scope.getProjects=function(cityId){
        firebase.database().ref('admins/'+$stateParams.userid+'/projectAccess/'+cityId).on('value', function (snapshot) {

          $timeout(function(){
            var cityIdData=snapshot.val();
            console.log(cityIdData);
            $scope.projects=cityIdData.projects;        
          },50);

        });

    };


    
    console.log($stateParams.activityid);
    if($stateParams.activityid) {
      console.log('Hello phone_callsCtrl');

      console.log($stateParams);

        function getActivities() {
          var defer = $q.defer();
          firebase.database().ref('/activity/'+$stateParams.userid+'/'+$stateParams.date+'/' + $stateParams.activityid).on('value', function (snapshot) {
             if(!snapshot.val()){
                defer.reject('err no data');
             }else{
                defer.resolve(snapshot.val());
                //return snapshot.val();
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


  $scope.eventplan = function(data,ev) {
    console.log(data);
    console.log($stateParams.date);
    var newPostKey;

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
        $state.go("plannerMain.blank");
   
    if(!$stateParams.activityid) {
         newPostKey = firebase.database().ref('/activity/'+$stateParams.userid + '/').child($stateParams.date).push().key;
      }
      else newPostKey = $stateParams.activityid;
      
        var updates = {};
        updates['/activity/' + $stateParams.userid  + '/' + $stateParams.date + '/' + newPostKey + '/type'] = "phoneCalls";
        data.planning.active=true;
        updates['/activity/' + $stateParams.userid  + '/' + $stateParams.date + '/' + newPostKey + '/planning'] = data.planning;
        
        return firebase.database().ref().update(updates);
       
    
  };

}); // Controller