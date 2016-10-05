"use strict";

exports.logout = function(a, b) {
    a.logout(), b.redirect("/");
};