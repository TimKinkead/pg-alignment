'use strict';

/**
 * Render unsupported.html
 */
module.exports = function(req, res) {
    
	res.render(
        'unsupported',
        {
            title: 'Unsupported!',
            description: 'Please upgrade your browser.',
            keywords: '',
            favicon: (process.env.NODE_ENV === 'production' ? '' : 'modules/core/img/') + 'favicon.ico'
        }
    );
};
