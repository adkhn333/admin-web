app.controller("addBuilderCtrl", ['$scope', '$rootScope', 'ErrorHandler', 'ErrorMessage', '$http','$mdToast', '$location', '$localStorage', '$mdDialog', '$timeout', function($scope, $rootScope, ErrorHandler, ErrorMessage, $http, $mdToast, $location, $localStorage, $mdDialog, $timeout){

   $scope.submitBuilder = function(form){
      try {
         $rootScope.isLoading = true;
         $scope.noTouchBuilder = true;
         // if(form.$invalid) return;

         var devObject = {
            name: $scope.fullname,
            address1: $scope.address1,
            address2: $scope.address2,
            landmark: $scope.landmark,
            city: $scope.city,
            about: $scope.about,
            established: $scope.established,
            areaConstructed: $scope.areaConstructed,
            email: $scope.email,
            website: $scope.website,
            mobile: $scope.mobile,
            altMob: $scope.altMob || '',
            trackingId: $localStorage.currentUser.uid,
            activeFlag: 1,
            createdDate: new Date()
         }
         console.log(devObject);

         var ref = db.ref().child("builders");
         ref.push(devObject, function(error) {
            if(error) {
               var msg = 'Unhandled Exception';
               $rootScope.isLoading = false;
               ErrorMessage.showMessage('Something Went Wrong', msg);
               console.error(error);
            }
         }).then(function(data){
            console.log(data);
            console.log(data.key);
            ref.child(data.key).update({
               builderId: data.key
            });
            $timeout(function () {
               $location.path("/builder/list");
            },0);
         });
         $rootScope.isLoading = false;
         // var customError = {
         //    name: 'customError',
         //    error: 'Default',
         //    fileName: 'builder-add.controller.js',
         //    stack: new Error().stack
         // }
         // throw new Error();
      }
      catch(error) {
         $rootScope.isLoading = false;
         var msg = "Unhandled Exception";
         if(error.stack.toString().indexOf('Error: Firebase.push failed') != -1) {
            msg = "Please Check Your Input";
         }
         ErrorHandler.logErrorToFirebase(error.stack).then(function(data) {
            console.log(data);
            console.log('finished');
         });
         ErrorMessage.showMessage('Something Went Wrong', msg);
         // $mdDialog.show(
         // $mdDialog.alert()
         //    .clickOutsideToClose(false)
         //    .title('Something went wrong!')
         //    .textContent(msg)
         //    .ariaLabel('Something went wrong.')
         //    .ok('OK!')
         // );
         // console.log(error);
         // console.log(error.fileName);
         // console.log(error.lineNumber);
         // var temp = error.stack.split("\n");
         // var temp2 = [];
         // angular.forEach(temp, function(obj) {
         //    temp2.push(obj.split('('));
         // });
         // console.log(temp);
         // console.log(temp2);
         console.log(error.stack);
      }
   }
}]);