'use strict';

/**
 * Server Grunt Task
 * - Compile server directory for development.
 * - Start server in development mode.
 */
module.exports = function (grunt) {
    grunt.registerTask(
        'server',
        'Compile & transpile server files and start application in development mode.',
        [
            'server-dev',
            'express:dev'
        ]
    );
};
