

angular.module('awesome.controllers').controller('ListTaskController', function($scope, $rootScope, $location, $http, TaskResource) {

    $scope.search={};
    $scope.currentPage = 0;
    $scope.pageSize= 10;
    $scope.results = [];
    $scope.filteredResults = [];
    $scope.pageRange = [];
    $scope.numberOfPages = function() {
        var result = Math.ceil($scope.filteredResults.length/$scope.pageSize);
        var max = (result == 0) ? 1 : result;
        $scope.pageRange = [];
        for(var ctr=0;ctr<max;ctr++) {
            $scope.pageRange.push(ctr);
        }
        return max;
    };

    $scope.performSearch = function() {
    	$http.defaults.headers.common['Authorization'] = "Bearer " + $rootScope.token;
        $scope.results = TaskResource.queryAll(function(){
            $scope.numberOfPages();
        });
    };
    
    $scope.previous = function() {
       if($scope.currentPage > 0) {
           $scope.currentPage--;
       }
    };
    
    $scope.next = function() {
       if($scope.currentPage < ($scope.numberOfPages() - 1) ) {
           $scope.currentPage++;
       }
    };
    
    $scope.setPage = function(n) {
       $scope.currentPage = n;
    };
    
    $scope.remove = function(customer) {
       var successCallback = function() {
            $scope.performSearch();
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
      customer.$remove(successCallback, errorCallback);
    };

    $scope.performSearch();
});