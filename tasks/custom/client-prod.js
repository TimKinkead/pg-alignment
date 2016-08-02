'use strict';

/**
 * Client-Prod Grunt Task
 * - Compile client directory for production.
 */
module.exports = function (grunt) {
	
    grunt.registerTask(
        'client-prod',
        'Compile & transpile client files for production.',
        [
			'clean:client',				// wipe client-compiled directory
			'jshint:client',			// check javascript code in client directory
			'htmlmin:client-prod',		// minify root html files in client and move to client-compiled
			'less:client-prod',			// compile core.less in client to styles.css in client-compiled
			'copy:client-prod',			// copy other non-js files from client to client-compiled
			'html2js:client-prod',		// convert html templates in client to single templates.js file in client-compiled
			'concat:client-app',		// concatenate all application javascript files in client to app.js in client-compiled
			'concat:client-lib',		// concatenate all library javascript files in client to lib.js in client-compiled
			'configForBabel',			// overwrite inputSourceMap field in grunt config object for 'babel:client-prod' task
			'babel:client-prod',		// transpile app.js
			'uglify:client-prod-app',	// uglify app.js to app.min.js
			'uglify:client-prod-lib',	// uglify lib.js to lib.min.js
			'uglify:client-prod-tpl',	// uglify templates.js to templates.min.js
			'clean:client-prod'			// clean all unnecessary files
		]
	);
};