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
         company_type: $scope.selectedCompType,
         website: $scope.website || '',
         tracking_id: $localStorage.currentUser.uid,
         active_flag: 1,
         created_date: new Date()
      }
      console.log(PartnerMasterObject);

      var ref = db.ref().child("constructionPartners");
      ref.push(PartnerMasterObject).then(function(data){
         console.log(data);
         console.log(data.key);
         ref.child(data.key).update({
            partner_id: data.key
         });
         $timeout(function () {
            $location.path("/constructionpartner/list");
         },0);
      });
   }
}]);
