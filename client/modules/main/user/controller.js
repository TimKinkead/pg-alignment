'use strict';

angular.module('app').controller('UserController', [
    '$scope',
    '$http',
    '$resource',
    '$state',
    '$location',
    '$window',
    'CurrentUser',
    function($scope, $http, $resource, $state, $location, $window, CurrentUser) {
        
        var user = $scope.user = {},
            
            window = $scope.window = $window,
            
            status = $scope.status = {},
            params = $scope.params = {},
            
            groups = $scope.groups = [],

            emailRegex = $scope.emailRegex = /.*\@.*\..*/,
            passwordRegex = $scope.passwordRegex = /.{6}/;

        $scope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                [status].forEach(function(item) {
                    for (var key in item) {
                        if (item.hasOwnProperty(key)) {
                            delete item[key];
                        }
                    }
                });
                user.password = null;
            }
        );

        $scope.closeErrorMessage = function() {
            status.errorMessage = null;
        };

        $scope.closeSuccessMessage = function() {
            status.successMessage = null;
        };

        function errorMessage(data) {
            if (data && data.message) {status.message = data.message;}
            status.processing = false;
        }

        function successMessage(message) {
            status.successMessage = message;
            setTimeout(function() {status.successMessage = null;}, 1000);
        }

        // -- AUTHENTICATION --

        /*function errorLoggingIn(data) {
            if (data && data.message) {status.message = data.message;}
            status.processing = false;
        }*/

        function loggedIn(data) {
            if (data && data._id) {
                CurrentUser.data = angular.extend(CurrentUser.data, data);
                $state.go('dashboard');
            } else {
                errorMessage({message: 'We had trouble logging you in. Please try again.'});
            }
        }
        
        // -- SIGN UP --

        // go to sign up state
        $scope.goToSignUp = function() {
            status.errorMessage = null;
            status.clicked = false;
            $state.go('user.signup');
        };
        
        // facilitator / grader sign up
        $scope.toggleFacilitator = function() {
            user.facilitator = !user.facilitator;  
        };
        
        // show password as password vs text
        $scope.toggleShowPassword = function() {
            status.showPassword = !status.showPassword;
        };
        
        // get groups
        status.processingGroups = true;
        groups = $scope.groups = $resource('data/group/list').query(
            {},
            function() {
                status.processingGroups = false;
            },
            function(err) {
                status.processingGroups = false;
                status.errorMessage = (err && err.message) ? err.message : 'We had trouble listing the groups. Please try refreshing the page.';
            }
        );

        // select group
        $scope.selectGroup = function(group) {
            user.group = group;
            var moduleIds = [];
            if (group.modules) {
                group.modules.forEach(function(module) {
                    if (module._id) {
                        moduleIds.push(module._id);
                    }
                });
            }
            user.group.modules = moduleIds;
            status.showGroups = false;
        };
        
        // click sign up button
        $scope.click = function() {
            status.clicked = true;
            return true;
        };
        
        // sign up a new user
        $scope.signUp = function(admin) {
            if (admin) { user.admin = true; }
            status.errorMessage = null;
            status.processing = true;
            $http.post('/data/user/sign-up', user)
                .success(function(newUserData) {
                    status.processing = false;
                    CurrentUser.data = angular.extend(CurrentUser.data, newUserData);
                    $state.go((user.admin) ? 'essays' : 'welcome');
                })
                .error(function(err) {
                    status.processing = false;
                    status.errorMessage = (err && err.message) ? err.message : 'We had trouble signing you up. Please try again.';
                });
        };
        
        // -- LOGIN --
        
        // go to login state
        $scope.goToLogin = function() {
            status.errorMessage = null;
            status.clicked = false;
            $state.go('user.login');
        };
        
        // login an existing user
        $scope.login = function() {
            status.errorMessage = null;
            status.processing = true;
            $http.post('/data/user/login', user)
                .success(function(userData) {
                    status.processing = false;
                    CurrentUser.data = angular.extend(CurrentUser.data, userData);
                    $state.go((userData.admin) ? 'essays' : 'welcome');
                })
                .error(function(err) {
                    status.processing = false;
                    status.errorMessage = (err && err.message) ? err.message : 'We had trouble logging you in. Please try again.';
                });
        };
        
        // -- FORGOT PASSWORD --

        // go to forgot password state
        $scope.goToForgotPassword = function() {
            status.errorMessage = null;
            status.clicked = false;
            $state.go('user.forgotpassword');
        }; 
        
        // send password reset link
        $scope.sendPasswordResetLink = function() {
            status.successMessage = null;
            status.errorMessage = null;
            status.processing = true;
            $http.post('/data/user/forgot-password', user)
                .success(function() {
                    status.processing = false;
                    status.successMessage = 'Reset link sent. Check your email.';
                })
                .error(function(err) {
                    status.processing = false;
                    status.errorMessage = (err && err.message) ? err.message : 'We had trouble sending you a password reset email. Please try again.';
                });
        };

        // -- RESET PASSWORD --

        if ($state.is('user.resetpassword')) {
            var urlQueryParams = $location.search();
            user.email = urlQueryParams.email;
            user.passwordResetCode = urlQueryParams.code;
            $location.search('email', null);
            $location.search('code', null);
            if (!user.email || !user.passwordResetCode) {
                status.errorMessage = 'Reset link error. Please try clicking the link again.';
            }
        }

        // reset password
        $scope.resetPassword = function() {
            status.processing = true;
            $http.post('/data/user/reset-password', user)
                .success(function() {
                    status.processing = false;
                    status.successMessage = 'login';
                })
                .error(function(err) {
                    status.processing = false;
                    status.errorMessage = (err && err.message) ? err.message : 'We had trouble resetting your password. Please try again.';
                });
        };

        // -- SETTINGS --

        var fullUser;
        if ($state.is('user.settings')) {
            status.errorMessage = null;
            status.processing = true;
            user = $scope.user = $resource('data/user/settings').get(
                function() {
                    status.processing = false;
                    fullUser = $scope.fullUser = angular.copy(user);
                },
                function(err) {
                    status.processing = false;
                    status.errorMessage = 'We had trouble retrieving your settings information. Please try again.';
                }
            );
        }
        
        $scope.selectNewGroup = function(group) {
            fullUser.group = group;
            var moduleIds = [];
            if (group.modules) {
                group.modules.forEach(function(module) {
                    if (module._id) {
                        moduleIds.push(module._id);
                    }
                });
            }
            fullUser.group.modules = moduleIds;
            status.editGroup = false;
        };

        // update settings
        $scope.updateSettings = function() {
            status.successMessage = null;
            status.errorMessage = null;

            // check params
            if (fullUser.firstName !== user.firstName) {
                params.firstName = fullUser.firstName;
            }
            if (fullUser.lastName !== user.lastName) {
                params.lastName = fullUser.lastName;
            }
            if (fullUser.email !== user.email) {
                params.email = fullUser.email;
            }
            if (fullUser.newPassword && !fullUser.password) {
                status.errorMessage = 'Please provide your current password if you want to set a new password.';
                return;
            }
            if (fullUser.newPassword && fullUser.password) {
                params.newPassword = fullUser.newPassword;
                params.password = fullUser.password;
            }
            if (fullUser.group && (!user.group || fullUser.group._id !== user.group._id)) {
                params.group = fullUser.group;
            }
            if (fullUser.facilitator !== user.facilitator) {
                params.facilitator = fullUser.facilitator;
            }

            // update settings
            status.processing = true;
            $http
                .put('/data/user/settings', params)
                .success(function() {
                    status.processing = false;
                    status.successMessage = 'Settings Updated';
                    fullUser.newPassword = null;
                    fullUser.password = null;
                    ['editFirstName', 'editLastName', 'editEmail', 'editPassword', 'editGroup', 'editRole'].forEach(function(item) {
                        status[item] = false;
                    });
                })
                .error(function(err) {
                    status.processing = false;
                    status.errorMessage = (err && err.message) ? err.message : 'We had trouble updating your settings. Please try again';
                });
        };
    }
]);