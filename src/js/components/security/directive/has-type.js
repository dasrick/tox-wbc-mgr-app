'use strict';

/**
 * @ngInject
 */
module.exports = function (PermissionService) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      if (scope.hasType == null) {
        scope.hasType = {};
      }
      scope.hasType[attrs.hasType] = PermissionService.hasType(attrs.hasType);
    }
  };
};
