'use strict';

/**
 * angular controller for graders
 */
angular.module('app').controller('GradersController', [
    '$scope',
    '$resource',
    '$http',
    '$timeout',
    '$uibModal',
    'CurrentUser',
    function ($scope, $resource, $http, $timeout, $modal, CurrentUser) {

        // variables
        var user = $scope.user = CurrentUser.data,
            
            status = $scope.status = {},
            params = $scope.params = {},
            
            errorMessages = $scope.errorMessages = [],
            successMessages = $scope.successMessages = [],

            graders = $scope.graders = [],
            modules = $scope.modules = [],
            modulesMap = $scope.modulesMap = {},
            
            fields = $scope.fields = (user.admin) ? 
                ['no', 'id', 'name', 'email', 'group', 'graded essays', 'check scores', 'facilitator', 'admin'] :
                ['no', 'id', 'name', 'email', 'graded essays', 'check scores', 'facilitator'];
        
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
        // Modules

        // get modules
        status.processingModules = true;
        modules = $scope.graders = $resource('data/module/list').query(
            {},
            function() {
                status.processingModules = false;
                modules.forEach(function(module) {
                    if (module && module._id) {
                        modulesMap[module._id] = module;
                    } 
                });
            },
            function(err) {
                status.processingModules = false;
            }
        );

        // get group tooltip
        $scope.getGroupTooltip = function(group) {
            var tooltip = '';
            if (group) {
                if (group.subject) { tooltip += group.subject; }
                if (group.modules && group.modules.length) {
                    var moduleNames = [];
                    group.modules.forEach(function(moduleId) {
                        if (modulesMap[moduleId] && modulesMap[moduleId].name) {
                            moduleNames.push(modulesMap[moduleId].name);
                        }
                    });
                    if (moduleNames.length) {
                        tooltip += '<br>('+moduleNames.join(', ')+')';
                    }
                }
            }
            return tooltip;
        };

        // -------------------------------------------------------------------------------------------------------------
        // Graders
        
        // get graders
        status.processing = true;
        graders = $scope.graders = $resource('data/grader/list').query(
            {},
            function() {
                status.processing = false;
            },
            function(err) {
                status.processing = false;
                errorMessages.push((err && err.message) ? err.message : 'Error! Could not list graders. Please try refreshing the page.');
            }
        );
        
        // create new grader
        $scope.newGrader = function(grader) {
            var modalInstance = $modal.open({
                templateUrl: 'modules/main/graders/create/view.html',
                controller: 'GradersCreateController',
                backdrop: 'static'
            });
            modalInstance.result.then(
                function(grader) { // close
                    graders.push(grader);
                },
                function(msg) { // dismiss
                    console.log(msg || 'dismiss');
                }
            );
        };
        
        // edit existing grader
        $scope.editGrader = function(grader) {
            console.log('edit grader');  
        };
        
    }
]);
