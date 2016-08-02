'use strict';

angular.module('app').controller('NavbarController', [
    '$scope',
    '$window',
    'CurrentUser',
    function ($scope, $window, CurrentUser) {

        $scope.user = CurrentUser.data;

        $scope.window = $window;
        
        $scope.toggleNavbar = function() {
            angular.element(document.getElementById('navbar-collapse')).toggleClass('in');
        };

        $scope.logout = function (e) {
            if (e) {e.preventDefault();}
            window.location.assign('/data/user/logout');
        };

    }
]);