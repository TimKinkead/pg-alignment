'use strict';

/**
 * angular controller for grade state modal
 */
angular.module('app').controller('GradeModalController', [
    '$scope',
    '$uibModalInstance',
    function ($scope, $modalInstance) {

        var status = $scope.status = {},
            params = $scope.params = {};

        // close modal
        $scope.cancel = function() {
            $modalInstance.dismiss();
        };

        // next essay
        $scope.nextEssay = function() {
            $modalInstance.close();
        };

        // back to essays
        $scope.backToEssays = function() {
            $modalInstance.close('essays');
        };

        // click skip button
        $scope.clickSkip = function() {
            status.clicked = true;
            return true;
        };

        // skip with reason
        $scope.skip = function() {
            $modalInstance.close(params.reason);
        };

        // review master scores
        $scope.reviewMasterScores = function() {
            $modalInstance.close('check-scores');
        };

        // review consensus scores
        $scope.reviewConsensusScores = function() {
            $modalInstance.close('consensus-scores');
        };
    }
]);
