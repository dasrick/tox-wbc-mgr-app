'use strict';
/**
 * @ngInject
 */
module.exports = {
  'app.security.login': {
    url: '/login',
    views: {
      'content': {
        templateUrl: 'mi-angular-wbc-pack/template/login.html',
        controller: 'LoginController as loginVm'
      }
    }
  }
};
