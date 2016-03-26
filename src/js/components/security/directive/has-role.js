'use strict';

/**
 * @ngInject
 */
module.exports = function (PermissionService) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      if (scope.hasRole == null) {
        scope.hasRole = {};
      }
      scope.hasRole[attrs.hasRole] = PermissionService.hasRole(attrs.hasRole);
    }
  };
};
