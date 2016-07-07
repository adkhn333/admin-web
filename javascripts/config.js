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
         url: '/admindetail/:admin_id',
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
         url: '/detail/:partner_id',
         templateUrl: 'project/construction-partner/construction-partner-detail/construction-partner-detail.html',
         controller: 'detailConstructionPartnerCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      });

   // Developer Routes
   $stateProvider
      .state('developer', {
         url: '/developer',
         templateUrl: 'project/developer/developer.html',
         controller: 'developerCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('developer.list', {
         url: '/list',
         templateUrl: 'project/developer/developer-list/developer-list.html',
         controller: 'developerListCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('developer.add', {
         url: '/add',
         templateUrl: 'project/developer/developer-add/developer-add.html',
         controller: 'addDeveloperCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('developer.detail', {
         url: '/detail/:developer_id',
         templateUrl: 'project/developer/developer-detail/developer-detail.html',
         controller: 'detailDeveloperCtrl',
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
      })

      .state('submit-project', {
         url: '/submit-project',
         templateUrl: 'project/version-control/submit-project.html',
         controller: 'submitProjectCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })
      .state('approve-project', {
         url: '/approve-project',
         templateUrl: 'project/version-control/approve-project.html',
         controller: 'projectApprovalCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })

      .state('add-location', {
         url: '/add-location',
         templateUrl: 'location/add-location.html',
         controller: 'createCityZoneLocationCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })

      .state('image-upload', {
         url: '/image-upload',
         templateUrl: 'image-upload/image-upload.html',
         controller: 'uploadImageCtrl',
         resolve: {
            currentAuth: function(AuthenticationService){
               return AuthenticationService.checkAuthentication();
            }
         }
      })


   //planner
   $stateProvider
   .state('plannerMain', {
    url:'/plannerMain',
    templateUrl: 'planner/planner_main/plannerMain.html',
 })
   .state('plannerMain.travelLocal', {
    url:'/travelLocal/:date/:userid/:activityid',
    templateUrl: 'planner/travelLocal/travelLocal.html',
    controller: 'travelLocalPlannerCtrl'
 })
   .state('plannerMain.appointment', {
    url:'/appointment/:date/:userid/:activityid',
    templateUrl: 'planner/appointment/appointment.html',
    controller: 'appointmentPlannerCtrl'
 })
   
   .state('plannerMain.travelOutstation', {
    url:'/travelOutstation/:date/:userid/:activityid',
    templateUrl: 'planner/travelOutstation/travelOutstation.html',
    controller: 'travelOutstationPlannerCtrl'
 })
   .state('plannerMain.leave', {
    url:'/leave/:date/:userid/:activityid',
    templateUrl: 'planner/leave/leave.html',
    controller: 'leavePlannerCtrl'
 })
   .state('plannerMain.onlineResearch', {
    url:'/onlineResearch/:date/:userid/:activityid',
    templateUrl: 'planner/onlineResearch/onlineResearch.html',
    controller: 'onlineResearchPlannerCtrl'
 })
   .state('plannerMain.email', {
    url:'/email/:date/:userid/:activityid',
    templateUrl: 'planner/email/email.html',
    controller: 'emailPlannerCtrl'
 })
   .state('plannerMain.phoneCalls', {
    url:'/phoneCalls/:date/:userid/:activityid',
    templateUrl: 'planner/phoneCalls/phoneCalls.html',
    controller: 'phone_callsPlannerCtrl'
 })
   .state('plannerMain.dataEntry', {
    url:'/dataEntry/:date/:userid/:activityid',
    templateUrl: 'planner/dataEntry/dataEntry.html',
    controller: 'data_entryPlannerCtrl'
 })
   .state('plannerMain.blank', {
    url:'/blank',
    templateUrl: 'planner/blank/blank.html',
    controller: 'blankCtrl'
 })
   .state('to_do', {
    url:'/to_do',
    templateUrl: 'planner/to_do/to_do.html',
    controller: 'to_doCtrl'
 })
   
    //execution
   .state('tasks', {
    url:'/tasks',
    templateUrl: 'execution/tasks/tasks.html',
    controller:'tasksCtrl'
 })
    .state('travelLocal', {
    url:'/travelLocal/:activityId',
    templateUrl: 'execution/travelLocal/travelLocal.html',
    controller:'travelLocalCtrl'
 })
    .state('travelOutstation', {
    url:'/travelOutstation/:activityId',
    templateUrl: 'execution/travelOutstation/travelOutstation.html',
    controller:'travelOutstationCtrl'
 })
.state('phoneCalls', {
    url:'/phoneCalls/:activityId',
    templateUrl: 'execution/phoneCalls/phoneCalls.html',
    controller:'phoneCallsCtrl'
 })
.state('leave', {
    url:'/leave/:activityId',
    templateUrl: 'execution/leave/leave.html',
    controller:'leaveCtrl'
 })
.state('dataEntry', {
    url:'/dataEntry/:activityId',
    templateUrl: 'execution/dataEntry/dataEntry.html',
    controller:'leaveCtrl'
 })


   $urlRouterProvider.otherwise('/dashboard');

}]);
