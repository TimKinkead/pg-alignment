'use strict';

angular.module('app').controller('AdminController', [
    '$scope',
    '$resource',
    '$http',
    '$window',
    'CurrentUser',
    function ($scope, $resource, $http, $window, CurrentUser) {
        
        var user = $scope.user = CurrentUser.data,
            status = $scope.status = {
                errorMessages: [],
                successMessages: []
            },
            data = $scope.data = {},
            collections = $scope.collections = [
                'error',
                'essay',
                'group',
                'module',
                'rubric',
                'scoresheet',
                'user'
            ],
            initCollections = $scope.initCollections = [
                'rubric',
                'module',
                'group',
                'essay'
            ];
        
        // initialize `data`
        collections.forEach(function(collection) {
            data[collection] = {}; 
        });

        // -------------------------------------------------------------------------------------------------------------
        // Success/Error Messages

        // close error message
        $scope.closeErrorMessage = function(errorIndex) {
            status.errorMessages.splice(errorIndex, 1);
        };

        // close success message
        $scope.closeSuccessMessage = function(successIndex) {
            status.successMessages.splice(successIndex, 1);
        };

        // -------------------------------------------------------------------------------------------------------------
        // Count

        var count = $scope.count = function(collection) {
            status['counting'+collection] = true;
            $http.get('/data/'+collection+'/count', {})
                .success(function(qty) {
                    status['counting'+collection] = false;
                    data[collection].count = Number(qty);
                })
                .error(function(err) {
                    status['counting'+collection] = false;
                    status.errorMessages.push('Error counting '+collection+' docs!');
                });
        };

        // initialize counts
        collections.forEach(function(collection) {
            count(collection);
        });

        // -------------------------------------------------------------------------------------------------------------
        // Count

        var initialize = $scope.initialize = function(collection) {
            if ($window.location.host.indexOf('localhost') < 0 && data[collection].count && !user.admin) {
                status.errorMessages.push('You don\'t have permission to initialize the '+collection+' collection.');
                return;
            }
            status['initializing'+collection] = true;
            var wait = (collection === 'essay') ? 5000 : 1000;
            $http.get('/data/'+collection+'/init', {})
                .success(function() {
                    status.successMessages.push('Initializing '+collection+' collection.');
                    setTimeout(
                        function() {
                            status['initializing'+collection] = false;
                            count(collection);
                        },
                        wait
                    );
                })
                .error(function(err) {
                    status['initializing'+collection] = false;
                    status.errorMessages.push('Error initializing '+collection+' collection!');
                });
        };
        
    }
]);
