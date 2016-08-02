'use strict';

/**
 * angular controller for consensus scores
 */
angular.module('app').controller('ConsensusScoresController', [
    '$scope',
    '$resource',
    '$http',
    '$timeout',
    '$uibModal',
    '$state',
    'CurrentUser',
    function ($scope, $resource, $http, $timeout, $modal, $state, CurrentUser) {

        // variables
        var status = $scope.status = {},
            params = $scope.params = {},
            
            errorMessages = $scope.errorMessages = [],
            successMessages = $scope.successMessages = [],
            
            fields = $scope.fields = ['no', 'date', 'grader', 'essay', 'rubric', 'score', 'edit'];

        // -------------------------------------------------------------------------------------------------------------
        // User

        // get user
        $scope.user = CurrentUser.data;
        
        // -------------------------------------------------------------------------------------------------------------
        // Success/Error Messages
        
        // close error message
        $scope.closeErrorMessage = function(errorIndex) {
            errorMessages.splice(errorIndex, 1);
        };

        // close success message
        $scope.closeSuccessMessage = function(successIndex) {
            successMessages.splice(successIndex, 1);
        };

        // -------------------------------------------------------------------------------------------------------------
        // Score Sheets
        
        // get score sheets
        status.processing = true;
        var scoresheets = $scope.scoresheets = $resource('data/scoresheet/list-consensus').query(
            {},
            function() {
                status.processing = false;
            },
            function(err) {
                status.processing = false;
                errorMessages.push((err && err.message) ? err.message : 
                'Error! We had trouble retrieving the consensus scores. Please try refreshing the page.');
            }
        );

        // view details
        $scope.viewDetails = function(essayId) {
            var modalInstance = $modal.open({
                templateUrl: 'modules/main/consensus-scores/modal/view.html',
                controller: 'ConsensusScoresModalController',
                size: 'xl',
                resolve: {
                    scoresheets: function() {
                        var compareSheets = [];
                        scoresheets.forEach(function(sheet) {
                            if (sheet.essay.id === essayId) {
                                compareSheets.push(sheet);
                            }
                        });
                        return compareSheets;
                    }
                }
            });
            modalInstance.result.then(
                function() { console.log('close'); },
                function(msg) { console.log('dismiss'); }
            );
        };

        // -------------------------------------------------------------------------------------------------------------
        // Watch Parameter Changes

        $scope.$watch('params.param', function(nV, oV) {
            if (nV !== oV) { console.log(nV); }
        });
    }
]);
