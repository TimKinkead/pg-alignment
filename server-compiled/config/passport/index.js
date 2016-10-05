"use strict";

var passport = require("passport"), path = require("path"), mongoose = require("mongoose"), User = mongoose.model("User"), file = require("../../modules/file");

module.exports = function() {
    passport.serializeUser(function(a, b) {
        b(null, a._id);
    }), passport.deserializeUser(function(a, b) {
        User.findOne({
            _id: a
        }, "-salt -password", function(a, c) {
            b(a, c);
        });
    }), file.globber("server/config/passport/strategies/*.js").forEach(function(a) {
        require(path.resolve(a))();
    });
};