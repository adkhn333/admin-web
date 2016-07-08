app.controller('onlineResearchPlannerCtrl', function($scope, $stateParams, $q, $mdDialog,$state) {


  console.log("Called");

    $scope.projlist = [
    {
      projectId : "",
      projectName : "",
      projectCity : "",
      projectType : "",
      remark: ""
    }
  ];


  $scope.addproj = function() {
    $scope.proj = {
      projectId : "",
      projectName : "",
      projectCity : "",
      projectType : "",
      remark: ""
    };
    $scope.projlist.push($scope.proj);
    console.log($scope.projlist);
  };


     $scope.repeatSelect;
    console.log($stateParams.activityid);
    
    if($stateParams.activityid) {
      console.log('Hello onlineResearch');

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
              
               console.log(err);
        });

    }


  $scope.eventplan = function(data,ev) {

    // console.log(data,ev);
    // return;
    for (i in $scope.projlist) {
        delete $scope.projlist[i]['$$hashKey'];
      }

      data.planning.projects=$scope.projlist;

    console.log(data);
    console.log($stateParams.date);
    var newPostKey;
   console.log($stateParams.activityid);
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
    if(!$stateParams.activityid) {
         newPostKey = firebase.database().ref('/activity/'+$stateParams.userid + '/').child($stateParams.date).push().key;
      }
      else newPostKey = $stateParams.activityid;
      
        var updates = {};
        updates['/activity/' + $stateParams.userid  + '/' + $stateParams.date + '/' + newPostKey + '/type'] = "onlineResearch";
        data.planning.active=true;
        updates['/activity/' + $stateParams.userid  + '/' + $stateParams.date + '/' + newPostKey + '/planning'] = data.planning;
          $state.go("plannerMain.blank");
        return firebase.database().ref().update(updates);
       
  };



}); // Controller