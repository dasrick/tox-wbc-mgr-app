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
require('mi-angular-alert-service');
require('mi-angular-resource-builder');
require('mi-angular-wbc-pack');

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
  'mi.AlertService',
  'mi.ResourceBuilder',
  'mi.WbcPack',
  require('./components').name,
  require('./shared').name
];

angular.module(appName, requires)

  // // redirect for unknown routes ///////////////////////////////////////////////////////////////////////////////////////
  // .config(['$urlRouterProvider', '$locationProvider', '$resourceProvider', function ($urlRouterProvider, $locationProvider, $resourceProvider) {
  //   $urlRouterProvider.otherwise(function ($injector) {
  //     var $state;
  //     $state = $injector.get('$state');
  //     // $state.go('app.base.status');
  //     $state.go('app.security.login');
  //   });
  //   //$httpProvider.interceptors.push('ResponseErrorInterceptor');
  //   $resourceProvider.defaults.stripTrailingSlashes = true;
  // }])
  // // ===================================================================================================================

  // put jwt token into requests ///////////////////////////////////////////////////////////////////////////////////////
  .config(function Config($httpProvider, jwtInterceptorProvider) {
    var refreshPromise;
    jwtInterceptorProvider.tokenGetter = ['$q', 'config', 'CurrentUserService', 'AuthService', '$state', '$log',
      function ($q, config, CurrentUserService, AuthService, $state, $log) {
        var apiAuthRequired = config.url.indexOf('/api/') >= 0;
        var accessTokenAvailable = angular.isDefined(CurrentUserService.getAccessToken());
        if (!accessTokenAvailable || !apiAuthRequired) {
          return null;
        }

        if (CurrentUserService.isExpired()) {
          // UNCOMMENT AFTER IMPLAMENTATION OF REFRESH
          //
          //$log.warn('access-token isExpired');
          //// a refresh is currently in progress
          //if (angular.isDefined(refreshPromise)) {
          //  $log.info('refresh is currently in progress');
          //  return refreshPromise.promise;
          //}
          //
          //$log.info('refresh will be fired now');
          //
          //refreshPromise = $q.defer();
          //AuthService.refresh(CurrentUserService.getRefreshToken()).then(
          //  function (response) {
          //    $log.info('refresh call OK');
          //
          //    CurrentUserService.setResponseData(response);
          //    refreshPromise.resolve(CurrentUserService.getAccessToken());
          //    refreshPromise = undefined;
          //  },
          //  function () {
          //    $log.warn('refresh call FAILED');
          //
          //    refreshPromise.reject();
          //    refreshPromise = undefined;
          //    CurrentUserService.logout();
          //    $state.go('app.security.login', {}, {'reload': true});
          //  }
          //);

          // START - remove after REFRESH implementation
          $log.warn('REFRESH currently not implemented ... please login again ... sry');
          refreshPromise = $q.defer();
          refreshPromise.reject();
          refreshPromise = undefined;
          CurrentUserService.logout();
          $state.go('app.security.login', {}, {'reload': true});
          // END - remove after REFRESH implementation

          return refreshPromise.promise;
        } else {
          return CurrentUserService.getAccessToken();
        }
      }];
    $httpProvider.interceptors.push('jwtInterceptor');
  })

  // redirect for unknown routes ///////////////////////////////////////////////////////////////////////////////////////
  .config(function ($urlRouterProvider, $locationProvider, $resourceProvider, $httpProvider) {
    $urlRouterProvider.otherwise(function ($injector) {
      var $state;
      var CurrentUserService;
      CurrentUserService = $injector.get('CurrentUserService');
      $state = $injector.get('$state');
      if (CurrentUserService.isLoggedIn()) {
        var selectedCustomer = CurrentUserService.getSelectedCustomer();
        $state.go('app.manager.webcast', {selectedCustomerId: selectedCustomer.id}, {'reload': true});
      } else {
        CurrentUserService.logout();
        $state.go('app.security.login', {}, {'reload': true});
      }
    });
    // $httpProvider.interceptors.push('ResponseErrorInterceptor');  // leider teil des mi-angular-alert-service
    $resourceProvider.defaults.stripTrailingSlashes = true;
  })

  // check routes for auth and redirect if needed //////////////////////////////////////////////////////////////////////
  .run(function ($rootScope, $injector, $log) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      var requireAuth = toState.data.requireAuth;
      if (requireAuth !== false) {
        var $state, CurrentUserService;
        CurrentUserService = $injector.get('CurrentUserService');
        $state = $injector.get('$state');
        if (!CurrentUserService.isAuthenticated()) {
          event.preventDefault();
          CurrentUserService.logout();
          $state.go('app.security.login', {}, {'reload': true});
        } else {
          if (CurrentUserService.isExpired()) {
            $log.warn('REFRESH currently not implemented ... please login again ... sry');

            event.preventDefault();
            CurrentUserService.logout();
            $state.go('app.security.login', {}, {'reload': true});
          }
        }
      }
    });
  })
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

  // mi-angular-alert-service //////////////////////////////////////////////////////////////////////////////////////////
  .constant('ALERT_LEVELS', {
    danger: {timeout: 10000},
    warning: {timeout: 4000},
    success: {timeout: 2000},
    info: {timeout: 2000}
  })
// ===================================================================================================================

;

angular.element(document).ready(function () {
  angular.bootstrap(document, [appName]);
});