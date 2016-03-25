'use strict';

var ModuleName = 'security',
  RoutingConfig = require('./config');

module.exports = angular.module(ModuleName, [])

  .controller('LoginController', require('./controller/login-controller'))

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
