/**
 * Angular Application
 * - This file is the root of the front-end angular application.
 * - It initializes and configures the app.
 */

// this starts the angular application

'use strict';

try {

    // initialize angular app & inject global dependencies
    var app = angular.module('app', [
        'ui.router',
        'ui.bootstrap',
        'ngResource',
        'ngSanitize',
        'divResizer', // custom directive
        'angularResizable'
    ]);

    // configure angular app
    app.config([
        '$locationProvider',
        '$urlRouterProvider',
        function($locationProvider, $urlRouterProvider) {

            // get rid of #!/ - https://docs.angularjs.org/error/$location/nobase
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: true
            });

            // set default path
            $urlRouterProvider.otherwise('/');
        }
    ]);

    // IE 9 redirect
    if (window.ie9 && !window.location.hash &&
        window.location.pathname.length <= 1) {
        console.log('IE 9 requires # for client side routing.');
        window.location.assign('/#/' + window.location.search);
    }

} catch (e) {

    console.log(e);
    window.location.assign('/unsupported');

}
