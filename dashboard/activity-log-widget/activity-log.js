app.controller('ActivityLogCtrl', function($timeout, $scope) {


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


    firebase.database().ref('admins')
    .once('value', function(adminsSnapshot){
        $timeout(function(){

            $scope.admins = adminsSnapshot.val();
            console.log($scope.admins);
        },50);
    });
});