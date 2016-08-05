app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
        })
        .state('projectAccessControl', {
            url: '/project-access',
            templateUrl: 'access-control/project-access.html',
            controller: 'projectAccessCtrl',
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
        })
        .state('nearby.get-distance', {
            url: '/get-distance',
            templateUrl: 'nearby/project-distance/project-distance.html',
            controller: 'getProjectDistanceCtrl',
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
        });
    // planner
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
        });
    
    // execution
    $stateProvider
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
        });
    // add project routes
    $stateProvider
        .state('add-project', {
            url:'/add-project',
            templateUrl: 'add-project/add-project.html',
            controller:'addProjectCtrl'
        })
        .state('add-project.new-project', {
            url:'/new-project',
            templateUrl: 'add-project/new-project/new-project.html',
            controller:'newProjectCtrl'
        })
        .state('add-project.basic-details', {
            url:'/basic-details',
            templateUrl: 'add-project/basic-details/basic-details.html',
            controller:'basicDetailsCtrl'
        })
        .state('add-project.rwa', {
            url:'/rwa',
            templateUrl: 'add-project/rwa/rwa.html',
            controller:'rwaCtrl'
        })
        .state('add-project.sports-activity-details', {
            url:'/sports-activity-details',
            templateUrl: 'add-project/sports-activity-details/sports-activity-details.html',
            controller:'sportsActivityDetailsCtrl'
        })
        .state('add-project.club-house-details', {
            url:'/club-house-details',
            templateUrl: 'add-project/club-house-details/club-house-details.html',
            controller:'clubHouseDetailsCtrl'
        })
        .state('add-project.costing-details', {
            url:'/costing-details',
            templateUrl: 'add-project/costing-details/costing-details.html',
            controller:'costingDetailsCtrl'
        })
        .state('add-project.other-details', {
            url:'/other-details',
            templateUrl: 'add-project/other-details/other-details.html',
            controller:'otherDetailsCtrl'
        })
        .state('add-project.security-details', {
            url:'/security-details',
            templateUrl: 'add-project/security-details/security-details.html',
            controller:'securityDetailsCtrl'
        })
        .state('add-project.society-shop-details', {
            url:'/society-shop-details',
            templateUrl: 'add-project/society-shop-details/society-shop-details.html',
            controller:'societyShopDetailsCtrl'
        })
        .state('add-project.home-delivery-details', {
            url:'/home-delivery-details',
            templateUrl: 'add-project/home-delivery-details/home-delivery-details.html',
            controller:'homeDeliveryDetailsCtrl'
        })
        .state('add-project.unit-details', {
            url:'/unit-details',
            templateUrl: 'add-project/unit-details/unit-details.html',
            controller:'unitDetailsCtrl'
        })
        .state('add-project.connectivity-details', {
            url:'/connectivity-details',
            templateUrl: 'add-project/connectivity-details/connectivity-details.html',
            controller:'connectivityDetailsCtrl'
        })
    
    
    ;
    // Default Route
    $urlRouterProvider.otherwise('/dashboard');
}]);

app.run(function(LoadingIndicatorService, $rootScope, $state) {
    LoadingIndicatorService.loadingAsyncStop(10000);
    var onChangeConfig = function() {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if(toState.name === 'add-project') {
                event.preventDefault();
                $state.go('add-project.new-project');
            }
        });
    }
    onChangeConfig();
});
