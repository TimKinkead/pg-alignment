'use strict';

/**
 * angular controller for consensus scores modal
 */
angular.module('app').controller('ConsensusScoresModalController', [
    '$scope',
    '$uibModalInstance',
    'scoresheets',
    function ($scope, $modalInstance, scoresheets) {

        $scope.scoresheets = scoresheets;

        // grab all scored fields
        var fields = $scope.fields = ['grader', 'rubric'];
        scoresheets.forEach(function(sheet) {
            for (var key in sheet.score) {
                if (sheet.score.hasOwnProperty(key)) {
                    if (fields.indexOf(key) < 0) {
                        fields.push(key);
                    }
                }
            }
        });

        // close modal
        $scope.cancel = function() {
            $modalInstance.dismiss();
        };

    }
]);
