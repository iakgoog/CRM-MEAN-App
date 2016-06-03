angular.module('userApp', [
  'ngResource',
  'ngAnimate',
  'app.routes',
  'authService',
  'mainCtrl',
  'userCtrl',
  'userService'
])
.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthIntercepter');
});