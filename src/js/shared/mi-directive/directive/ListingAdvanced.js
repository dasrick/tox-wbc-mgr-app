'use strict';

/**
 * @ngInject
 */
module.exports = function () {
  return {
    restrict: 'EA', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      list: '=listingAdvancedList'
    },
    templateUrl: './views/mi-directive/listing-advanced.html',
    replace: true
  };
};
