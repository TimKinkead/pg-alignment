"use strict";

var auth = require("../../auth.js"), config = require("../../config.js"), user = require("../modules/user");

module.exports = function(a, b) {
    b.render("index", {
        title: config.project.title,
        description: config.project.description,
        keywords: config.project.keywords,
        files: "production" === process.env.NODE_ENV ? [ "lib.min.js", "app.min.js", "templates.min.js" ] : require("../../config").jsFiles,
        favicon: "favicon.ico",
        user: a.user ? user.getData(a.user, "default") : null,
        googleBrowserKey: "production" === process.env.NODE_ENV ? "?key=" + auth.googleBrowserKey : "",
        helpers: {
            json: function(a) {
                return JSON.stringify(a);
            }
        }
    });
};