var MyApp = angular.module('MyApp', ['ngRoute', 'ngAnimate']);


/**
 * Configuration
 */
MyApp.config( function($routeProvider) {

  $routeProvider
    .when('/', {
      controller: 'homeController',
      page_name: 'page-home',
      templateUrl: 'views/home.html'
    })
    .when('/about', {
      controller: function($scope) {
        $scope.state = "About page transitioning..";

        $scope.$watch('ready', function() {
          if ( $scope.ready ) {
            $scope.state = "About page ready!"
          }
        });

      },
      page_name: 'page-about',
      templateUrl: 'views/about.html'
    })
    .otherwise({
      page_name: 'page-404',
      templateUrl: 'views/404.html'
    });

});


/**
 * Main controller
 */
MyApp.controller('mainController', function($scope, $route) {
  $scope.$route = $route;
});


MyApp.controller('homeController', function($scope) {
  $scope.state = "Home page transitioning..";

  $scope.$watch('ready', function() {
    if ( $scope.ready ) {
      $scope.state = "Home page ready!"
    }
  });
});


/**
 * Directive that binds a 'done' callback to an element & initializes
 * scope.ready to FALSE.
 *
 * When the callback is triggered, it sets the scope.ready to TRUE.
 */
MyApp.directive('pageReady', function() {
  return function(scope, element, attrs) {
    scope.ready = false;

    element.bind('done', function() {
      scope.$apply(function() {
        scope.ready = true;
      });
    });

  };
});


/**
 * Page in & out animation
 */
MyApp.animation('.page-animation', function() {
  return {

    // Enter
    enter: function(element, done) {
      TweenMax.fromTo(
        element,
        2,
        {
          css: {
            transform: 'translateY(-100%)'
          }
        },
        {
          css: {
            transform: 'translateY(0%)'
          },
          ease: Expo.easeOut,
          onComplete: function() {
            var event = new CustomEvent('done');
            element[0].dispatchEvent(event);
            done();
          }
        }
      );

      return function(is_cancelled) {
        if ( is_cancelled ) {
          TweenMax.set(
            element,
            {
              css: {
                transform: 'translateY(0%)'
              }
            }
          );
        }
      };
    },

    // Leave
    leave: function(element, done) {
      TweenMax.to(
        element,
        2,
        {
          css: {
            transform: 'translateY(100%)'
          },
          ease: Expo.easeOut,
          onComplete: done
        }
      );

      return function(is_cancelled) {
        if ( is_cancelled ) {
          TweenMax.set(
            element,
            {
              css: {
                transform: 'translateY(100%)'
              }
            }
          );
        }
      };
    }

  };
});
