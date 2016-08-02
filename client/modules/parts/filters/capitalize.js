'use strict';

angular.module('app').filter('capitalize', [
    function() {
        return function(str) {
            if (!str) { return ''; }
            if (typeof str !== 'string') { return str; }

            var newStr = '';
            
            // capitalize words in string
            var uppercase = true;
            for (var i=0, x=str.length; i<x; i++) {
                if (/[^a-zA-Z0-9\/\&]/.test(str[i])) {
                    newStr += ' ';
                    uppercase = true;
                } else {
                    newStr += (uppercase) ? str[i].toUpperCase() : str[i].toLowerCase();
                    uppercase = false;
                }
            }

            // check acronyms
            var acronyms = ['BPA', 'UN'];
            if (acronyms.indexOf(newStr) > -1) { return newStr.toUpperCase(); }
            acronyms.forEach(function(acronym) {
                var regexp = new RegExp('(^'+acronym+'\\s|\\s'+acronym+'\\s|\\s'+acronym+'$)', 'i');
                if (newStr.match(regexp)) {
                    newStr = newStr.replace(regexp, ' *'+acronym+'* ');
                }
            });

            // clean up
            var regexpClean = /(\s\s|\*)/;
            while (newStr.match(regexpClean)) {
                newStr = newStr.replace(regexpClean, ' ');
            }
            newStr = newStr.trim();

            // done
            return newStr;
        };
    }
]);