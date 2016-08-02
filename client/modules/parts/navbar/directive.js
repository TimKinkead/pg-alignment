'use strict';

angular.module('app').directive('navbar', [
    function() {
        return {
            restrict: 'A',
            templateUrl: 'modules/parts/navbar/view.html',
            scope: {},
            controller: 'NavbarController'
        };
    }
]);