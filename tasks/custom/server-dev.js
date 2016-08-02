'use strict';

/**
 * Server-Dev Grunt Task
 * - Compile server directory for development.
 */
module.exports = function (grunt) {
    grunt.registerTask(
        'server-dev',
        'Compile & transpile server files for development.',
        [
            'clean:server',
            'jshint:server',
            'babel:server-dev',
            'copy:server-dev'
        ]
    );
};
