app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

   // access control routes
   $stateProvider
      .state('accesscontrol', {
         url: '/access-control',
         templateUrl: 'access-control/access-control.html',
         controller: 'accessControlCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      });

   // authentication routes
   $stateProvider
      .state('login', {
         url: '/login',
         templateUrl: 'authentication/login.html',
         controller: 'loginCtrl'
      })
      .state('signup', {
         url: '/signup',
         templateUrl: 'authentication/signup.html',
         controller: 'signupCtrl'
      })
      .state('forgot', {
         url: '/forgot',
         templateUrl: 'authentication/forgot-password.html',
         controller: 'forgotPasswordCtrl'
      });

   // home route
   $stateProvider
      .state('home', {
         url: '/dashboard',
         templateUrl: 'pages/home.html',
         controller: 'homeCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      });

   // admin section routes
   $stateProvider
      .state('profile', {
         url: '/profile',
         templateUrl: 'admin/profile.html',
         controller: 'profileCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('adminmaster', {
         url: '/adminmaster',
         templateUrl: 'admin/admin-master.html',
         controller: 'adminMasterCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('admindetails', {
         url: '/admindetail/:adminId',
         templateUrl: 'admin/admin-detail.html',
         controller: 'adminDetailCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      });

   // Construction Partner Routes
   $stateProvider
      .state("constructionpartner", {
         url: '/constructionpartner',
         templateUrl: 'project/construction-partner/construction-partner.html',
         controller: 'constructionPartnerCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('constructionpartner.add', {
         url: '/add',
         templateUrl: 'project/construction-partner/construction-partner-add/construction-partner-add.html',
         controller: 'addConstructionPartnerCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('constructionpartner.list', {
         url: '/list',
         templateUrl: 'project/construction-partner/construction-partner-list/construction-partner-list.html',
         controller: 'listConstructionPartnerCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('constructionpartner.detail', {
         url: '/detail/:partnerId',
         templateUrl: 'project/construction-partner/construction-partner-detail/construction-partner-detail.html',
         controller: 'detailConstructionPartnerCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      });

   // Builder Routes
   $stateProvider
      .state('builder', {
         url: '/builder',
         templateUrl: 'project/builder/builder.html',
         controller: 'builderCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('builder.list', {
         url: '/list',
         templateUrl: 'project/builder/builder-list/builder-list.html',
         controller: 'builderListCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('builder.add', {
         url: '/add',
         templateUrl: 'project/builder/builder-add/builder-add.html',
         controller: 'addBuilderCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('builder.detail', {
         url: '/detail/:builderId',
         templateUrl: 'project/builder/builder-detail/builder-detail.html',
         controller: 'detailBuilderCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      });

   // Nearby Routes
   $stateProvider
      .state('nearby', {
         url: '/nearby',
         templateUrl: 'nearby/nearby.html',
         controller: 'nearbyCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('nearby.list', {
         url: '/list',
         templateUrl: 'nearby/nearby-list/nearby-list.html',
         controller: 'nearbyListCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('nearby.add', {
         url: '/add',
         templateUrl: 'nearby/nearby-add/nearby-add.html',
         controller: 'addNearbyCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('nearby.detail', {
         url: '/detail/:nearbyId',
         templateUrl: 'nearby/nearby-detail/nearby-detail.html',
         controller: 'detailNearbyCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      });

   // team section routes
   $stateProvider
      .state('teammaster', {
         url: '/teammaster',
         templateUrl: 'team/team-master.html',
         controller: 'teamMasterCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('teamdetails', {
         url: '/teamdetail/:name',
         templateUrl: 'team/team-detail.html',
         controller: 'teamDetailCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      });

   $urlRouterProvider.otherwise('/dashboard');

}]);
