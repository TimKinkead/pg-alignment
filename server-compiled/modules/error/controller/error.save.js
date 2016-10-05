"use strict";

var logError = require("./error.log.js").log, priorityError = require("./error.priority.js").priority;

exports.save = function(a, b) {
    var c = {
        name: a.body.name,
        message: a.body.message,
        stack: a.body.stack,
        type: "client",
        priority: a.body.priority,
        info: {}
    };
    for (var d in a.body) [ "name", "message", "stack" ].indexOf(d) < 0 && a.body.hasOwnProperty(d) && (a.body[d].constructor === Array || a.body[d].constructor === Object ? c.info[d] = JSON.stringify(a.body[d], null, 4) : c.info[d] = a.body[d]);
    return c.priority ? priorityError(c) : logError(c), b.sendStatus(200);
};