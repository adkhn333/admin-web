app
.service('ErrorHandler', function($q) {
   var Obj = {};
   Obj = {
      logErrorToFirebase: function(error) {
         var key = firebase.database().ref().push().key;
         var updates = {};
         updates['/errors/'+key] = error;
         return firebase.database().ref().update(updates);
      },
      getLoggedErrorsFromFirebase: function() {
         var defer = $q.defer();
         firebase.database().ref('/errors/').once('value', function(snapshot) {
            defer.resolve(snapshot.val());
         });
         return defer.promise;
      }
   };
   return Obj;
})
;