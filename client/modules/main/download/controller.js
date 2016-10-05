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
        $scope.downloadIndicatorCategoryDatasets = function() {
            $window.location.href = 'http://'+$window.location.host+'/data/module/download-datasets';
            status.successMessage = 'Download in progress.';
            removeSuccessMessage(10000);
        };
        
    }
]);
