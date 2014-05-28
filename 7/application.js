var MyApp = angular.module('MyApp', ['ngRoute']);


MyApp.config( function($routeProvider) {

  $routeProvider
    .when('/', {
      pageName: 'home',
      templateUrl: 'views/home.html'
    })
    .when('/about', {
      pageName: 'about',
      templateUrl: 'views/about.html'
    })
    .otherwise({
      pageName: '404',
      templateUrl: 'views/404.html'
    });

});


MyApp.controller('mainController', function($scope, $route) {
  $scope.$route = $route;
});
