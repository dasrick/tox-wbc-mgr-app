'use strict';

var ModuleName = 'webcast';
var RoutingConfig = require('./config');

module.exports = angular.module(ModuleName, [])

  .controller('WebcastListController', require('./controller/list-controller'))
  .controller('WebcastDetailController', require('./controller/detail-controller'))

  // routing
  .config(['$stateProvider', function ($stateProvider) {
    angular.forEach(RoutingConfig, function (config, name) {
      $stateProvider.state(name, config);
    });
  }])

  // translation
  .config(['$translatePartialLoaderProvider', function ($translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(ModuleName);
  }])

  // .config(['ResponseErrorInterceptorProvider', function (ResponseErrorInterceptorProvider) {
  //   ResponseErrorInterceptorProvider.addErrorHandling('/api/v1/webcast', 'GET', 'webcast.msg.all.error');
  //   ResponseErrorInterceptorProvider.addErrorHandling('/api/v1/webcast/{webcastId}', 'GET', 'webcast.msg.get.error');
  // }])
;
