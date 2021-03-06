'use strict';

/**
 * @ngInject
 */
module.exports = function () {
  return {
    restrict: 'EA', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      list: '=listingBasicList'
    },
    templateUrl: './views/mi-directive/listing-basic.html',
    replace: true
  };
};
