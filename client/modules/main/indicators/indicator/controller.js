'use strict';

/**
 * angular controller for indicators
 */
angular.module('app').controller('IndicatorController', [
    '$scope',
    '$stateParams',
    '$state',
    '$window',
    '$resource',
    '$http',
    '$timeout',
    '$uibModal',
    function ($scope, $stateParams, $state, $window, $resource, $http, $timeout, $modal) {

        // variables
        var status = $scope.status = {},
            params = $scope.params = {
                indicatorId: $stateParams.indicator,
                prevIndicator: null,
                nextIndicator: null
            },
            
            errorMessages = $scope.errorMessages = [],
            successMessages = $scope.successMessages = [],

            indicator = $scope.indicator = {},
            indicators = $scope.indicators = [],
            
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

        // get indicator
        status.processing = true;
        indicator = $scope.indicator = $resource('data/indicator').get(
            {indicator: params.indicatorId},
            function() {
                $timeout(
                    function() { status.processing = false; },
                    250
                );
            },
            function(err) {
                status.processing = false;
                errorMessages.push((err && err.message) ? err.message : 'Error! Could not get indicator info. Please try refreshing the page.');
            }
        );

        // get previous & next indicators
        function getPrevAndNextIndicators() {
            params.prevIndicator = null;
            params.nextIndicator = null;
            indicators.forEach(function(indicator, indicatorIndex) {
                 if (indicator.id === params.indicatorId) {
                     if (indicators[indicatorIndex-1]) {
                         params.prevIndicator = indicators[indicatorIndex-1].id;
                     }
                     if (indicators[indicatorIndex+1]) {
                         params.nextIndicator = indicators[indicatorIndex+1].id;
                     }
                 }
            });
        }

        // get list of indicators
        status.processingIndicators = true;
        indicators = $scope.indicators = $resource('data/indicator/list').query(
            {},
            function() {
                status.processingIndicators = false;
                getPrevAndNextIndicators();
            },
            function(err) {
                status.processingIndicators = false;
                errorMessages.push((err && err.message) ? err.message : 'Error! Could not get indicators. Please try refreshing the page.');
            }
        );

        // change indicator
        $scope.goToIndicator = function(indicatorId) {
            $state.go('indicator', {indicator: indicatorId});
        };

        // -------------------------------------------------------------------------------------------------------------
        // External Links

        $scope.openInAzureStudio = function(indicator) {
            if (!indicator || !indicator.azureStudio) {
                errorMessages.push('Link to model in Azure Studio is not defined. Perhaps the model has not been built yet.');
                return;
            }
            $window.open(indicator.azureStudio, '_blank');
        };

        $scope.viewApiEndpointDocs = function(indicator) {
            if (!indicator || !indicator.apiDocs) {
                errorMessages.push('Link to API endpoint docs not defined. Perhaps the web service has not be set up yet.');
                return;
            }
            $window.open(indicator.apiDocs, '_blank');
        };

        // -------------------------------------------------------------------------------------------------------------
        // Watch Parameter Changes

        /*$scope.$watch('$stateParams.indicator', function(nV, oV) {
            console.log('indicator '+nV);
            if (nV != oV) {
                params.indicatorId = $stateParams.indicator;
                getIndicator();
                getPrevAndNextIndicators();
            }
        });*/

    }
]);
