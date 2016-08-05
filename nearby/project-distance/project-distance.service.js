app.factory("ProjectDistanceService", ['$http', '$rootScope', 'ErrorMessage', '$mdDialog', '$q', function($http, $rootScope, ErrorMessage, $mdDialog, $q){
   var service = {};

   service.getProjectDistanceRequest = getProjectDistanceRequest;

   return service;

   function getProjectDistanceRequest(selectedCity, selectedPlace, time, i, placeDetailsLat, placeDetailsLng){
      try {
        var deferred = $q.defer();

        var origin = new google.maps.LatLng(placeDetailsLat, placeDetailsLng);
        var destination = new google.maps.LatLng(28.4054159,76.9078335);

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
        }, callback);

        function callback(response, status) {
          try {
              // console.log(response);
              // console.log(response.rows[0].elements[0]);
              console.log(response.rows[0].elements[0].distance);
              console.log(response.rows[0].elements[0].duration);
              var nearbyDistanceUpdates = {};
              console.log(i);
              nearbyDistanceUpdates['nearbyDistance/'+selectedCity+"/"+selectedPlace+"/residential/"+i+"/"+time+"/distance"] = response.rows[0].elements[0].distance;
              nearbyDistanceUpdates['nearbyDistance/'+selectedCity+"/"+selectedPlace+"/residential/"+i+"/"+time+"/duration"] = response.rows[0].elements[0].duration;
              db.ref().update(nearbyDistanceUpdates, function(error) {
                  if(error) {
                      var msg = 'Unhandled Exception';
                      $rootScope.isLoading = false;
                      ErrorMessage.showMessage('Something Went Wrong', msg);
                      console.error(error);
                  }
              }).then(function(){
                  console.log("success nearbyDistance update");
                  // $mdDialog.show(
                  //    $mdDialog.alert()
                  //       .clickOutsideToClose(true)
                  //       .title('Distances Successfully Updated')
                  //       .textContent('Project Distances from Nearby Locations Successfully Updated')
                  //       .ariaLabel('Distances Successfully Updated')
                  //       .ok('OK!')
                  // );
                  return deferred.promise;
              });
          }
          catch(error) {
              var msg = 'Unhandled Exception';
              $rootScope.isLoading = false;
              ErrorMessage.showMessage('Something Went Wrong', msg);
              console.error(error);
          }
        }
      }
      catch(error) {
        var msg = 'Unhandled Exception';
        $rootScope.isLoading = false;
        ErrorMessage.showMessage('Something Went Wrong', msg);
        console.error(error);
      }
   }
}])
