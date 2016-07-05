app.controller('appointmentCtrl', function($scope) {
  
   $scope.data = {
      group1 : 'Car',
      start_lat: null,
      start_lng:null,
      start_time:null,
      start_location:null,
      end_lat: null,
      end_lng:null,
      end_time:null,
      end_location:null,
      purpose:null,
      project_id:null,
      mode:null,
      active:null,
      availableModes:[
      	{mode:"car"},
      	{mode:"bike"},
      	{mode:"metro"},
      	{mode:"bus"}
      ]
    };
    $scope.repeatSelect;


  $scope.eventplan = function(datas) {
    firebase.database().ref('users/' + userId).push({
    username: datas.name,
    email: email
  });
  };

}); // Controller