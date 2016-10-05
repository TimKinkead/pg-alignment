'use strict';

/**
 * Angular controller for viewing module details.
 */
angular.module('app').controller('ModuleViewDetailsController', [
    '$scope',
    '$uibModalInstance',
    'info',
    '$http',
    '$resource',
    function ($scope, $modalInstance, info, $http, $resource) {

        // variables
        var status = $scope.status = {},
            moduleDoc = $scope.moduleDoc = null,
            fields = $scope.fields = ['id', 'title', 'description'],
            scoreFields = $scope.scoreFields = ['indicator', 'manual score', 'predicted score'],
            indicators = $scope.indicators = [
                'td1a', 'td1b', 'td1c', 'td1d', 'td1e', 'td1f', 'td1g', 'td1h',
                'td2a', 'td2b', 'td2c',
                'td3a', 'td3b', 'td3c', 'td3d', 'td3e', 'td3f',
                'td4a', 'td4b', 'td4c',
                'ld1a', 'ld1b', 'ld1c',
                'ld2a', 'ld2b', 'ld2c', 'ld2d', 'ld2e', 'ld2f', 'ld2g', 'ld2h', 'ld2i', 'ld2j', 'ld2k',
                'ld3a'
            ];

        // -------------------------------------------------------------------------------------------------------------
        // SCORES
        
        $scope.getScores = function() {
            if (!moduleDoc) {return;}
            if (!moduleDoc.predictedScores) {moduleDoc.predictedScores = {};}
            indicators.forEach(function(indicator) {
                status['processing-'+indicator] = true;
                $http.get('/data/module/predict-indicator-score',
                    {params: {
                        id: moduleDoc._id,
                        indicator: indicator
                    }})
                    .success(function(data) {
                        status['processing-'+indicator] = false;
                        moduleDoc.predictedScores[indicator] = Number(data);
                    })
                    .error(function(err) {
                        status['processing-'+indicator] = false;
                        moduleDoc.predictedScores[indicator] = 'error';
                    });
                
            });
        };
        
        // -------------------------------------------------------------------------------------------------------------
        // MODULE
        
        // get module
        if (!info || !info.moduleId) {
            status.errorMessage = 'Error retrieving module details.';
            return;
        }
        status.processing = true;
        moduleDoc = $scope.moduleDoc = $resource('data/module').get(
            {id: info.moduleId},
            function(data) {
                status.processing = false;
                if (!moduleDoc.manualScores) {
                    scoreFields.splice(scoreFields.indexOf('manual score'), 1);
                }
            },
            function(err) {
                status.processing = false;
                status.errorMessage = 'Error retrieving module details.';
            }
        );

        // cancel & close read modal
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        // get module doc as stringified json
        $scope.getModuleAsJSON = function() {
            return JSON.stringify($scope.mediaDoc, null, 4);
        };

    }
]);