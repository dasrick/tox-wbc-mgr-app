'use strict';

/**
 * @ngInject
 */
module.exports = function (CacheFactory) {

  var appData = CacheFactory('appLocalData', {storageMode: 'localStorage'});

  return {
    get: get,
    set: set
  };

  ////////////

  function get(key) {
    return appData.get(key);
  }

  function set(key, val) {
    appData.put(key, val);
  }

};
