'use strict';

/**
 * angular controller for essay detail modal
 */
angular.module('app').controller('EssayDetailModalController', [
    '$scope',
    '$uibModalInstance',
    '$resource',
    '$state',
    'CurrentUser',
    'essayId',
    function ($scope, $modalInstance, $resource, $state, CurrentUser, essayId) {

        // variables
        var user = $scope.user = CurrentUser.data,
            status = $scope.status = {},
            essay = $scope.essay = null,
            scoresheets = $scope.scoresheets = [],
            fields = $scope.fields = ['grader'];

        // close modal
        $scope.cancel = function() {
            $modalInstance.dismiss();
        };

        // get essay
        essay = $scope.essay = $resource('data/essay').get(
            {essay: essayId, full: true},
            function() {

                // construct user map
                var userMap = {};
                essay.gradedBy.forEach(function(user) {
                    if (user && user._id) {
                        userMap[user._id] = user;
                    }
                });

                // grab score sheets
                var masterScore = false;
                essay.scoresheets.forEach(function(scoresheet) {
                    if (user.admin || user.facilitator || scoresheet.masterScore || scoresheet.user.toString() === user._id.toString()) {
                        scoresheet.user = userMap[scoresheet.user];
                        scoresheets.push(scoresheet);
                        if (scoresheet.masterScore) { masterScore = true; }
                        
                        // grab fields
                        for (var key in scoresheet.score) {
                            if (scoresheet.score.hasOwnProperty(key)) {
                                if (fields.indexOf(key) < 0) {
                                    fields.push(key);
                                }
                            }
                        }
                    }
                });
                if (essay.masterScore && !masterScore) { status.noMasterScore = true; }

                // add average score field
                fields.push('avg score');
                
                // add edit field if admin
                if (user.admin) { fields.push('edit'); }

            },
            function(err) {
                status.errorMessage = 'We had trouble loading the scores. Please try again.';
            }
        );
        
        $scope.adminAddGrade = function(essay) {
            $modalInstance.dismiss();
            $state.go('grade', {essay: essay._id});
        };

        $scope.adminEditGrade = function(scoresheet) {
            $modalInstance.dismiss();
            $state.go('grade', {scoresheet: scoresheet._id, masterScore: scoresheet.masterScore});
        };

    }
]);
