app.controller('onlineResearchPlannerCtrl', function($timeout,$scope, $rootScope, ErrorMessage, $stateParams, $q, $mdDialog,$state) {
    $scope.cities=[];
    $scope.projects=[];
    try {
      firebase.database().ref('city').once('value', function(data) {
          console.log(data.val());
          $timeout(function(){
              angular.forEach(data.val(), function(value, key){
                console.log(key);
                $scope.cities.push(value);
              })
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
      try {
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
        try {
          var defer = $q.defer();
          firebase.database().ref('/activity/'+$stateParams.userid+'/'+$stateParams.date+'/' + $stateParams.activityid).on('value', function (snapshot) {
            if(!snapshot.val()){
                defer.reject('err no data');
            }
            else{
                defer.resolve(snapshot.val());
                //return snapshot.val();
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

        data.planning.start.lat = 22.32323;
        data.planning.start.lng = 77.43434;
        data.planning.end.lat = 22.11212;
        data.planning.end.lng = 77.33333;
          
        var updates = {};
        updates['/activity/' + $stateParams.userid  + '/' + $stateParams.date + '/' + newPostKey + '/type'] = "onlineResearch";
        data.planning.active=true;
        updates['/activity/' + $stateParams.userid  + '/' + $stateParams.date + '/' + newPostKey + '/planning'] = data.planning;
        $state.go("plannerMain.blank");
        return firebase.database().ref().update(updates, function(error) {
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