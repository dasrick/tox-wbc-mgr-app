'use strict';
/**
 * @ngInject
 */
module.exports = {
  'app': {
    url: '',
    abstract: true,
    data: {
      requireAuth: true
    },
    views: {
      'app': {
        controller: 'CoreController as coreVm'
      }
    }
  },
  'app.manager': {
    url: '/manager/{selectedCustomerId:[0-9a-zA-Z]{1,}}',
    abstract: true,
    views: {
      'header': {
        templateUrl: './views/core/header.html'
      },
      'main': {
        templateUrl: './views/core/sidebar.html',
        controller: 'SidebarController as sidebarVm'
      },
      'footer': {
        templateUrl: './views/core/footer.html'
      }
    },
    resolve: {
      CustomerResource: 'CustomerResource',
      customers: function (CustomerResource) {
        return CustomerResource.query().$promise;
      }
    }
  },
  'app.security': {
    url: '/security',
    abstract: true,
    data: {
      requireAuth: false
    },
    views: {
      'header': {
        templateUrl: './views/core/header.html'
      },
      'main': {
        templateUrl: './views/core/no-sidebar.html'
      },
      'footer': {
        templateUrl: './views/core/footer.html'
      }
    }
  }
};
