'use strict';

angular.module('app').config([
    '$stateProvider',
    function($stateProvider) {

        // -- Home Page --

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'modules/main/home/view.html',
            controller: 'HomeController'
        });

        // -- Welcome Page --

        $stateProvider.state('welcome', {
            url: '/welcome',
            templateUrl: 'modules/main/welcome/view.html',
            controller: 'WelcomeController',
            data: {memberOnly: true}
        });

        // -- User States --

        $stateProvider.state('user', {
            template: '<div ui-view></div>',
            controller: 'UserController',
            abstract: true
        });

        $stateProvider.state('user.signup', {
            url: '/sign-up',
            templateUrl: 'modules/main/user/views/sign-up.html',
            data: {guestOnly: true}
        });
        
        $stateProvider.state('user.login', {
            url: '/login',
            templateUrl: 'modules/main/user/views/login.html',
            data: {guestOnly: true}
        });

        $stateProvider.state('user.settings', {
            url: '/settings',
            templateUrl: 'modules/main/user/views/settings.html',
            data: {memberOnly: true}
        });

        $stateProvider.state('user.forgotpassword', {
            url: '/forgot-password',
            templateUrl: 'modules/main/user/views/forgot-password.html',
            data: {guestOnly: true}
        });

        $stateProvider.state('user.resetpassword', {
            url: '/reset-password',
            templateUrl: 'modules/main/user/views/reset-password.html',
            data: {guestOnly: true}
        });
        
        $stateProvider.state('user.adminsignup', {
            url: '/sign-up/admin',
            templateUrl: 'modules/main/user/views/admin-sign-up.html',
            data: {guestOnly: true}
        });

        // -- Essays --

        $stateProvider.state('essays', {
            url: '/essays?all-essays-graded&modal-check&viewDetails&essay&essayFilterBy&moduleFilterBy',
            templateUrl: 'modules/main/essays/view.html',
            controller: 'EssaysController',
            data: {memberOnly: true}
        });

        // -- Grade --

        $stateProvider.state('grade', {
            url: '/grade?scoresheet&essay&masterScore',
            templateUrl: 'modules/main/grade/view.html',
            controller: 'GradeController',
            data: {memberOnly: true}
        });
        
        // -- Graders --

        $stateProvider.state('graders', {
            url: '/graders',
            templateUrl: 'modules/main/graders/view.html',
            controller: 'GradersController',
            data: {adminOrFacilitator: true}
        });
        
        // -- Graded Work --

        /*$stateProvider.state('graded-work', {
            url: '/graded-work',
            templateUrl: 'modules/main/graded-work/view.html',
            controller: 'GradedWorkController',
            data: {memberOnly: true}
        });*/

        // -- Consensus Scores --

        /*$stateProvider.state('consensus-scores', {
            url: '/consensus-scores',
            templateUrl: 'modules/main/consensus-scores/view.html',
            controller: 'ConsensusScoresController',
            data: {memberOnly: true}
        });*/

        // -- Download --

        $stateProvider.state('download', {
            url: '/download',
            templateUrl: 'modules/main/download/view.html',
            controller: 'DownloadController'
            //data: {adminOnly: true}
        });

        // -- Admin Page --

        $stateProvider.state('admin', {
            url: '/admin',
            templateUrl: 'modules/main/admin/view.html',
            controller: 'AdminController',
            data: {adminOnly: true}
        });
        
    }
]);
