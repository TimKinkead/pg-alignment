'use strict';

/**
 * Server-Prod Grunt Task
 * - Compile server directory for production.
 */
module.exports = function (grunt) {
	
    grunt.registerTask(
        'server-prod',
        'Compile & transpile server files for production.',
        [
			'clean:server',				// wipe server-compiled directory
			'jshint:server',			// check javascript code in server directory
			'babel:server-prod',		// transpile js files from server to server-compiled
			'uglify:server-prod', 		// uglify all javascript files
			'htmlmin:server-prod',		// minify html files in server and move to server-compiled
			'copy:server-prod'			// copy other files from server to server-compiled
		]
	);
};