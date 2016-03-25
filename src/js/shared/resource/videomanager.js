'use strict';
module.exports = {
  'VideomanagerResource': {
    'url': '/api/v1/videomanager/:videomanagerId',
    'params': {
      'videomanagerId': '@id',
      'customer': '@customer'
    },
    'actions': {
      'update': {
        method: 'PUT'
      }
    }
  }
};
