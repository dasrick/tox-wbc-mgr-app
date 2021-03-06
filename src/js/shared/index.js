'use strict';

/**
 * @ngInject
 */
module.exports = require('angular')
  .module('shared', [
    require('./mi-directive').name
  ])

  .factory('CurrentUserService', require('./service/current-user-service'))
  .factory('AppLocalData', require('./service/app-local-data-service'))
  .factory('AppSessionData', require('./service/app-session-data-service'))

  // mi-angular-resource-builder ///////////////////////////////////////////////////////////////////////////////////////
  .config(['ResourceBuilderProvider', function (ResourceBuilderProvider) {
    // append url based on environment
    var wbcMgrApiHost = process.env.WBC_MGR_API_HOST || 'https://swisscom-wbc-manager-api.movingimage.com'; // ToDo woher kommt nun die korrekte URL
    var resources = require('./resource/index');
    for (var resource in resources) {
      if (resources.hasOwnProperty(resource)) {
        if (resources[resource].hasOwnProperty('url')) {
          resources[resource].url = wbcMgrApiHost + resources[resource].url;
        }
      }
    }
    ResourceBuilderProvider.addResources(resources);
  }])
// ===================================================================================================================
;
