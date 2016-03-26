'use strict';

/**
 * @ngInject
 */
module.exports = function (AuthService, CurrentUserService, CustomerResource, Notification, $state, $translate) {
  var vm = this;
  // functions
  vm.login = login;
  // variables
  vm.loginData = {};

  redirect();

  // public methods ////////////////////////////////////////////////////////////////////////////////////////////////////

  function login() {
    AuthService.login(vm.loginData).then(
      function (response) {
        CurrentUserService.setResponseData(response);
        // only at login the default for selected customer will set
        var currentUser = CurrentUserService.getUser();
        CustomerResource.get({customerId: currentUser.customer.id}).$promise.then(
          function (customer) {
            CurrentUserService.setSelectedCustomer(customer);
            redirect();
          }
        );
      },
      function (error) {
        CurrentUserService.logout();
        var msg;
        switch (error.status) {
          case 401:
            msg = 'security.msg.login.error.401';
            break;
          case 404:
            msg = 'security.msg.login.error.404';
            break;
          default:
            msg = 'security.msg.login.error.unknown';
        }
        Notification.error($translate.instant(msg));
      }
    );
  }

  // private methods ///////////////////////////////////////////////////////////////////////////////////////////////////

  function redirect() {
    if (CurrentUserService.isLoggedIn() && angular.isDefined(CurrentUserService.getSelectedCustomer())) {
      var selectedCustomer = CurrentUserService.getSelectedCustomer();
      $state.go('app.manager.webcast', {selectedCustomerId: selectedCustomer.id}, {'reload': true});
    } else {
      CurrentUserService.logout();
    }
  }
};
