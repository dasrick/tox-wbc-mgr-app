'use strict';

/**
 * @ngInject
 */
module.exports = {
  'app.manager.webcast': {
    url: '/webcast',
    views: {
      'content@app.manager': {
        templateUrl: './views/webcast/list.html',
        controller: 'WebcastListController as webcastListVm'
      }
    },
    resolve: {
      WebcastResource: 'WebcastResource',
      webcasts: function (WebcastResource, $stateParams) {
        return WebcastResource.query({customer: $stateParams.selectedCustomerId}).$promise;
      }
    }
  },
  'app.manager.webcast.detail': {
    url: '/{webcastId:[0-9a-zA-Z]{1,}}',
    views: {
      'content@app.manager': {
        templateUrl: './views/webcast/detail.html',
        controller: 'WebcastDetailController as webcastDetailVm'
      }
    },
    resolve: {
      WebcastResource: 'WebcastResource',
      webcast: function (WebcastResource, $stateParams) {
        return WebcastResource.get({webcastId: $stateParams.webcastId}).$promise;
      }
    }
  },
  'app.manager.webcast.create': {
    views: {
      'content@app.manager': {
        templateUrl: './views/webcast/detail.html',
        controller: 'WebcastDetailController as webcastDetailVm'
      }
    },
    resolve: {
      WebcastResource: 'WebcastResource',
      webcast: function (WebcastResource) {
        return new WebcastResource();
      }
    }
  }
};
