"use strict";

exports.stop = function(a, b) {
    if (!a.user || !a.user.admin) return b.status(403).send({
        header: "Permission Denied",
        message: "You don't have permission to stop the application."
    });
    var c = require("process");
    c.exit();
};