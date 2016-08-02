'use strict';

/**
 * CORE.STOP
 * - Stop Application.
 */
exports.stop = function(req, res) {
	if (req.user && req.user.admin) {
		var process = require('process');
		process.exit();
	} else {
		return res.status(403).send({
			header: 'Permission Denied',
			message: 'You don\'t have permission to stop the application.'
		});
	}
};
