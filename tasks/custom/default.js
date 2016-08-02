'use strict';

/**
 * Default Grunt Task
 * - Run via 'grunt' on the command line.
 * - Pass through for 'grunt:development' task.
 */
module.exports = function (grunt) {
    grunt.registerTask(
		'default', 
		'Alias for \'development\' grunt task.',
		['development']
	);
};
