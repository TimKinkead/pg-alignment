'use strict';

angular.module('app').filter('roughNumber', [
    function() {
        return function(num) {
            var rough = num;
            if (rough >= 1000 && rough < 10000) { // 2.5k
                rough = Math.round(rough / 100) / 10;
                rough = rough + 'k';
            } else if (rough >= 10000 && rough < 1000000) { // 25k
                rough = Math.round(rough / 1000);
                rough = rough + 'k';
            } else if (rough >= 1000000 && rough < 10000000) { // 2.5M
                rough = Math.round(rough / 100000) /10;
                rough = rough + 'M';
            } else if (rough >= 10000000) { // 25M
                rough = Math.round(rough / 1000000);
                rough = rough + 'M';
            }
            return rough;
        };
    }
]);