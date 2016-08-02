'use strict';

/**
 * CORE.PING
 * - Return 200 for load balancer health checks.
 */
exports.ping = function(req, res) {
	return res.sendStatus(200);
};
