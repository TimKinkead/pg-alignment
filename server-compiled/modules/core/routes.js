"use strict";

var core = require("../core");

module.exports = function(a) {
    a.route("/data/ping").get(core.ping), a.route("/data/env-var").get(core.envVar), 
    a.route("/data/stop").get(core.stop);
};