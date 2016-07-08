app.controller('VendorWidgetCtrl', function($scope) {

    $scope.cities = [
        { id: '-KKwFI52ZEHYVeLcSRyi', name: 'Gurgaon' },
        { id: '-KKwMwFXhpDY3pJ63aHh', name: 'Bangalore' },
        { id: '-KLpsnre8s6Wr8LkxiML', name: 'Delhi' }
    ];
    $scope.selectedCity = { id: '-KKwFI52ZEHYVeLcSRyi', name: 'Gurgaon' };

    $scope.gurgaon = [
    {
    	name: 'Akash Ganga',
    	image: 'sector 56-30.jpg',
    	address: 'Sector 56 Golf Course Extension Road'
    },{
        name: 'Vipul Greens',
        image: 'sector56-133.jpg',
        address: 'Sector 48 Sohna Road'
    },{
        name: 'Unitech Escape',
        image: 'Airport Apartments-3.jpg',
        address: 'Sector 50, Golf Course Extension Road'
    },{
        name: 'Mahindra Luminare',
        image: 'sector56-21.jpg',
        address: '"Sector 59, Golf Course Extension"'
    }
    
    ];

    $scope.delhi = [
    {
        name: 'Mahindra Luminare',
        image: 'sector 56-14.jpg',
        address: 'Golf Course Extension Road'
    }, {
        name: 'R.D.Appartments',
        image: 'sector 56-16.jpg',
        address: 'Dwarka Sector 54'
    }, {
        name: 'Mahindra Appartments',
        image: 'sector 56-30.jpg',
        address: 'Sector 12, Metro Road'
    }, {
        name: 'Bestech',
        image: 'sector 56-43.jpg',
        address: 'Sector 45 Extension Road'
    }, {
        name: 'Mahindra Luminare',
        image: 'sector 56-58.jpg',
        address: 'Golf Course Extension Road'
    }
    ];


    $scope.bangalore = [
    {
        name: 'India Bulls',
        image: 'sector 56-86.jpg',
        address: 'Golf Course Extension Road'
    },{
        name: 'Wembley Estate',
        image: 'sector56-119.jpg',
        address: 'Sector 49, Vikas Marg'
    },{
        name: 'Vatika',
        image: 'sector56-133.jpg',
        address: 'Sector 48 Subhas Road'
    },{
        name: 'Mahindra Luminare',
        image: 'sector 56-57.jpg',
        address: 'Golf Course Extension Road'
    },{
        name: 'DLF Appartments',
        image: 'sector 56-85.jpg',
        address: 'Golf Course Extension Road'
    }
    ];

    $scope.projects =  $scope.delhi;

    $scope.showProjects = function (cityName) {
    	if (cityName == 'Gurgaon') {
	    	$scope.projects = $scope.gurgaon;
	    } else if(cityName == 'Delhi'){
	    	$scope.projects = $scope.delhi;
	    } else {
            $scope.projects = $scope.bangalore;
        }
    }
});
