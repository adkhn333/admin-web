app.controller('ActivityLogCtrl', function($rootScope, ErrorMessage, $timeout, $scope) {

    $scope.todos = [{

        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands lorem ipsum dolor amit."
    }, {

        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands lorem ipsum dolor amit."
    }, {

        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands lorem ipsum dolor amit."
    }, {

        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands lorem ipsum dolor amit."
    }, {

        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands lorem ipsum dolor amit."
    }, {

        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands lorem ipsum dolor amit."
    }, {

        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands lorem ipsum dolor amit."
    }, {

        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands lorem ipsum dolor amit."
    }, {

        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands lorem ipsum dolor amit."
    }, {

        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands lorem ipsum dolor amit."
    }];

    try {
        firebase.database().ref('admins')
        .once('value', function(adminsSnapshot){
            $timeout(function(){

                $scope.admins = adminsSnapshot.val();
                console.log($scope.admins);
            },50);
        }, function(error) {
            var msg = 'Unhandled Exception';
            $rootScope.isLoading = false;
            ErrorMessage.showMessage('Something Went Wrong', msg);
            console.error(error);
        });
    }
    catch(error) {
      var msg = 'Unhandled Exception';
      $rootScope.isLoading = false;
      ErrorMessage.showMessage('Something Went Wrong', msg);
      console.error(error);
   }
});