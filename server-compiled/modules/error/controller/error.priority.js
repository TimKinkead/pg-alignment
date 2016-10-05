"use strict";

var auth = require("../../../../auth.js"), config = require("../../../../config.js"), sendgrid = require("sendgrid")(auth.sendgridSecretKey), handlebars = require("handlebars"), logError = require("./error.log.js").log, logger = require("../../logger");

exports.priority = function(a) {
    if (logger.filename(__filename), a && (a.constructor === Error || "object" == typeof a)) {
        a.priority = !0, logError(a);
        var b = new Date(), c = handlebars.compile(require("../email/error.email.html")), d = new sendgrid.Email({
            to: config.email.error.address,
            toname: config.email.error.name,
            from: config.email.server.address,
            fromname: config.email.server.name,
            subject: config.project.name + " Priority Error (" + (b.getMonth() + 1) + "/" + b.getDate() + "/" + b.getFullYear() + ")",
            html: c({
                err: a
            })
        });
        "cloud" === process.env.SERVER ? (d.addCategory(config.project.id), d.addCategory(config.project.id + "-error")) : d.addCategory(config.project.id + "-dev"), 
        logger.dash("sending email"), sendgrid.send(d, function(a, b) {
            return a ? (a = new Error(a), b && (a.info = b), void logError(a)) : void logger.arrow("email sent");
        });
    }
};