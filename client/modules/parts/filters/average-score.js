'use strict';

angular.module('app').filter('averageScore', [
    function() {
        return function(score) {
            if (!score) { return null; }

            var total = 0,
                count = 0,
                avgScore;

            // total & count
            for (var key in score) {
                if (score.hasOwnProperty(key) && typeof score[key] === 'number') {
                    total += score[key];
                    count++;
                }
            }
            if (!total || !count) { return null; }

            // average score
            avgScore = Math.round((total/count)*100)/100;
            avgScore = avgScore.toString();

            // 2 decimals
            if (avgScore.indexOf('.') < 0) {
                avgScore += '.00';
            } else {
                while((avgScore.length - (avgScore.indexOf('.')+1)) < 2) {
                    avgScore += '0';
                }
            }

            // done
            return avgScore;
        };
    }
]);