app.controller('MenuCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', '$mdDialog', '$localStorage', function($scope, $timeout, $mdSidenav, $log, $mdDialog, $localStorage) {

   if($localStorage.currentUser){
      $timeout(function () {
         $scope.emailid = $localStorage.currentUser.email;
      }, 0);
   }

   var originatorEv;
   $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
   };

   $scope.toggleLeft = buildDelayedToggler('left');
   $scope.toggleRight = buildToggler('right');
   $scope.isOpenRight = function() {
      return $mdSidenav('right').isOpen();
   };
   /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
   function debounce(func, wait, context) {
      var timer;
      return function debounced() {
         var context = $scope,
         args = Array.prototype.slice.call(arguments);
         $timeout.cancel(timer);
         timer = $timeout(function() {
            timer = undefined;
            func.apply(context, args);
         }, wait || 10);
      };
   }
   /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
   function buildDelayedToggler(navID) {
      return debounce(function() {
         // Component lookup should always be available since we are not using `ng-if`
         $mdSidenav(navID)
         .toggle()
         .then(function() {
            $log.debug("toggle " + navID + " is done");
         });
      }, 200);
   }

   function buildToggler(navID) {
      return function() {
         // Component lookup should always be available since we are not using `ng-if`
         $mdSidenav(navID)
         .toggle()
         .then(function() {
            $log.debug("toggle " + navID + " is done");
         });
      }
   }

   $scope.close = function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
      .then(function() {
         $log.debug("close RIGHT is done");
      });
   };
   $scope.close = function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
      .then(function() {
         $log.debug("close LEFT is done");
      });
   };

   $scope.menu = [
      {
         link: '#/dashboard',
         title: 'Dashboard',
         icon: 'dashboard'
      },
      {
         link: '#/access-control',
         title: 'Access Control',
         icon: 'lock_outline'
      },{
         link: '#/profile',
         title: 'Profile',
         icon: 'account_box'
      },
      {
         link: '#/adminmaster',
         title: 'Admin Master',
         icon: 'group_add'
      },
      {
         link: '#/teammaster',
         title: 'Team Master',
         icon: 'group'
      },
      {
         link: '#/builder/list',
         title: 'Builders',
         icon: 'group'
      },
      {
         link: '#/constructionpartner/list',
         title: 'Construction Partners',
         icon: 'group'
      },
      {
         link: '#/submit-project',
         title: 'Submit Project',
         icon: 'group'
      },
      {
         link: '#/approve-project',
         title: 'Project Approval',
         icon: 'group'
      },
      {
         link: '#/add-location',
         title: 'Add Location',
         icon: 'group'
      },
      {
         link: '#/image-upload',
         title: 'Image Upload',
         icon: 'group'
      },
      {
         link: '#/plannerMain',
         title: 'Planning Phase',
         icon: 'group'
      },
      {
         link: '#/tasks',
         title: 'Execution Phase',
         icon: 'group'
      },
      {
         link: '#/project-access',
         title: 'Project Access',
         icon: 'group'
      }
   ];
}]);
