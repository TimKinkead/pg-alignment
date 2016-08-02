'use strict';

// production only
// minify client html files
module.exports = {
    'client-prod': {
        options: {
            removeComments: true,
            collapseWhitespace: true
        },
        files: [{
			expand: true,
			cwd: 'client',
            src: [
                'index.html',
                'unsupported.html'
            ],
			dest: 'client-compiled'
        }]
    },
	'server-prod': {
		options: {
			removeComments: true,
			collapseWhitespace: true
		},
		files: [{
			expand: true,
			cwd: 'server',
			src: ['**/*.html'],
			dest: 'server-compiled'
		}]
	}
};
