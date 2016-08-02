'use strict';

// development only
// start the server
module.exports = {
    dev: {
        options: {
            script: 'server.js',
			node_env: 'development',
            background: false
        }
    },
	prod: {
		options: {
			script: 'server.js',
			node_env: 'production',
			background: false
		}
	}
};
