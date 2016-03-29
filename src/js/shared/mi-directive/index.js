'use strict';
/**
 * @ngInject
 */
var ModuleName = 'miDirective';

module.exports = angular.module(ModuleName, [])
  .directive('listingBasic', require('./directive/ListingBasic'))
  .directive('listingAdvanced', require('./directive/ListingAdvanced'))
  .directive('rowListItem', require('./directive/RowListItem'))
  .directive('sidebarList', require('./directive/SidebarList.js'))
;
