'use strict';

angular.module('app').controller('DownloadController', [
    '$scope',
    '$window',
    '$uibModal',
    function ($scope, $window, $modal) {

        var status = $scope.status = {};

        // -------------------------------------------------------------------------------------------------------------
        // Alerts
        
        // close error message
        $scope.closeErrorMessage = function() {
            status.errorMessage = null;
        };

        // close success message
        $scope.closeSuccessMessage = function() {
            status.successMessage = null;
        };

        function removeSuccessMessage(ms) {
            setTimeout(
                function() {
                    status.successMessage = null;
                    $scope.$digest();
                },
                ms
            );
        }

        // -------------------------------------------------------------------------------------------------------------
        // Download
        
        // download csv
        $scope.downloadGradedWorkCSV = function() {
            $window.location.href = 'http://'+$window.location.host+'/data/scoresheet/download';
            status.successMessage = 'Download in progress.';
            removeSuccessMessage(3000);
        };

        // download tsv
        $scope.downloadGradedWorkTSV = function() {
            $window.location.href = 'http://'+$window.location.host+'/data/scoresheet/download?delimiter=tab';
            status.successMessage = 'Download in progress.';
            removeSuccessMessage(3000);
        };

        // download sri
        $scope.downloadGradedWorkSRI = function() {
            $window.location.href = 'http://'+$window.location.host+'/data/scoresheet/download/sri';
            status.successMessage = 'Download in progress.';
            removeSuccessMessage(5000);
        };
        
    }
]);
