'use strict';

/**
 * Production Grunt Task
 * - Compile client and server directories for production.
 * - Start server in production mode.
 */
module.exports = function (grunt) {
	
    grunt.registerTask(
        'production',
        'Compile & transpile client/server files for running in production.',
        [
			'client-prod',
			'server-prod',
			'express:prod'
		]
	);
};