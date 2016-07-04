app.controller("addConstructionPartnerCtrl", ['$scope', '$http', '$mdToast', '$mdDialog', '$location', '$localStorage', '$timeout', function($scope, $http, $mdToast, $mdDialog, $location, $localStorage, $timeout){

   $scope.selectedCompType = '';
   $scope.compTypeList = [
      {'name': 'Construction Company'},
      {'name': 'Architect'},
      {'name': 'Landscape Design'}
   ];

   $scope.submitPartnerMaster = function(){
      var PartnerMasterObject = {
         name: $scope.companyname,
         companyType: $scope.selectedCompType,
         website: $scope.website || '',
         trackingId: $localStorage.currentUser.uid,
         activeFlag: 1,
         createdDate: new Date()
      }
      console.log(PartnerMasterObject);

      var ref = db.ref().child("constructionPartners");
      ref.push(PartnerMasterObject).then(function(data){
         console.log(data);
         console.log(data.key);
         ref.child(data.key).update({
            partnerId: data.key
         });
         $timeout(function () {
            $location.path("/constructionpartner/list");
         },0);
      });
   }
}]);
