app
.controller('addProjectCtrl', function($scope, $mdSidenav) {
   $scope.toggleAddProjectRight = function() {
      $mdSidenav('add-project-menu').toggle();
         // .toggle()
         // .then(function() {
         //    $log.debug("toggle " + navID + " is done");
         // });
   }
   $scope.sideNavItems = [
      { link: 'add-project.new-project', title: 'New Project', icon: 'fiber_new' },
      { link: 'add-project.basic-details', title: 'Basic Details', icon: 'fiber_new' },
      { link: 'add-project.rwa', title: 'RWA', icon: 'fiber_new' },
      { link: 'add-project.sports-activity-details', title: 'Sports Activity Details', icon: 'fiber_new' },
      { link: 'add-project.club-house-details', title: 'Club House Details', icon: 'fiber_new' },
      { link: 'add-project.costing-details', title: 'Costing Details', icon: 'fiber_new' },
      { link: 'add-project.other-details', title: 'Other Details', icon: 'fiber_new' },
      { link: 'add-project.society-shop-details', title: 'Society Shop Details', icon: 'fiber_new' },
      { link: 'add-project.home-delivery-details', title: 'Home Delivery Details', icon: 'fiber_new' },
      { link: 'add-project.unit-details', title: 'Unit Details', icon: 'fiber_new' },
      { link: 'add-project.connectivity-details', title: 'Connectivity Details', icon: 'fiber_new' },
   ];

})
;