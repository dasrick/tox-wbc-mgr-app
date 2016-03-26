'use strict';

/**
 * @ngInject
 */
module.exports = function () {
  return {
    restrict: 'EA', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      list: '=sidebarList'
    },
    templateUrl: './views/mi-directive/sidebar-list.html',
    replace: true,
    link: function (scope) {
      scope.toggleSection = function(section) {
        angular.forEach(scope.list, function(toplevelitem, key) {
          if (section === toplevelitem.key) {
            scope.list[key].show = !scope.list[key].show;
          } else {
            scope.list[key].show = false;
          }
        });
      };
    }
  };
};
