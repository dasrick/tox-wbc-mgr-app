'use strict';

/**
 * @ngInject
 */
function CurrentUserService(CacheFactory, jwtHelper) {

  var currentUserData = CacheFactory('currentUser', {storageMode: 'sessionStorage'});

  return {
    getAccessToken: getAccessToken,
    setAccessToken: setAccessToken,
    getRefreshToken: getRefreshToken,
    setRefreshToken: setRefreshToken,
    getUser: getUser,
    setUser: setUser,
    getSelectedCustomer: getSelectedCustomer,
    setSelectedCustomer: setSelectedCustomer,
    isAuthenticated: isAuthenticated,
    isExpired: isExpired,
    isLoggedIn: isLoggedIn,
    logout: logout,
    setResponseData: setResponseData
  };

  ////////////

  function getAccessToken() {
    return currentUserData.get('jwt_access_token');
  }

  function setAccessToken(token) {
    currentUserData.put('jwt_access_token', token);
  }

  function getRefreshToken() {
    return currentUserData.get('jwt_refresh_token');
  }

  function setRefreshToken(token) {
    currentUserData.put('jwt_refresh_token', token);
  }

  function getUser() {
    return currentUserData.get('currentUser');
  }

  function setUser(value) {
    currentUserData.put('currentUser', value);
  }

  function getSelectedCustomer() {
    return currentUserData.get('selectedCustomer');
  }

  function setSelectedCustomer(value) {
    currentUserData.put('selectedCustomer', value);
  }

  function isAuthenticated() {
    return angular.isDefined(getAccessToken());
  }

  function isExpired() {
    return jwtHelper.isTokenExpired(getAccessToken());
  }

  function isLoggedIn() {
    return isAuthenticated() && !isExpired();
  }

  function logout() {
    currentUserData.removeAll();
  }

  function setResponseData(response) {
    if (
      angular.isDefined(response.data) &&
      angular.isDefined(response.data.token) &&
      angular.isString(response.data.token)
    ) {
      setAccessToken(response.data.token);

      var payload = JSON.parse(atob(response.data.token.split('.')[1]));
      var user = JSON.parse(payload.user);
      setUser(user);
    }
  }

}

module.exports = CurrentUserService;
