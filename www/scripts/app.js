'use strict';

var app = angular.module('awesome',['ionic','ngResource','awesome.controllers','awesome.services']);

var auth = {};

app.factory('Auth', function () {
    return auth;
  });

app.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
	  
	  var pushConfig = {
			   pushServerURL: "https://javaoneups-sblanc.rhcloud.com/ag-push/",
			   android: {
			      senderID: "313664704978",
			      variantID: "39d64fb1-6c82-4638-9d02-3fbbbad5ba28",
			      variantSecret: "d2e4e60a-e3d9-4db7-acee-0d18abc953a4"
			   }
			};

    function onNotification(event) {
    	    alert(event.alert);
    	}

     function successHandler() {
    	    console.log('success')
    	}

     function errorHandler(message) {
    	    console.log('error ' + message);
    	}
    
    var keycloak = new Keycloak();  
    
    keycloak.init({ onLoad: 'login-required' }).success(function(){
    	$rootScope.token = keycloak.token;
    	
    	
    	pushConfig.alias = keycloak.idToken.preferred_username;
        //push.register(onNotification, successHandler, errorHandler, pushConfig); 
    });
	
  });
})

  .config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab", 
      abstract: true,
      templateUrl: "views/tabs.html" 
    })
    // Each tab has its own nav history stack:

    .state('tab.listTask', {
      url: '/Tasks',
      views: {
        'tab-Tasks': {
          templateUrl: 'views/Task/search.html',
          controller: 'ListTaskController'
        }
      }
    })
    .state('tab.Task-detail', {
      url: '/Task/:TaskId',
      views: { 
        'tab-Tasks': {
          templateUrl: 'views/Task/detail.html',
          controller: 'ShowTaskController'
        }
      }
    })

    .state('tab.newTask', {
      url: '/newTask',
      views: {
        'tab-newTask': {
          templateUrl: 'views/Task/detail.html',
          controller: 'NewTaskController'
        }
      }
    });
    $urlRouterProvider.otherwise('/tab/Tasks');
  });

