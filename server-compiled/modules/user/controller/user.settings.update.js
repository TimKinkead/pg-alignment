"use strict";

var mongoose = require("mongoose"), User = mongoose.model("User"), error = require("../../error"), logger = require("../../logger");

exports.updateSettings = function(a, b) {
    function c(a, c, d, e) {
        return "number" != typeof a && (e = a, a = null), b.status(a || 500).send({
            alert: c || "danger",
            message: d || "We had trouble updating your settings. Please try again.",
            error: e
        });
    }
    function d() {
        logger.dash("updating settings"), a.body.firstName && (a.user.firstName = a.body.firstName), 
        a.body.lastName && (a.user.lastName = a.body.lastName), a.body.email && (a.user.email = a.body.email), 
        a.body.newPassword && (a.user.password = a.body.newPassword), a.user.save(function(a) {
            return a ? (a = new Error(a), error.log(a), void c(a)) : (logger.arrow("user settings updated"), 
            b.sendStatus(200));
        });
    }
    function e() {
        return logger.dash("checking password"), a.body.password ? void User.findById(a.user._id).select("password salt").exec(function(b, e) {
            return b ? (b = new Error(b), error.log(b), void c(b)) : e ? e.authenticate(a.body.password) ? void d() : void c(401, "danger", "Your existing password is incorrect. Please try again.") : (b = new Error("!userDoc"), 
            error.log(b), void c(b));
        }) : void c(401, "danger", "Please provide your current password if you want to set a new password.");
    }
    return logger.filename(__filename), a.user ? void (a.body.newPassword ? e() : d()) : void b.redirect("/login");
};