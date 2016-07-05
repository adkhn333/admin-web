app
.controller('uploadImageCtrl',function($scope,$http, $timeout){

    $scope.dataloaded = true;

    $scope.paths = [
        {name:"Main",value:"main"},
        {name:"Club House", value:"club_house"},
        {name:"Amenities", value:"amenities"},
        {name:"Lift Lobby", value:"lift_lobby"},
        {name:"Gardens", value:"gardens"}
    ];


  $scope.cities = [];
  $scope.projects = [];

  // Load cities and projects
  firebase.database().ref('protectedResidentialVersions')
    .once('value', function(snapshot){
        $scope.dataloaded = true;
        // console.log(snapshot.val());
        $scope.fullObject = snapshot.val();
        // Load cities
        angular.forEach(snapshot.val(), function(value, key) {
            $scope.cities.push(value);

            // Load projects
            angular.forEach(value.projects, function(value, key){
                $scope.projects.push(value.editable);
            });
        });
    });

    $scope.selectProject = function(projectId){

      firebase.database().ref('protectedResidentialVersions/projects/'+projectId)
      .once('value', function(snapshot){
        console.log(snapshot.val());
      });
    }

    $scope.getFileDetails = function (e) {


        $scope.files = [];
        $scope.$apply(function () {
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i])
            }
        });
    };

    $scope.imageNames = [];
    $scope.sizes=[];
    $scope.size="";


	$scope.upload = function(){

        console.log("Creating path...");

        $http({
            method:'POST',
            url:'http://139.162.3.205/api/createPath',
            params: {
                path: $scope.path
            }
        }).then(function successCallback(response){

            console.log("Path Created");
            console.log("Uploading images...");

            $scope.sizes = $scope.size.split(",");
            $scope.show ="";
            for (var i=0; i<$scope.files.length;++i){

                $scope.imageNames.push($scope.files[i].name);
                fd = new FormData();
                fd.append("uploadedFile", $scope.files[i]);
                $http.post('http://139.162.3.205/api/uploadImage', fd,{
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type' : undefined
                        },
                        params : {
                            path : $scope.path,
                            size : '100%'
                        }
                })
                .success(function(result){
                    console.log("Images uploaded");

                    var images = {};
                    for (var i = 0; i < result.URLs.length; ++i){
                        images["url"] = result.URLs[i].imageUrl;
                    }

                    // console.log(images);
                    // console.log($scope.path);
                    // console.log($scope.cityId);
                    // console.log($scope.project.version);

                    if($scope.path == "main"){
                        firebase.database()  
                        .ref('protectedResidential/'+$scope.cityId+'/projects/'+$scope.project.projectId+'/'+$scope.project.version+'/images/'+$scope.path)
                        .set(images);
                    }else{
                        firebase.database()  
                        .ref('protectedResidential/'+$scope.cityId+'/projects/'+$scope.project.projectId+'/'+$scope.project.version+'/images/'+$scope.path)
                        .push(images);
                    }


                })
                .error(function(err){
                    console.log(err.message);
                });
            }

        }, function errorCallback(response){
            console.log(response);
        });
    }
});