var MyApp = angular.module('MyApp', ['ngRoute']);

MyApp.config( function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      controller: function(){},
      templateUrl: 'views/home.html'
    })
    .when('/about', {
      controller: function(){},
      templateUrl: 'views/about.html'
    })
    .otherwise({
      templateUrl: 'views/404.html'
    });

});


MyApp.run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    //console.log(next, current);
  });

  $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
    console.log(next, current);
  });
});


MyApp.controller('applicationController', function($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
//console.log($scope.$route, $scope.$location, $scope.$routeParams);
});

