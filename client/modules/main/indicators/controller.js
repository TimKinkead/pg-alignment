'use strict';

/**
 * angular controller for indicators
 */
angular.module('app').controller('IndicatorsController', [
    '$scope',
    '$resource',
    '$state',
    '$http',
    '$timeout',
    '$uibModal',
    function ($scope, $resource, $state, $http, $timeout, $modal) {

        // variables
        var status = $scope.status = {},
            params = $scope.params = {},
            
            errorMessages = $scope.errorMessages = [],
            successMessages = $scope.successMessages = [],

            indicators = $scope.indicators = {},
            
            fields = $scope.fields = ['no', 'id'];
        
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
        // Indicators
        
        // get indicators info
        status.processing = true;
        indicators = $scope.indicators = $resource('data/indicator/info').get(
            {},
            function() {
                status.processing = false;
            },
            function(err) {
                status.processing = false;
                errorMessages.push((err && err.message) ? err.message : 'Error! Could not get indicators. Please try refreshing the page.');
            }
        );

        // show indicator details
        $scope.showIndicatorDetails = function(indicatorId) {
            $state.go('indicator', {indicator: indicatorId});
        };

    }
]);
