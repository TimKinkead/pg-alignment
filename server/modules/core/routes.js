'use strict';

//----------------------------------------------------------------------------------------------------------------------
// Controllers

var core = require('../core');

//----------------------------------------------------------------------------------------------------------------------
// Routes

module.exports = function(app) {

    // return 200 for load balancer health check
    app.route('/data/ping').get(core.ping);

    // get environment variables
    app.route('/data/env-var').get(core.envVar);

    // kill the application
    app.route('/data/stop').get(core.stop);

};
