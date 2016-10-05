"use strict";

var chalk = require("chalk");

exports.log = function(a) {
    "on" === process.env.LOGGER && ("string" == typeof a ? console.log(a) : console.log(JSON.stringify(a, null, 4)));
}, exports.bold = function(a) {
    "on" === process.env.LOGGER && ("string" == typeof a ? console.log(chalk.magenta.bold("\n***\n" + a + "\n***\n")) : console.log(chalk.magenta.bold("\n***\n" + JSON.stringify(a, null, 4) + "\n***\n")));
}, exports.filename = function(a) {
    if ("on" === process.env.LOGGER) {
        var b = a.lastIndexOf("\\") + 1;
        a = a.slice(b), console.log(chalk.yellow.bold(a));
    }
}, exports.dash = function(a) {
    "on" === process.env.LOGGER && ("string" == typeof a ? console.log(chalk.bold("- " + a)) : (console.log(chalk.bold("-")), 
    console.log(JSON.stringify(a, null, 4))));
}, exports.tab = function(a) {
    "on" === process.env.LOGGER && ("string" == typeof a ? console.log(chalk.bold("   " + a)) : console.log(JSON.stringify(a, null, 4)));
}, exports.arrow = function(a) {
    "on" === process.env.LOGGER && ("string" == typeof a ? console.log(chalk.bold(" --> " + a)) : (console.log(chalk.bold(" --> ")), 
    console.log(JSON.stringify(a, null, 4))));
};