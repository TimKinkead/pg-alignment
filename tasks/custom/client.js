'use strict';

/**
 * Client Grunt Task
 * - Compile client directory for development.
 * - Start server in development mode.
 */
module.exports = function (grunt) {
    grunt.registerTask('client', 
        'Compile & transpile client files and start application in development mode.',
        [
            'client-dev',
            'express:dev'
        ]
    );
};
