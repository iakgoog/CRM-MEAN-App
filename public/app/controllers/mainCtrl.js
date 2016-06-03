angular.module('mainCtrl', [])
  .controller('mainController', function($rootScope, $location, Auth) {
    var vm = this;

    vm.loggedIn = Auth.isLoggedIn();

    $rootScope.$on('$routeChangeStart', function() {
      vm.loggedIn = Auth.isLoggedIn();

      Auth.getUser()
        .then(function(response) {
          vm.user = response.data;
        }, function(err) {

        });
    });

    vm.doLogin = function() {
      vm.processing = true;

      Auth.login(vm.loginData.username, vm.loginData.password)
        .then(function(response) {
          vm.processing = false;
          //console.log(response);
          if (response.data.success) {
            $location.path('/users');
          } else {
            vm.error = response.data.message;
          }
        }, function(err) {
          vm.processing = false;
        });
    };

    vm.doLogout = function() {
      Auth.logout();
      vm.user = {};
      $location.path('/login');
    };

  })