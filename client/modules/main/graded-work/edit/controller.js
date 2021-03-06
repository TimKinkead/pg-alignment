'use strict';

/**
 * Angular controller for creating a new grader.
 */
angular.module('app').controller('GradedWorkEditController', [
    '$scope',
    '$uibModalInstance',
    '$http',
    '$resource',
    'CurrentUser',
    'scoresheet',
    function ($scope, $modalInstance, $http, $resource, CurrentUser, scoresheet) {

        // variables
        var user = $scope.user = CurrentUser.data,
            
            status = $scope.status = {},
            params = $scope.params = scoresheet,

            rubric = $scope.rubric = null,
            rubrics = $scope.rubrics = [];
        
        // close create modal
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        // close error message
        $scope.closeErrorMessage = function() {
            status.errorMessage = null;
        };
        
        // grader / graders
        if (user.admin) {
            status.processingGraders = true;
            $scope.graders = $resource('/data/user/list').query(
                {namesOnly: true},
                function() {
                    status.processingGraders = false;
                },
                function(err) {
                    status.processingGraders = false;
                    status.errorMessage = (err && err.message) ? err.message : 'We had trouble listing the graders. Please close the modal and try again.';
                }
            );
        } else {
            params.grader = user._id;
        }
        
        // get student work
        // TODO - finish

        // get rubrics
        status.processingRubrics = true;
        rubrics = $scope.rubrics = $resource('/data/rubric/list').query(
            {},
            function() {
                status.processingRubrics = false;
                for (var i=0, x=rubrics.length; i<x; i++) {
                    if (rubrics[i]._id.toString() === scoresheet.rubric._id.toString()) {
                        rubric = $scope.rubric = rubrics[i];
                        break;
                    }
                }
            },
            function(err) {
                status.processingRubrics = false;
                status.errorMessage = (err && err.message) ? err.message : 'We had trouble getting the list of rubrics. Please close the modal and try again.';
            }
        );

        // show all fields
        $scope.showAll = function() {
            status.showAll = true;
            for (var i=0, x=rubric.fields.length; i<x; i++) {
                rubric.fields[i].visible = true;
            }
        };
        
        // hide all fields
        $scope.hideAll = function() {
            status.showAll = false;
            for (var i=0, x=rubric.fields.length; i<x; i++) {
                rubric.fields[i].visible = false;
            }
        };
        
        // score a field
        $scope.scoreField = function(fieldIndex, fieldName, score) {
            // save score & hide current rubric field
            params.score[fieldName] = score;
            rubric.fields[fieldIndex].visible = false;
            // check form validity
            status.clicked = false;
            loop: {
                for (var i=0, x=rubric.fields.length; i<x; i++) {
                    if (!params.score[rubric.fields[i].name]) {
                        status.formValid = false;
                        break loop;
                    }
                }
                status.formValid = true;
            }
        };

        // edit a field
        $scope.editField = function(fieldIndex) {
            rubric.fields[fieldIndex].visible = true;
        };

        // click save button
        $scope.click = function() {
            status.clicked = true;
            return true;
        };

        // save score sheet changes
        $scope.save = function() {
            if (!status.formValid) { return; }
            status.processing = true;
            console.log(JSON.stringify(params, null, 4));
            params.scoresheet = params._id;
            delete params._id;
            $http.put('data/scoresheet', params)
                .success(function(newScoreSheet) {
                    status.processing = false;
                    newScoreSheet.user = user;
                    newScoreSheet.rubric = rubric;
                    $modalInstance.close(newScoreSheet);
                })
                .error(function(err) {
                    status.processing = false;
                    status.errorMessage = (err && err.message) ? err.message : 'We had trouble saving your score sheet. Please try again.';
                });
        };
        
        // watch parameter changes
        $scope.$watch('params.rubric', function(nV, oV) {
            if (nV !== oV) {
                for (var i=0, x=rubrics.length; i<x; i++) {
                    if (nV._id === rubrics[i]._id) {
                        rubric = $scope.rubric = rubrics[i];
                        //rubric.fields[0].visible = true;
                        //$scope.$digest();
                        //console.log(JSON.stringify(rubric.fields));
                        break;
                    }
                }
            }
        });
    }
]);