'use strict';

/**
 * @ngInject
 */
module.exports = function () {
  return {
    restrict: 'EA', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      item: '=rowListItem',
      route: '@rowListRoute'
    },
    templateUrl: './views/mi-directive/row-list-item.html',
    replace: true
  };
};
