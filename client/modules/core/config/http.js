'use strict';

angular.module('app').config([
    '$httpProvider',
    function ($httpProvider) {
        $httpProvider.defaults.headers.delete = {
            'Content-Type': 'application/json;charset=utf-8'
        };

        // -----
        // TODO: only set for IE
        // http://www.oodlestechnologies.com/blogs/AngularJS-caching-issue-for-Internet-Explorer
        $httpProvider.defaults.cache = false;
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        // disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

        // -----
        // Set the httpProvider "not authorized" interceptor
        /*var errorModal;
        $httpProvider.interceptors.push(['$q', '$injector',
            function($q, $injector) {
                return {
                    responseError: function(rejection) {
                        // delay injection - otherwise circular reference
                        var $rootScope = $injector.get('$rootScope'),
                            modal = $injector.get('ErrorModal');

                        if (errorModal) {
                            return $q.reject(rejection);
                        }

                        errorModal = true;
                        function closeEvent() {
                            errorModal = false;
                            $rootScope.$broadcast('CloseErrorModal');
                        }
                        modal.open(rejection, closeEvent);

                        return $q.reject(rejection);
                    }
                };
            }
        ]);*/
    }
]);
