angular.module('authService', [])
  .factory('Auth', function($http, $q, AuthToken) {
    var authFactory = {};

    authFactory.login = function(username, password) {
      return $http.post('/api/authenticate', {
        username: username,
        password: password
      })
      .then(function(response) {
        console.log("token => %s", response.data.token);
        AuthToken.setToken(response.data.token);
        return response;
      }, function(err) {
        
      });
    };

    authFactory.logout = function() {
      AuthToken.setToken();
    };

    authFactory.isLoggedIn = function() {
      if (AuthToken.getToken()) {
        return true;
      } else {
        return false;
      }
    };

    authFactory.getUser = function() {
      if (AuthToken.getToken()) {
        return $http.get('/api/me', { cache: true });
        //success($http.get('/api/me', { cache: true }));
      } else {
        return $q.reject({ message: 'Usar has no token.' });
      }
    };

    return authFactory;

  })
  .factory('AuthToken', function($window) {
    var authTokenFactory = {};

    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem('token');
    };

    authTokenFactory.setToken = function(token) {
      if (token) {
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    };

    return authTokenFactory;

  })
  .factory('AuthIntercepter', function($q, $location, AuthToken) {
    var intercepterFactory = {};

    intercepterFactory.request = function(config) {
      var token = AuthToken.getToken();

      if (token) {
        config.headers['x-access-token'] = token;
      }

      return config;
    };

    intercepterFactory.responseError = function(response) {
      if (response.status == 403) {
        AuthToken.setToken();
        $location.path('/login');
      }

      return $q.reject(response);
    }

    return intercepterFactory;

  });