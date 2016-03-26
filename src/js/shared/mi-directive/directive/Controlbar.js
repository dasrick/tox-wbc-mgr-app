'use strict';

/**
 * @ngInject
 */
module.exports = function () {
  return {
    restrict: 'EA', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      itemsHead: '=controlbarItemsHead',
      itemsLeft: '=controlbarItemsLeft',
      itemsRight: '=controlbarItemsRight'
    },
    templateUrl: './views/mi-directive/controlbar.html',
    replace: true
  };
};
