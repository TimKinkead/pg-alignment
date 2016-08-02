'use strict';

/**
 * Client-Dev Grunt Task
 * - Compile client directory for development.
 */
module.exports = function (grunt) {
    grunt.registerTask('client-dev', 
        'Compile & transpile client files for development.',
        [
            'clean:client',
            'jshint:client',
            'babel:client-dev',
            'copy:client-dev',
            'less:client-dev'
        ]
    );
};
