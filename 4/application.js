var JournalsApp = angular.module('JournalsApp', ['firebase']);

JournalsApp.controller('JournalsController', function($scope, $firebase) {
  var journals_reference = new Firebase('https://yvesvanbroekhoven.firebaseio.com/journals');

  $scope.journals = $firebase(journals_reference);


  $scope.journals.$on("change", function() {
    console.log("A remote change was applied locally!");
  });


  $scope.addJournal = function() {
    $scope.journals.$add({
      created_at: new Date,
      title: $scope.new_journal.title
    });

    $scope.new_journal.title = '';
  };


  $scope.removeJournal = function(id) {
    $scope.journals.$remove(id);
  };


  $scope.enableEdit = function(journal) {
    journal.new_title    = journal.title;
    journal.edit_enabled = true;
  };


  $scope.disableEdit = function(journal) {
    journal.edit_enabled = false;
  };


  $scope.updateJournal = function(journal) {
    journal.title        = journal.new_title;
    journal.edit_enabled = false;

    $scope.journals.$save(journal.$id);
  }


});
