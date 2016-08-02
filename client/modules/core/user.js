'use strict';

angular.module('app').service('CurrentUser', [
    '$window',
    function($window) {
        return {data: $window.user || {}};
    }
]);