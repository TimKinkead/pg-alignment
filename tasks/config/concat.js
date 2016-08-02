'use strict';

var config = require('../../config.js');

module.exports = (function() {

	function addClient(files) {
		return files.map(function(path) { 
			return 'client/' + path; 
		});
	}
	
	return {
		'client-app': {
			options: {
				sourceMap: true
			},
			src: addClient(config.appFiles),
			dest: 'client-compiled/app.js'
		},
		'client-lib': {
			src: addClient(config.libFiles),
			dest: 'client-compiled/lib.js'
		}
	};

})();