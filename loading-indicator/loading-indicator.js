app
.directive('loadingIndicator', function($timeout) {
   return {
      scope: true,
      restrict: 'E',
      templateUrl: 'loading-indicator/loading-indicator.html',
      link: function(scope, element, attribute) {
         scope.value = false;
      }
   }
})
;