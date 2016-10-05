"use strict";

var passport = require("passport"), LocalStrategy = require("passport-local").Strategy, mongoose = require("mongoose"), User = mongoose.model("User");

module.exports = function() {
    var a = {
        usernameField: "email",
        passwordField: "password"
    };
    passport.use("local", new LocalStrategy(a, function(a, b, c) {
        User.findOne({
            email: a
        }, function(a, d) {
            return a ? c(new Error(a)) : c(null, d, d && d.authenticate(b));
        });
    }));
};