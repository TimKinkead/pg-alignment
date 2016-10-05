"use strict";

var chalk = require("chalk"), mongoose = require("mongoose"), Err = mongoose.model("Error");

exports.log = function(a) {
    if (a && (a.constructor === Error || "object" == typeof a)) {
        var b = new Err({
            name: a.name,
            message: a.message && a.message.constructor !== String ? JSON.stringify(a.message, null, 4) : a.message,
            stack: a.stack,
            type: "server",
            info: {}
        });
        for (var c in a) [ "name", "message", "stack" ].indexOf(c) < 0 && a.hasOwnProperty(c) && (a[c].constructor === Array || a[c].constructor === Object ? b.info[c] = JSON.stringify(a[c], null, 4) : b.info[c] = a[c]);
        b.save(function(a) {
            a ? (console.error(chalk.red("Error not saved!")), console.log(chalk.bold("> save error:")), 
            console.log(a || "!newErrorDoc"), console.log(chalk.bold("> original error:")), 
            console.log(b)) : "on" === process.env.LOGGER && (console.error(chalk.red.bold("Error!")), 
            console.log(b));
        });
    }
};