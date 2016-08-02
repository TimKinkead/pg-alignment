'use strict';

/**
 * Angular controller for creating a new grader.
 */
angular.module('app').controller('GradersCreateController', [
    '$scope',
    '$uibModalInstance',
    '$http',
    '$resource',
    function ($scope, $modalInstance, $http, $resource) {

        // variables
        var status = $scope.status = {},
            params = $scope.params = {},
            
            emailRegex = $scope.emailRegex = /.*\@.*\..*/;

        // close create modal
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        
        // close error message
        $scope.closeErrorMessage = function() {
            status.errorMessage = null;
        };
        
        // click register button
        $scope.click = function() {
            status.clicked = true;
            return true;
        };

        // save new grader
        $scope.save = function() {
            status.clicked = true;
            status.processing = true;
            $http.post('data/grader', params)
                .success(function(newGrader) {
                    status.processing = false;
                    $modalInstance.close(newGrader);
                })
                .error(function(err) {
                    status.processing = false;
                    status.errorMessage = (err && err.message) ? err.message : 'We had trouble registering you. Please try again.';
                });
        };
        
    }
]);