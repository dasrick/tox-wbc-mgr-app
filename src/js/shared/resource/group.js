'use strict';
module.exports = {
  'GroupResource': {
    'url': '/api/v1/group/:groupId',
    'params': {
      'groupId': '@id',
      'customer': '@customer'
    },
    'actions': {
      'update': {
        method: 'PUT'
      }
    }
  }
};
