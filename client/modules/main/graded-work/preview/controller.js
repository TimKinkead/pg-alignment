'use strict';

/**
 * angular controller for consensus scores modal
 */
angular.module('app').controller('GradedWorkPreviewController', [
    '$scope',
    '$uibModalInstance',
    'scoresheet',
    function ($scope, $modalInstance, scoresheet) {

        $scope.scoresheet = scoresheet;

        // grab all scored fields
        var fields = $scope.fields = [];
        for (var key in scoresheet.score) {
            if (scoresheet.score.hasOwnProperty(key)) {
                if (fields.indexOf(key) < 0) {
                    fields.push(key);
                }
            }
        }

        // close modal
        $scope.cancel = function() {
            $modalInstance.dismiss();
        };

    }
]);
