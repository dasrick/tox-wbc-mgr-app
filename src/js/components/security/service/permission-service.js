'use strict';

/**
 * @ngInject
 */
module.exports = function (CurrentUserService) {
  return {
    hasRole: function (roleName) {
      var user;
      user = CurrentUserService.getUser();
      if (!user) {
        return false;
      }
      return user.reachableRoles.indexOf(roleName) > -1;
    },
    hasType: function (typeName) {
      var user;
      user = CurrentUserService.getUser();
      if (!user) {
        return false;
      }
      return user.customer.type === typeName;
    }
  };
};
