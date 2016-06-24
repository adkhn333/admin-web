app.controller('VendorWidgetCtrl', function($scope) {

    $scope.users = [
        { id: 1, name: 'Bob' },
        { id: 2, name: 'Alice' },
        { id: 3, name: 'Steve' }
    ];
    $scope.selectedUser = { id: 1, name: 'Bob' };
});
