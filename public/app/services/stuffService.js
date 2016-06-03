angular.module('stuffService', [])
  .factory('Stuff', function($http) {
    var myFactory = {};
    myFactory.all = function() {
      return $http.get('/api/stuff');
    };
    return myFactory;
  });