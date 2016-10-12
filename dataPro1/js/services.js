var myApp = angular.module("dataAnalysis", []);
myApp.factory('WebSiteService', function($http){

    var findStat = function(callback){
        $http.get('http://web-fidapp.rhcloud.com/api/sale2')
        .success(callback);       
    };

    var create = function(fidelsFirm, callback){
      $http.post('http://web-fidapp.rhcloud.com/api/sale2', fidelsFirm)
      .success(callback);
    };

    var remove = function(id, callback){
       $http.delete('http://web-fidapp.rhcloud.com/api/sale2/'+id)
       .success(callback);
    }

    return{
      create: create,
      findStat: findStat,
      remove: remove           
    }
});