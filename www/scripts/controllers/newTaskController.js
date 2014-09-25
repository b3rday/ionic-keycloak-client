
angular.module('awesome.controllers',[]).controller('NewTaskController', function ($scope, $location, locationParser, TaskResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.task = $scope.task || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Tasks/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        TaskResource.save($scope.task, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Tasks");
    };
});