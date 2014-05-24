var app = angular.module('MyApp', ['ngAnimate', 'firebase']);

app.controller('TodoController', function($scope, $firebase) {
  var todos_reference = new Firebase('https://yvesvanbroekhoven.firebaseio.com/todos');

  $scope.todos = $firebase(todos_reference);

  $scope.addTodo = function() {
    $scope.todos.$add({
      created_at: new Date,
      title: $scope.new_todo.title
    });

    $scope.new_todo.title = '';
  };

  $scope.removeTodo = function(key) {
    //$scope.todos.splice( $scope.todos.indexOf(todo), 1 );
    $scope.todos.$remove( key );
  };
});
