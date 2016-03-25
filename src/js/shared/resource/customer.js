'use strict';
module.exports = {
  'CustomerResource': {
    'url': '/api/v1/customer/:customerId',
    'params': {
      'customerId': '@id',
      'parent': '@parentId'
    },
    'actions': {
      'update': {
        method: 'PUT'
      }
    }
  }
};
