"use strict";

module.exports = function(a, b) {
    b.render("unsupported", {
        title: "Unsupported!",
        description: "Please upgrade your browser.",
        keywords: "",
        favicon: ("production" === process.env.NODE_ENV ? "" : "modules/core/img/") + "favicon.ico"
    });
};