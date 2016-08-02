'use strict';

/**
 * Development Grunt Task
 * - Compile client and server directories for development.
 * - Start server in development mode.
 */
module.exports = function (grunt) {
    grunt.registerTask(
		'development', 
		'Compile & transpile client/server files and start application in development mode.',
		[
			'client-dev',
			'server-dev', 
			'express:dev'
		]
	);
};