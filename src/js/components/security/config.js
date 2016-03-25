'use strict';
/**
 * @ngInject
 */
module.exports = {
  'app.security.login': {
    url: '/login',
    views: {
      'content': {
        templateUrl: './views/security/content.html',
        controller: 'LoginController as loginVm'
      }
    }
  }
};
