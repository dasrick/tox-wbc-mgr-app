'use strict';
module.exports = {
  'PolicyResource': {
    'url': '/api/v1/policy/:policyId',
    'params': {
      'policyId': '@id',
      'customer': '@customer'
    },
    'actions': {
      'update': {
        method: 'PUT'
      }
    }
  }
};
