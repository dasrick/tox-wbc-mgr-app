'use strict';

var ModuleName = 'security',
  RoutingConfig = require('./config');

module.exports = angular.module(ModuleName, [])

  .controller('LoginController', require('./controller/login-controller'))

  .factory('PermissionService', require('./service/permission-service'))
  .factory('AuthService', require('./service/auth-service'))

  .directive('hasRole', require('./directive/has-role'))
  .directive('hasType', require('./directive/has-type'))

  // routing
  .config(function ($stateProvider) {
    angular.forEach(RoutingConfig, function (config, name) {
      $stateProvider.state(name, config);
    });
  })

  // translation
  .config(function ($translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(ModuleName);
  })
;
