'use strict';

/**
 * @ngInject
 */
module.exports = function (CacheFactory) {

  var appData = CacheFactory('appData', {storageMode: 'sessionStorage'});

  return {
    getUpdateExecuted: getUpdateExecuted,
    setUpdateExecuted: setUpdateExecuted
  };

  ////////////

  function getUpdateExecuted() {
    return appData.get('update_executed');
  }

  function setUpdateExecuted(val) {
    appData.put('update_executed', val);
  }

};
