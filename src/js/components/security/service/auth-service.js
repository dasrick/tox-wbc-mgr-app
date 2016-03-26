'use strict';

/**
 * @ngInject
 */
module.exports = function ($http) {

  var httpConf = {skipAuthorization: true};
  var wbcMgrApiHost = process.env.WBC_MGR_API_HOST || 'https://swisscom-wbc-manager-api.movingimage.com'; // ToDo woher kommt nun die korrekte URL

  return {
    login: login,
    refresh: refresh
  };

  ////////////

  function login(httpData) {
    var httpUrl = wbcMgrApiHost + '/api/v1/security/login';

    return $http.post(httpUrl, httpData, httpConf);
  }

  function refresh(refreshToken) {
    // TODO ist im Backend noch nicht implementiert - deshalb ist das hier alles nur symbolish - nichts ist fix
    var httpUrl = wbcMgrApiHost + '/api/v1/security/refresh';
    var httpData = {refreshToken: refreshToken};

    return $http.post(httpUrl, httpData, httpConf);
  }

};
