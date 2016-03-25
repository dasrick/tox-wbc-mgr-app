'use strict';
module.exports = {
  'WebcastResource': {
    'url': '/api/v1/webcast/:webcastId',
    'params': {
      'webcastId': '@id'
    },
    'actions': {
      'update': {
        method: 'PUT'
      }
    }
  }
};
