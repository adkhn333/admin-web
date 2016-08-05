app
.service('ErrorMessage', function($mdDialog, $mdToast) {
   var Obj = {};
   Obj = {
      showImportantMessage: function(title, textContent) {
         return $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(false)
            .title(title)
            .textContent(textContent)
            .ariaLabel('Something went wrong.')
            .ok('OK!')
         );
      },
      showMessage: function(title, textContent) {
         return $mdToast.show(
            $mdToast.simple()
               .textContent(title+'\n'+textContent)
               .hideDelay(3000)
         );
      },
      showConfirmMessage: function(title, textContent, ev, successFunc, cancelFunc) {
         var confirm = $mdDialog.confirm()
          .title(title)
          .textContent(textContent)
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('OK')
          .cancel('Cancel');
         return $mdDialog.show(confirm).then(function() {
               successFunc();
         }, function() {
               cancelFunc();
         });
      }
   };
   return Obj;
})
;