'use strict';

/**
 * angular controller for graded work
 */
angular.module('app').controller('GradeController', [
    '$scope',
    '$resource',
    '$http',
    '$uibModal',
    '$window',
    '$state',
    '$stateParams',
    '$sce',
    'CurrentUser',
    function ($scope, $resource, $http, $modal, $window, $state,  $stateParams, $sce, CurrentUser) {

        var user = $scope.user = CurrentUser.data,

            status = $scope.status = {
                nextEssay: null,
                hidePrompt: null,
                saved: null,
                newModule: null
            },
            params = $scope.params = {
                scoresheet: null,
                user: user._id,
                essay: null,
                rubric: null,
                score: {},
                masterScore: null
            },
            docs = $scope.docs = {
                scoresheet: null,
                essay: null,
                rubric: null,
                rubrics: null,
                graders: null
            };

        // -------------------------------------------------------------------------------------------------------------
        // Check Url Query Params & Initialize Page

        //console.log($stateParams);

        if ($stateParams.scoresheet) {
            params.scoresheet = $stateParams.scoresheet;
        } else if ($stateParams.essay) {
            params.essay = $stateParams.essay;
        } else {
            status.nextEssay = true;
        }
        if ($stateParams.masterScore && (params.scoresheet || params.essay)) {
            params.masterScore = true;
        }

        // -------------------------------------------------------------------------------------------------------------
        // Success/Error Messages

        var errorModal = $scope.errorModal = function (header, message) {
            if (header && !message) { message = header; header = null; }
            if (!header) { header = 'Error!'; }
            if (!message) { message = 'Something went wrong. Please try again.'; }
            var modalInstance = $modal.open({
                templateUrl: 'modules/main/grade/modal/error.html',
                controller: 'GradeModalErrorController',
                resolve: {
                    info: function() {
                        return {header: header, message: message};
                    }
                }
            });
            modalInstance.result.then(
                function() { console.log('close'); },
                function() { console.log('dismiss'); }
            );
        };

        // -------------------------------------------------------------------------------------------------------------
        // Prevent Navigate Away

        var navigateAwayMessage = 'Warning!\n\nYour work has not been saved.\nAre you sure you want to leave this page?\n';

        // prevent `back to essays` state change
        $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            //console.log('toState', toState, 'fromState', fromState);
            //console.log('toParams', toParams, 'fromParams', fromParams);
            if (status.saved === false && !status.skip) {
                if(!confirm(navigateAwayMessage)) {
                    event.preventDefault();
                }
            }
        });

        // navigate away warning
        function handleUnloadEvent(event) {
            event.returnValue = navigateAwayMessage;
        }

        // prevent user from navigating away
        function addUnloadEvent() {
            if ($window.addEventListener) {
                $window.addEventListener('beforeunload', handleUnloadEvent);
            } else {
                $window.attachEvent('onbeforeunload', handleUnloadEvent); // internet explorer
            }
        }

        // allow user to navigate away
        function removeUnloadEvent() {
            if ($window.removeEventListener) {
                $window.removeEventListener('beforeunload', handleUnloadEvent);
            } else {
                $window.detachEvent('onbeforeunload', handleUnloadEvent);
            }
        }

        $scope.$on('$destroy', function(event){
            removeUnloadEvent();
        });

        // -------------------------------------------------------------------------------------------------------------
        // View Settings

        // switch text/rubric sides
        $scope.switchSides = function() {
            user.rubricSide = (user.rubricSide === 'right') ? 'left' : 'right';
            $http
                .put('/data/user/settings', {rubricSide: user.rubricSide})
                .success(function() { console.log('rubricSide updated'); })
                .error(function(err) { console.log('error updating rubricSide'); });
        };

        // show all/one rubric element(s)
        function showRubricElements() {
            if (docs.rubric) {
                var i, x;
                // show all
                if (user.rubricElements === 'show all') {
                    for (i=0, x=docs.rubric.fields.length; i<x; i++) {
                        docs.rubric.fields[i].visible = true;
                    }
                }
                // show one
                else {
                    var oneShowing = false;
                    for (i=0, x=docs.rubric.fields.length; i<x; i++) {
                        if (!oneShowing && !params.score[docs.rubric.fields[i].name] && (i === 0 || params.score[docs.rubric.fields[i-1].name])) {
                            docs.rubric.fields[i].visible = true;
                            oneShowing = true;
                        } else {
                            docs.rubric.fields[i].visible = false;
                        }
                    }
                }
            }
        }

        // switch rubric elements view
        $scope.switchRubricElements = function(elementsOption) {
            user.rubricElements = elementsOption;
            showRubricElements();
            $http
                .put('/data/user/settings', {rubricElements: user.rubricElements})
                .success(function() { console.log('rubricElements updated'); })
                .error(function(err) { console.log('error updating rubricElements'); });
        };

        // show/hide prompt
        $scope.switchPrompt = function() {
            status.hidePrompt = !status.hidePrompt;
        };

        // update rubric table width variable
        var updateRubricTableWidth = $scope.updateRubricTableWidth = function() {
            status.rubricTableWidth = document.getElementById('rubric-table').clientWidth;
        };

        var updateIframeHeight = $scope.updateIframeHeight = function() {
            var gradeDash = document.getElementById('grade-dashboard'),
                iframe = document.getElementById('iframe-text'),
                newHeight = gradeDash.getBoundingClientRect().bottom - iframe.getBoundingClientRect().top;
            iframe.style.minHeight = newHeight+'px';
        };

        $scope.updateIframeHeightDelay = function(delay) {
            setTimeout(updateIframeHeight, delay);
        };

        // watch div resize
        $scope.$on('angular-resizable.resizeEnd', function(event, args) {
            updateRubricTableWidth();
            updateIframeHeight();
        });

        // watch window resize
        angular.element($window).bind('resize', function() {
            updateRubricTableWidth();
            updateIframeHeight();
        });

        // -------------------------------------------------------------------------------------------------------------
        // Essays

        function clearParams() {
            [status, params, docs].forEach(function(item) {
                for (var key in item) {
                    if (item.hasOwnProperty(key)) {
                        if (item === docs && key === 'rubrics') {
                            docs.rubrics = docs.rubrics || null;
                        } else if (item === params && key === 'score') {
                            params.score = {};
                        } else {
                            item[key] = null;   
                        }
                    }
                }
            });
            $stateParams.scoresheet = null;
            $stateParams.essay = null;
            removeUnloadEvent();
        }

        function getEssay() {
            status.processingEssay = true;
            $http.get('/data/essay?essay='+params.essay+'&grading=true')
                .success(function(essay) {
                    setTimeout(
                        function() {
                            status.processingEssay = false;
                            $scope.$digest();
                        },
                        1000
                    );
                    status.masterScore = essay.masterScore;
                    docs.essay = essay;
                    docs.essay.iframeLink = $sce.trustAsResourceUrl(
                        'https://docs.google.com/gview?url='+essay.link+'&embedded=true'
                    );
                    if (!params.rubric) { params.rubric = essay.module.rubric; }
                    if (!params.scoresheet && essay.scoresheets && !user.admin) {
                        essay.scoresheets.forEach(function(scoresheet) {
                            if (scoresheet.user && scoresheet.user.toString() === user._id.toString() && !scoresheet.masterScore) {
                                params.scoresheet = scoresheet._id;
                            }
                        });
                    }
                })
                .error(function(err) {
                    status.processingEssay = false;
                    errorModal('We had trouble loading the essay. Please try again.');
                });
        }

        function getNextEssay() {
            clearParams();
            status.processingEssay = true;
            $http.get('/data/essay/next')
                .success(function(essay) {
                    
                    // all essays graded
                    if (essay.message === 'all essays graded') {
                        var modalInstance = $modal.open({
                            templateUrl: 'modules/main/grade/modal/done.html',
                            controller: 'GradeModalController',
                            backdrop: 'static'
                        });
                        modalInstance.result.then(
                            function() { $state.go('essays', {'all-essays-graded': true}); },
                            function() { $state.go('essays', {'all-essays-graded': true}); }
                        );
                        return;
                    }
                    
                    status.newModule = essay.newModule;
                    status.masterScore = essay.masterScore;
                    status.consensusScore = essay.consensusScore;
                    
                    // trigger `getEssay()` via $watch
                    params.essay = essay._id;
                })
                .error(function(err) {
                    status.processingEssay = false;
                    errorModal('We had trouble loading the essay. Please try again.');
                });
        }

        // next essay
        $scope.nextEssay = function() {
            status.nextEssay = true; // trigger `getNextEssay()` via $watch 
        };

        // skip essay
        $scope.skip = function() {
            var modalInstance = $modal.open({
                templateUrl: 'modules/main/grade/modal/skip.html',
                controller: 'GradeModalController',
                backdrop: 'static'
            });
            modalInstance.result.then(
                function(reason) { // close
                    status.processingSkip = true;
                    removeUnloadEvent();
                    $http.put('/data/essay/skip', {essay: params.essay, reason: reason})
                        .success(function() {
                            status.processingSkip = false;
                            status.skip = true;
                            $state.go('essays');
                        })
                        .error(function(err) {
                            status.processingSkip = false;
                            $state.go('essays');
                        });
                },
                function(msg) { console.log(msg || 'dismiss'); }
            );
        };

        // -------------------------------------------------------------------------------------------------------------
        // Rubrics
        
        // grab rubric from rubrics
        function grabRubric() {
            if (docs.rubrics) {
                for (var i=0, x=docs.rubrics.length; i<x; i++) {
                    if (params.rubric === docs.rubrics[i]._id) {
                        docs.rubric = docs.rubrics[i];
                        docs.rubric.fields.forEach(function(field) {
                            field.details.forEach(function(detail) {
                                detail.texts = (detail.text) ? detail.text.split('\n') : null; 
                            });
                        });
                        showRubricElements();
                        break;
                    }
                }
            }
        }

        // get rubrics
        function getRubrics() {
            status.processingRubrics = true;
            docs.rubrics = $resource('/data/rubric/list').query(
                {},
                function() {
                    status.processingRubrics = false;
                    if (params.rubric) {
                        grabRubric();
                    }
                },
                function(err) {
                    status.processingRubrics = false;
                    errorModal('We had trouble getting the list of rubrics. Please close the modal and try again.');
                }
            );
        }
        getRubrics();

        // score a field
        $scope.scoreField = function(fieldIndex, fieldName, score) {
            params.score[fieldName] = score;
            showRubricElements();
            addUnloadEvent();
            status.saved = false;
            // check form validity
            loop: {
                for (var i=0, x=docs.rubric.fields.length; i<x; i++) {
                    if (!params.score[docs.rubric.fields[i].name]) {
                        status.formValid = false;
                        break loop;
                    }
                }
                status.formValid = true;
            }
        };

        // edit a field
        $scope.editField = function(fieldIndex) {
            for (var i=0, x=docs.rubric.fields.length; i<x; i++) {
                docs.rubric.fields[i].visible = (i === fieldIndex);
            }
        };

        // -------------------------------------------------------------------------------------------------------------
        // Score Sheet

        function getScoreSheet() {
            status.processingScoreSheet = true;
            $http.get('/data/scoresheet?scoresheet='+params.scoresheet)
                .success(function(scoresheet) {
                    status.processingScoreSheet = false;
                    status.saved = true;
                    status.formValid = true;
                    docs.scoresheet = scoresheet;
                    params.user = (user.admin && scoresheet.user._id) ? scoresheet.user._id : params.user;
                    params.essay = scoresheet.essay._id;
                    params.rubric = scoresheet.rubric._id;
                    params.score = scoresheet.score;
                    removeUnloadEvent();
                })
                .error(function(err) {
                    status.processingScoreSheet = false;
                    errorModal('We had trouble loading your score sheet. Please try again.');
                });
        }

        // click save button (check status.formValid)
        $scope.clickSave = function() {
            if (status.formValid) { return true; }
            status.clickSave = true;
            var modalInstance = $modal.open({
                templateUrl: 'modules/main/grade/modal/invalid.html',
                controller: 'GradeModalController'
            });
            modalInstance.result.then(
                function() { console.log('close'); },
                function() { console.log('dismiss'); }
            );
            return false;
        };
        
        // save score sheet
        $scope.save = function() {
            status.processingSave = true;
            $http.post('/data/scoresheet', params)
                .success(function(scoresheet) {
                    status.processingSave = false;
                    status.saved = true;
                    removeUnloadEvent();

                    if (params.masterScore) {
                        $state.go('essays', {essayFilterBy: 'master scores', moduleFilterBy: docs.essay.module._id});
                        return;
                    }

                    if (user.admin) {
                        $state.go('essays', {essayFilterBy: 'graded essays', moduleFilterBy: docs.essay.module._id, essay: params.essay, viewDetails: true});
                        return;
                    }

                    user.scoresheets++;
                    var modalInstance;
                    
                    // check master score modal
                    if (status.masterScore) {
                        modalInstance = $modal.open({
                            templateUrl: 'modules/main/grade/modal/check.html',
                            controller: 'GradeModalController',
                            backdrop: 'static'
                        });
                        modalInstance.result.then(
                            function(stateName) {
                                user.checkScores++;
                                if (stateName) {
                                    if (stateName === 'check-scores') {
                                        $state.go('essays', {'modal-check': true, essay: scoresheet.essay});
                                    } else {
                                        $state.go(stateName);
                                    }
                                } else { 
                                    status.nextEssay = true; 
                                }
                            },
                            function() {
                                user.checkScores++;
                                params.scoresheet = scoresheet._id;
                            }
                        );
                        return;
                    }
                    
                    // success modal
                    modalInstance = $modal.open({
                        templateUrl: 'modules/main/grade/modal/next.html',
                        controller: 'GradeModalController',
                        backdrop: 'static'
                    });
                    modalInstance.result.then(
                        function(stateName) {
                            if (stateName) {
                                $state.go(stateName);
                                return;
                            }
                            status.nextEssay = true;
                        },
                        function() { params.scoresheet = scoresheet._id; }
                    );
                })
                .error(function(err) {
                    status.processingSave = false;
                    errorModal('We had trouble saving your score sheet. Please try again.');
                });
        };

        // -------------------------------------------------------------------------------------------------------------
        // Graders
        
        // get graders
        if (user.admin) {
            status.processingGraders = true;
            docs.graders = $resource('data/grader/list').query(
                {},
                function() {
                    status.processingGraders = false;
                },
                function(err) {
                    status.processingGraders = false;
                    errorModal('We had trouble listing the graders.');
                }
            );
        }
        
        // -------------------------------------------------------------------------------------------------------------
        // Watch Parameter Changes

        function updateQueryParams() {
            //console.log('updateQueryParams');
            var changed = false;
            ['scoresheet', 'essay', 'masterScore'].forEach(function(param) {
                if (params[param] !== $stateParams[param]) {
                    $stateParams[param] = params[param];
                    changed = true;
                }
            });
            if (changed) {
                if ($stateParams.scoresheet) { $stateParams.essay = null; }
                $state.go($state.$current, $stateParams, {notify: false, reload: false});
            }
        }

        $scope.$watch('status.nextEssay', function(nV, oV) {
            //console.log('status.nextEssay change:', oV, ' to ', nV);
            if (nV && (nV !== oV || !docs.essay)) {
                getNextEssay();
            }
        });

        $scope.$watch('params.scoresheet', function(nV, oV) {
            //console.log('params.scoresheet change:', oV, ' to ', nV);
            if (nV && (nV !== oV || !docs.scoresheet)) {
                updateQueryParams();
                getScoreSheet();
            }
        });

        $scope.$watch('params.essay', function(nV, oV) {
            //console.log('params.essay change:', oV, ' to ', nV);
            if (nV && (nV !== oV || !docs.essay)) {
                updateQueryParams();
                getEssay();
            }
        });

        $scope.$watch('params.rubric', function(nV, oV) {
            //console.log('params.rubric change:', oV, ' to ', nV);
            if (nV && nV !== oV) {
                if (oV) {
                    status.saved = false;
                    addUnloadEvent();
                }
                if (!docs.rubrics) {
                    getRubrics();
                } else {
                    grabRubric();
                }
            }
        });

        $scope.initializeGradeDashboard = function() {
            console.log('init');
        };

    }
]);