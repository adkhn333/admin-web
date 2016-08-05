app
.service('LoadingIndicatorService', function($timeout, $rootScope, ErrorMessage) {
   var Obj = {};
   Obj = {
      loadingAsyncStop: function(milliseconds) {
         return $rootScope.$watch('isLoading', function(newValue, oldValue) {
            console.log(oldValue);
            console.log(newValue);
            console.log('loading changed');
            var temp = oldValue;
            return $timeout(function() {
               if($rootScope.isLoading === true) {
                  $rootScope.isLoading = false;
                  ErrorMessage.showImportantMessage('NETWORK_ERROR :', ' Please Check Your Network OR Contact Admin');
               }
            }, milliseconds);
         });
      },
      loadingStart: function() {
         return $timeout(function() {
            $rootScope.isLoading = true;
         });
      },
      loadingEnd: function() {
         return $timeout(function() {
            $rootScope.isLoading = false;
         });
      }
   };
   return Obj;
})
;