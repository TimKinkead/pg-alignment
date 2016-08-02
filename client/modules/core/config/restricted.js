'use strict';

angular.module('app').run([
    '$rootScope',
    '$state',
    'CurrentUser',
    function($rootScope, $state, CurrentUser) {

        function isLoggedIn() {
            return Boolean(CurrentUser.data && CurrentUser.data._id);
        }

        function isAdmin() {
            return Boolean(isLoggedIn() && CurrentUser.data.admin);
        }

        function isFacilitator() {
            return Boolean(isLoggedIn() && CurrentUser.data.facilitator);
        }

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (toState.data && toState.data.guestOnly && isLoggedIn()) {
                event.preventDefault();
                $state.go('home');
            } else if (toState.data && toState.data.memberOnly && !isLoggedIn()) {
                event.preventDefault();
                $state.go('home');
            } else if (toState.data && toState.data.adminOrFacilitator && !isAdmin() && !isFacilitator()) {
                event.preventDefault();
                $state.go('home');
            } else if (toState.data && toState.data.adminOnly && !isAdmin()) {
                event.preventDefault();
                $state.go('home');
            }
        });
    }
]);