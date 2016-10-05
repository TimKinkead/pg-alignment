'use strict';

/**
 * angular controller for modules
 */
angular.module('app').controller('ModulesController', [
    '$scope',
    '$resource',
    '$http',
    '$timeout',
    '$uibModal',
    function ($scope, $resource, $http, $timeout, $modal) {

        // variables
        var status = $scope.status = {},
            params = $scope.params = {
                filterBy: 'manual scores'
            },
            
            errorMessages = $scope.errorMessages = [],
            successMessages = $scope.successMessages = [],

            modules = $scope.modules = [],
            summary = $scope.summary = {},
            
            fields = $scope.fields = ['no', 'id', 'title', 'manual scores', 'predicted scores', 'view details'];
        
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
        // Summary

        // get summary info
        status.processingSummary = true;
        summary = $scope.summary = $resource('data/module/summary').get(
            {},
            function() {
                status.processingSummary = false;
            },
            function(err) {
                status.processingSummary = false;
                errorMessages.push('Could not get summary.');
            }
        );


        // -------------------------------------------------------------------------------------------------------------
        // Modules
        
        // get modules
        function getModules() {
            status.processing = true;
            modules = $scope.modules = $resource('data/module/list').query(
                {filterBy: params.filterBy},
                function() {
                    status.processing = false;
                },
                function(err) {
                    status.processing = false;
                    errorMessages.push((err && err.message) ? err.message : 'Error! Could not get modules. Please try refreshing the page.');
                }
            );
        }
        getModules();

        // view module details
        $scope.viewDetails = function(moduleId) {
            var modalInstance = $modal.open({
                templateUrl: 'modules/main/modules/view-details/view.html',
                controller: 'ModuleViewDetailsController',
                resolve: {info: {moduleId: moduleId}}
            });
            modalInstance.result.then(
                function() { console.log('close modal'); },
                function() { console.log('dismiss modal'); }
            );
        };

        // -------------------------------------------------------------------------------------------------------------
        // Watch

        $scope.$watch('params.filterBy', function(nV, oV) {
            if (nV !== oV) {
                getModules();
            }
        });
    }
]);
