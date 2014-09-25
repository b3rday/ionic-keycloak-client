

angular.module('awesome.controllers').controller('ShowTaskController', function($scope, $routeParams, $location, TaskResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.task = new TaskResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Tasks");
        };
        TaskResource.get({TaskId:$routeParams.TaskId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.task);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.task.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Tasks");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Tasks");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.task.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});