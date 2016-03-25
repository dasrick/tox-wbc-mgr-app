'use strict';

/**
 * @ngInject
 */
var resource = {};

angular.extend(resource, require('./customer'));
angular.extend(resource, require('./group'));
angular.extend(resource, require('./policy'));
angular.extend(resource, require('./presentation'));
angular.extend(resource, require('./role'));
angular.extend(resource, require('./user'));
angular.extend(resource, require('./videomanager'));
angular.extend(resource, require('./webcast'));

module.exports = resource;