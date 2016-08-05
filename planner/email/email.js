
app.controller('emailPlannerCtrl', function($timeout, $scope, $rootScope, ErrorMessage, $stateParams, $q, $mdDialog, $mdMedia, $http,$state) {

    try {
      $scope.cities=[];
      $scope.projects=[];
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
    $scope.ccemail = [
      {
        email : "",
        contact : "",
        designation : "",
        department : ""
      }
    ];
    $scope.addcc = function() {
      $scope.cc = {
        email : "",
        contact : "",
        designation : "",
        department : ""
      };
      $scope.ccemail.push($scope.cc);
      console.log($scope.ccemail);
    };
    $scope.toemail = [
    {
      email : "",
      contact : "",
      designation : "",
      department : ""
    }
    ];
    $scope.addto = function() {
      $scope.to = {
        email : "",
        contact : "",
        designation : "",
        department : ""
      };
      $scope.toemail.push($scope.to);
        console.log($scope.toemail);
    };
    $scope.getFileDetails = function (e) {
      try {
        $scope.files = [];
        $scope.$apply(function () {
          for (var i = 0; i < e.files.length; i++) {
            $scope.files.push(e.files[i])
          }
        });
        $scope.showUpload=true;
        $scope.name = e.files[0].name;
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

    $scope.imageNames = [];
    $scope.size_url=[];

    $scope.upload = function(){
      try {
        console.log("uploading");

        if($scope.name !== undefined)
          $scope.sizes = $scope.name.split(",");
        else{
          $scope.sizes = ['100%'];
          $scope.size = "";
        }
        $scope.show ="";
        for (var i=0; i<$scope.files.length;++i){

          $scope.imageNames.push($scope.files[i].name);
          fd = new FormData();
          fd.append("uploadedFile", $scope.files[i]);
          $http.post('http://139.162.3.205/api/uploadFile', fd,
          {
            transformRequest: angular.identity,
            headers: { 'Content-Type' : undefined},
            params : {
              path : "emailAttachment",
              name : $scope.name
            }
          })
          .success(function(result){
            console.log(result);
            if (result.SuccessCode!="200") {
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('File Upload Failed !!')
                        .textContent('Please check file format and try again.')
                        .ariaLabel('Alert Dialog')
                        .ok('Got it!')
                    );
                            return;}
            if(result.SuccessCode=="200") {
              $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('File Upload success !!')
                        .ariaLabel('Alert Dialog')
                        .ok('Got it!')
                    );
            }
            $scope.size_url.push(result.URLs);
            console.log($scope.size_url);
            if($scope.size_url.length == $scope.files.length){
              $scope.show=true;
            }
          })
          .error(function(error){
            if(error) {
              var msg = 'Unhandled Exception';
              $rootScope.isLoading = false;
              ErrorMessage.showMessage('Something Went Wrong', msg);
              console.error(error);
            }
          });
        }
      }
      catch(error) {
        if(error) {
          var msg = 'Unhandled Exception';
          $rootScope.isLoading = false;
          ErrorMessage.showMessage('Something Went Wrong', msg);
          console.error(error);
        }
      }
    }

    console.log( $stateParams.date);
    console.log( $stateParams.userid);

    $scope.repeatSelect;

    if($stateParams.activityid) {

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

    removehash=function(obj) {
      for(i in obj) {
        delete obj[i]['$$hashKey'];
      }
      return obj;
    };

  $scope.eventplan = function(data,ev) {
    try {
      console.log("fdkfnd");
      data.planning.toEmail=removehash($scope.toemail);
      data.planning.ccEmail=removehash($scope.ccemail);
      data.planning.attachments={
        link: $scope.size_url
      };
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

      if(!$stateParams.activityid) {
        var newPostKey = firebase.database().ref('/activity/'+$stateParams.userid).child($stateParams.date).push().key;
      }
      else var newPostKey = $stateParams.activityid;

      var updates = {};
      updates['/activity/' + $stateParams.userid  + '/' + $stateParams.date + '/' + newPostKey + '/type'] = "Email";
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