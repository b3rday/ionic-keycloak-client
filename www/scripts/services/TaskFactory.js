var services = angular.module('awesome.services',[]);
services.factory('TaskResource', function($resource){
    var resource = $resource('http://192.168.1.19:8080/awesome/rest/tasks/:TaskId',{TaskId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});