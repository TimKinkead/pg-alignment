'use strict';

/**
 * angular controller for grade state error modal
 */
angular.module('app').controller('GradeModalErrorController', [
    '$scope',
    '$uibModalInstance',
    'info',
    function ($scope, $modalInstance, info) {

        // append info to scope
        $scope = angular.extend($scope, info);

        // close modal
        $scope.cancel = function() {
            $modalInstance.dismiss();
        };

    }
]);
