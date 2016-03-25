'use strict';
module.exports = {
  'RoleResource': {
    'url': '/api/v1/role/:roleId',
    'params': {
      'roleId': '@id',
      'customer': '@customer'
    },
    'actions': {
      'update': {
        method: 'PUT'
      }
    }
  }
};
