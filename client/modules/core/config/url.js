'use strict';

angular.module('app').run([
    '$location',
    function ($location) {
        
        if ($location.hash() === '_=_') {
            $location.url($location.path());
        }
    }
]);