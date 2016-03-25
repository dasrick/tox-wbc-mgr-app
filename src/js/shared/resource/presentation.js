'use strict';
module.exports = {
  'PresentationResource': {
    'url': '/api/v1/presentation/:presentationId',
    'params': {
      'presentationId': '@id'
      //'webcast': '@webcast'
    },
    'actions': {
      'update': {
        method: 'PUT'
      }
    }
  }
};
