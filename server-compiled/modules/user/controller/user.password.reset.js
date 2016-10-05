"use strict";

var mongoose = require("mongoose"), User = mongoose.model("User"), error = require("../../error"), logger = require("../../logger");

exports.resetPassword = function(a, b) {
    return logger.filename(__filename), a.body.email ? a.body.password ? a.body.passwordResetCode ? (logger.dash("getting user"), 
    void User.findOne({
        email: a.body.email.toLowerCase()
    }).exec(function(c, d) {
        return c ? (error.log(new Error(c)), b.status(500).send({
            error: c
        })) : d ? !d.passwordResetCode || !d.passwordResetExp || a.body.passwordResetCode !== d.passwordResetCode || d.passwordResetExp < new Date() ? b.status(403).send({
            message: "!validReset"
        }) : (logger.dash("resetting password"), d.password = a.body.password, void d.save(function(a) {
            return a ? (error.log(new Error(a)), b.status(500).send({
                error: a
            })) : (logger.arrow("password reset"), b.sendStatus(200));
        })) : b.status(404).send({
            message: "!user"
        });
    })) : b.status(400).send({
        message: "Password reset error. Please try again."
    }) : b.status(400).send({
        message: "Please provide a new password."
    }) : b.status(400).send({
        message: "Please provide your email address."
    });
};