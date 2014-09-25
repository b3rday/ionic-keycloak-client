angular.module('awesome.services',[]).factory('TaskResource', function($resource){
    var resource = $resource('http://awesome-sblanc.rhcloud.com/rest/tasks/:TaskId',{TaskId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});