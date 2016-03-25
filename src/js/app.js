'use strict';

var appName = 'tox-wbc-mgr-app';
var angular = require('angular');

require('angular-cache');
require('angular-electron');
require('angular-formly');
require('angular-formly-templates-bootstrap');
require('angular-jwt');
require('angular-loading-bar');
require('angular-resource');
require('angular-sanitize');
require('angular-translate');
require('angular-translate-loader-partial');
require('angular-ui-bootstrap');
require('angular-ui-notification');
require('angular-ui-router');
require('mi-angular-resource-builder');

var requires = [
  'angular-cache',
  'angular-electron',
  'formly',
  'formlyBootstrap',
  'angular-jwt',
  'angular-loading-bar',
  'ngResource',
  'ngSanitize',
  'pascalprecht.translate',
  'ui.bootstrap',
  'ui-notification',
  'ui.router',
  'mi.ResourceBuilder',
  require('./components').name,
  require('./shared').name
];

angular.module(appName, requires)

  // redirect for unknown routes ///////////////////////////////////////////////////////////////////////////////////////
  .config(['$urlRouterProvider', '$locationProvider', '$resourceProvider', function ($urlRouterProvider, $locationProvider, $resourceProvider) {
    $urlRouterProvider.otherwise(function ($injector) {
      var $state;
      $state = $injector.get('$state');
      // $state.go('app.base.status');
      $state.go('app.security.login');
    });
    //$httpProvider.interceptors.push('ResponseErrorInterceptor');
    $resourceProvider.defaults.stripTrailingSlashes = true;
  }])
  // ===================================================================================================================

  // translation stuff /////////////////////////////////////////////////////////////////////////////////////////////////
  .config(function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'i18n/{part}/{lang}.json'
    });
    // add translation table
    $translateProvider
      .registerAvailableLanguageKeys(['en', 'de'], {
        'en_*': 'en',
        'de_*': 'de'
      })
      .determinePreferredLanguage();

    /*
     The fallback language is not working ...
     $translateProvider.fallbackLanguage('en');
     The following workaround sets the preferred language to english,
     if the detection failed or the detected language is not known.
     */
    var language = $translateProvider.preferredLanguage();
    if ((language !== null) || !language.match(/(de).*/)) {
      return $translateProvider.preferredLanguage('de');
    }
  })
  // ===================================================================================================================

  // angular-loading-bar ///////////////////////////////////////////////////////////////////////////////////////////////
  .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])
  // ===================================================================================================================


  .config(['NotificationProvider', function(NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 5000,
      startTop: 40,
      startRight: 15,
      verticalSpacing: 15,
      horizontalSpacing: 15,
      positionX: 'right',
      positionY: 'top'
    });
  }])

;

angular.element(document).ready(function() {
  angular.bootstrap(document, [appName]);
});