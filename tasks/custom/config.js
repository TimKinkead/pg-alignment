'use strict';

/**
 * Config Grunt Tasks
 * - Tasks that modify the grunt config object.
 * - Configuration cannot be performed in 'tasks/config/*.js' because files do not yet exist, etc.
 */
module.exports = function (grunt, config) {
	
	grunt.registerTask(
		'configForBabel',
		'Update grunt config object before babel operations.',
		function() {
			config.babel['client-prod'].options.inputSourceMap = grunt.file.readJSON('client-compiled/app.js.map');
		}
	);
	
};
