app
.service('Builder', function($q, $http) {
   var Obj = {};
   Obj = {
      getBuilder: function() {
         var defer = $q.defer();
         // var buildersData = firebase.database().ref('builder');
         // buildersData.on('value', function(data) {
         //     defer.resolve(data.val());
         // });
         $http.get('builders/builders.json').success(function(response) {
               defer.resolve(response.builder);
         });
         return defer.promise;
      }
   };
   return Obj;  
})
;