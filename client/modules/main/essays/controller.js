'use strict';

/**
 * angular controller for graded work
 */
angular.module('app').controller('EssaysController', [
    '$scope',
    '$rootScope',
    '$resource',
    '$http',
    '$timeout',
    '$uibModal',
    '$state',
    '$stateParams',
    '$window',
    'CurrentUser',
    function ($scope, $rootScope, $resource, $http, $timeout, $modal, $state, $stateParams, $window, CurrentUser) {

        // variables
        var user = $scope.user = CurrentUser.data,
            
            status = $scope.status = {
                essayFilterBy: (user.admin) ? 'master scores' : 'my essays',
                moduleFilterBy: null
            },
            params = $scope.params = {},

            errorMessages = $scope.errorMessages = [],
            successMessages = $scope.successMessages = [],
            
            essayFilterOptions = $scope.essayFilterOptions = (user.admin) ?
                ['master scores', 'graded essays', 'ungraded essays', 'all essays'] :
                (
                    user.facilitator ?
                    ['my essays', 'master scores', 'graded essays', 'ungraded essays', 'all essays'] :
                    ['my essays', 'all essays']
                ),

            essayStats = $scope.essayStats = {},
            
            essayRefreshTime = ($window.location.host.indexOf('localhost') > -1) ? 10000 : 30000,

            essays = $scope.essays = [],
            modules = $scope.modules = [],
            
            fields = $scope.fields = (user.admin) ?
                ['no', 'id', 'module', 'being graded by', 'skipped by', 'graded by', 'everyone', 'master score', 'details'] :
                (
                    user.facilitator ?
                        ['no', 'id', 'module', 'being graded by', 'skipped by', 'graded by', 'everyone', 'master score', 'grade', 'details'] :
                        ['no', 'id', 'module', 'in progress', 'skipped', 'graded', 'master score', 'grade']
                );
        
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
        // Essays

        function getEssayFlags(essay) {
            var flags = {
                beingGradedBy: 0,
                beingGradedByYou: false,
                skippedBy: 0,
                skippedByYou: false,
                wasGradedBy: 0,
                wasGradedByYou: false,
                yourScoreSheet: null,
                masterScoreSheet: null
            };
            if (essay.graders && essay.graders.length) {
                var resumeGrading = false;
                essay.graders.forEach(function(grader) {
                    flags.beingGradedBy++;
                    if (grader.toString() === user._id.toString()) {
                        flags.beingGradedByYou = true;
                        resumeGrading = true;
                    }
                });
                status.resumeGrading = resumeGrading;
            }
            if (essay.skip && essay.skip.length) {
                essay.skip.forEach(function(skipObj) {
                    flags.skippedBy++;
                    if (skipObj.user && skipObj.user.toString() === user._id.toString()) {
                        flags.skippedByYou = true;
                    }
                });
            }
            if (essay.scoresheets && essay.scoresheets.length) {
                essay.scoresheets.forEach(function(scoresheet) {
                    if (!scoresheet.masterScore) {
                        flags.wasGradedBy++;
                    } else {
                        flags.masterScoreSheet = scoresheet;
                    }
                    if (scoresheet.user && scoresheet.user.toString() === user._id.toString()) {
                        flags.wasGradedByYou = true;
                        flags.yourScoreSheet = scoresheet;
                    }
                });
            }
            return flags;
        }

        function showHideEssay(essay) {
            var visible;
            switch (status.essayFilterBy) {
                case 'all essays':
                    visible = true;
                    break;
                case 'master scores':
                    visible = Boolean(essay.masterScore);
                    break;
                case 'graded essays':
                    visible = Boolean(essay.wasGradedBy);
                    break;
                case 'ungraded essays':
                    visible = Boolean(!essay.wasGradedBy);
                    break;
                case 'my essays':
                    visible = Boolean(essay.beingGradedByYou || essay.skippedByYou || essay.wasGradedByYou);
                    break;
                default:
                    visible = true;
            }
            if (status.moduleFilterBy) {
                if (essay.module._id !== status.moduleFilterBy) {
                    visible = false;
                }
            }
            return visible;
        }

        function filterEssays() {
            status.processingEssays = true;
            essays.forEach(function(essay) {
                essay.visible = showHideEssay(essay);
            });
            setTimeout(function() { status.processingEssays = false; }, 1);
        }

        // refresh essay info
        var refreshEssays = function() {
            console.log('refreshEssays');
            if ($state.current.name !== 'essays') { return; }
            $http.get('data/essay/list', {})
                .success(function(newEssays) {
                    var newFlagsByEssayId = {};
                    newEssays.forEach(function(newEssay) {
                        newFlagsByEssayId[newEssay._id] = getEssayFlags(newEssay);
                    });
                    essays.forEach(function(essay) {
                        var newFlags = newFlagsByEssayId[essay._id];
                        if (newFlags) {
                            essay = angular.extend(essay, newFlags);
                        }
                    });
                    setTimeout(refreshEssays, essayRefreshTime);
                })
                .error(function(err) {
                    console.log(err);
                });
        };
        
        // get essays
        status.processingEssays = true;
        essays = $scope.essays = $resource('data/essay/list').query(
            {},
            function() {
                status.processingEssays = false;
                essays.forEach(function(essay) {
                    essay = angular.extend(essay, getEssayFlags(essay));
                    essay.visible = showHideEssay(essay);
                });
                if (user.admin || user.facilitator) {
                    setTimeout(refreshEssays, essayRefreshTime);
                }
            },
            function(err) {
                status.processingEssays = false;
                errorMessages.push((err && err.message) ? err.message : 
                'Error! We had trouble listing the essays. Please try refreshing the page.');
            }
        );

        // -------------------------------------------------------------------------------------------------------------
        // Modules
        
        // get modules
        status.processingModules = true;
        modules = $scope.modules = $resource('data/module/list').query(
            {},
            function() {
                status.processingModules = false;
            },
            function(err) {
                status.processingModules = false;
            }
        );
        
        // -------------------------------------------------------------------------------------------------------------
        // View Details Modal

        var viewDetails = $scope.viewDetails = function(essayId) {
            var modalInstance = $modal.open({
                templateUrl: 'modules/main/essays/modal-detail/view.html',
                controller: 'EssayDetailModalController',
                size: 'xl',
                resolve: {
                    essayId: function() {
                        return essayId;
                    }
                }
            });
            modalInstance.result.then(
                function() { console.log('close'); },
                function(msg) { console.log('dismiss'); }
            );
        };

        // -------------------------------------------------------------------------------------------------------------
        // Master Score Comparison Modal

        var checkMasterScore = $scope.checkMasterScore = function(essayId) {
            var modalInstance = $modal.open({
                templateUrl: 'modules/main/essays/modal-check/view.html',
                controller: 'MasterScoreModalController',
                size: 'xl',
                resolve: {
                    essayId: function() {
                        return essayId;
                    }
                }
            });
            modalInstance.result.then(
                function() { console.log('close'); },
                function(msg) { console.log('dismiss'); }
            );
        };

        // -------------------------------------------------------------------------------------------------------------
        // Styling

        $scope.gradeButtonNgClass = function(essay) {
            var ngClassObj = {};
            if (essay.beingGradedByYou) {
                ngClassObj['btn-danger'] = true;
            } else if (essay.wasGradedByYou) {
                ngClassObj['btn-info'] = true;
            } else if (essay.skippedByYou) {
                ngClassObj['btn-default'] = true;
            } else {
                ngClassObj['btn-success'] = true;
            }
            return ngClassObj;
        };

        $scope.gradeButtonText = function(essay) {
            if (essay.beingGradedByYou && essay.wasGradedByYou) {
                return 'finish editing';
            } else if (essay.beingGradedByYou) {
                return 'finish grading';
            } else if (essay.wasGradedByYou) {
                return 'edit score';
            } else {
                return 'grade now';
            }
        };

        // -------------------------------------------------------------------------------------------------------------
        // Url Query Params

        function updateQueryParams() {
            var changed = false;
            ['essayFilterBy', 'moduleFilterBy'].forEach(function(param) {
                if (status[param] !== $stateParams[param]) {
                    $stateParams[param] = status[param];
                    changed = true;
                }
            });
            if ((user.admin || user.facilitator) && changed) {
                $state.go($state.$current, $stateParams, {notify: false, reload: false});
            }
        }

        if ($stateParams.essayFilterBy) {
            status.essayFilterBy = $stateParams.essayFilterBy;
        }

        if ($stateParams.moduleFilterBy) {
            status.moduleFilterBy = $stateParams.moduleFilterBy;
        }

        if ($stateParams['all-essays-graded']) {
            status.allEssaysGraded = true;
            $stateParams['all-essays-graded'] = null;
            $state.go($state.$current, $stateParams, {notify: false, reload: false});
        }

        if ($stateParams['modal-check']) {
            if ($stateParams.essay) {
                checkMasterScore($stateParams.essay);
            }
            $stateParams['modal-check'] = null;
            $stateParams.essay = null;
            $state.go($state.$current, $stateParams, {notify: false, reload: false});
        }

        if ($stateParams.viewDetails) {
            if ($stateParams.essay) {
                viewDetails($stateParams.essay);
            }
            $stateParams.viewDetails = null;
            $stateParams.essay = null;
            $state.go($state.$current, $stateParams, {notify: false, reload: false});
        }

        // -------------------------------------------------------------------------------------------------------------
        // Events

        /* Not necessary
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            console.log(toState);
            if (toState.name === 'essays') {
                setTimeout(refreshEssays, 10000);
            }
        });
        */

        // -------------------------------------------------------------------------------------------------------------
        // Watch Parameter Changes

        $scope.$watch('status.essayFilterBy', function(nV, oV) {
            if (nV !== oV) {
                filterEssays();
                updateQueryParams();
            }
        });

        $scope.$watch('status.moduleFilterBy', function(nV, oV) {
            if (nV !== oV) {
                filterEssays();
                updateQueryParams();
            }
        });
    }
]);
