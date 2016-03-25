'use strict';
module.exports = {
  'UserResource': {
    'url': '/api/v1/user/:userId',
    'params': {
      'userId': '@id',
      'customer': '@customer'
    },
    'actions': {
      'update': {
        method: 'PUT'
      }
    }
  }
};
