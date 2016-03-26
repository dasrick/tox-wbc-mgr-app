'use strict';

/**
 * @ngInject
 */
module.exports = function (customers, CurrentUserService, $scope, $state, $translate) {
  var vm = this;
  vm.selectedCustomer = CurrentUserService.getSelectedCustomer();
  vm.customers = customers;
  vm.sidebar = [
    {
      key: 'webcast',
      type: 'link',
      title: $translate.instant('webcast.sidebar.title'),
      label: $translate.instant('webcast.sidebar.label'),
      uiState: 'app.manager.webcast',
      uiStateParams: {},
      uiStateOpts: {}
    }
    // {
    //   key: 'videomanager',
    //   type: 'link',
    //   title: $translate.instant('videomanager.sidebar.title'),
    //   label: $translate.instant('videomanager.sidebar.label'),
    //   uiState: 'app.manager.videomanager',
    //   uiStateParams: {},
    //   uiStateOpts: {}
    // },
    // {
    //   key: 'customer',
    //   type: 'link',
    //   title: $translate.instant('customer.sidebar.title'),
    //   label: $translate.instant('customer.sidebar.label'),
    //   uiState: 'app.manager.customer',
    //   uiStateParams: {},
    //   uiStateOpts: {}
    // },
    // {
    //   key: 'user',
    //   type: 'link',
    //   title: $translate.instant('user.sidebar.title'),
    //   label: $translate.instant('user.sidebar.label'),
    //   uiState: 'app.manager.user',
    //   uiStateParams: {},
    //   uiStateOpts: {}
    // },
    // {
    //   key: 'group',
    //   type: 'link',
    //   title: $translate.instant('group.sidebar.title'),
    //   label: $translate.instant('group.sidebar.label'),
    //   uiState: 'app.manager.group',
    //   uiStateParams: {},
    //   uiStateOpts: {}
    // },
    // {
    //   key: 'policy',
    //   type: 'link',
    //   title: $translate.instant('policy.sidebar.title'),
    //   label: $translate.instant('policy.sidebar.label'),
    //   uiState: 'app.manager.policy',
    //   uiStateParams: {},
    //   uiStateOpts: {}
    // },
    // {
    //   key: 'role',
    //   type: 'link',
    //   title: $translate.instant('role.sidebar.title'),
    //   label: $translate.instant('role.sidebar.label'),
    //   uiState: 'app.manager.role',
    //   uiStateParams: {},
    //   uiStateOpts: {}
    // }
  ];

  $scope.$watch(angular.bind(vm.selectedCustomer, function () {
    return vm.selectedCustomer;
  }), function (newCustomer, oldCustomer) {
    if (angular.isDefined(newCustomer) && angular.isDefined(oldCustomer) &&
      angular.isDefined(newCustomer.id) && angular.isDefined(oldCustomer.id) &&
      oldCustomer.id !== newCustomer.id) {
      CurrentUserService.setSelectedCustomer(newCustomer);
      $state.go('.', {selectedCustomerId: newCustomer.id}, {'reload': true});
    }
  });

};
