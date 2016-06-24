app.controller("teamMasterCtrl", ['$scope', '$http', '$localStorage', '$mdDialog', '$mdToast', '$location', '$mdSidenav', function($scope, $http, $localStorage, $mdDialog, $mdToast, $location, $mdSidenav){
   
   $scope.teamList = [
      {name: 'Marketing'},
      {name: 'Technical'},
      {name: 'Operations'}
   ]
}]);
