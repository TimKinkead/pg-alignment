'use strict';

angular.module('app').controller('HomeController', [
    '$scope',
    'CurrentUser',
    function ($scope, CurrentUser) {
        
        $scope.user = CurrentUser.data; 
        
    }
]);
