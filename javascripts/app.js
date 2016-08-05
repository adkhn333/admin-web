var app = angular.module('RoofpikAdmin', [
   'ngMaterial', 
   'ui.router', 
   'ngStorage', 
   'firebase', 
   'ngMessages',
   'ngMap',
   'mdPickers'
]);

var db = firebase.database();

app.controller('homeCtrl', function($scope) {
   
});

app.config(['$mdThemingProvider', '$mdIconProvider', function($mdThemingProvider, $mdIconProvider) {

   var customBlueMap = $mdThemingProvider.extendPalette('teal', {
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50'],
      '50': 'ffffff'
   });
   $mdThemingProvider.definePalette('customBlue', customBlueMap);
   $mdThemingProvider.theme('default')
   .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
   })
   .accentPalette('pink');
   $mdThemingProvider.theme('input', 'default')
   .primaryPalette('grey')
}]);

