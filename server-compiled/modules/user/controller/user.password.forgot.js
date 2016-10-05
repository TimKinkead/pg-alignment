"use strict";

function resetCode() {
    for (var a = [ "1", "2", "3", "4", "5" ], b = [ "A", "B", "C", "D", "E" ], c = "", d = 0; d < 10; d++) {
        var e = Math.random() < .5;
        c += e ? a[Math.floor(Math.random() * a.length)] : b[Math.floor(Math.random() * b.length)];
    }
    return c;
}

var auth = require("../../../../auth.js"), config = require("../../../../config.js"), fs = require("fs"), sendgrid = require("sendgrid")(auth.sendgridSecretKey), handlebars = require("handlebars"), mongoose = require("mongoose"), User = mongoose.model("User"), error = require("../../error"), logger = require("../../logger");

exports.forgotPassword = function(a, b) {
    return logger.filename(__filename), a.body.email ? (a.body.email = a.body.email.toLowerCase(), 
    void User.findOne({
        email: a.body.email
    }).select("firstName lastName email").exec(function(c, d) {
        return c ? (error.log(new Error(c)), b.status(500).send({
            error: c
        })) : d ? (d.passwordResetCode = resetCode(), d.passwordResetExp = function() {
            var a = new Date();
            return a.setDate(a.getDate() + 1), a;
        }(), void d.save(function(c) {
            if (c) return error.log(new Error(c)), b.status(500).send({
                error: c
            });
            var e = fs.readFileSync("server/modules/user/email/user.email.password.forgot.html"), f = handlebars.compile(e.toString()), g = new sendgrid.Email({
                to: d.email,
                toname: d.name,
                from: config.email.support.address,
                fromname: config.email.support.name,
                subject: config.project.name + " Password Reset",
                html: f({
                    user: d,
                    config: config,
                    host: a.get("host")
                })
            });
            "cloud" === process.env.SERVER ? (g.addCategory(config.project.id), g.addCategory(config.project.id + "-forgot")) : g.addCategory(config.project.id + "-dev"), 
            logger.dash("sending email"), sendgrid.send(g, function(a, c) {
                return a ? (a = new Error(a), c && (a.info = c), error.log(a), b.status(500).send({
                    error: a
                })) : (logger.arrow("email sent"), b.sendStatus(200));
            });
        })) : b.status(404).send({
            message: "!user"
        });
    })) : b.status(400).send({
        message: "!email"
    });
};