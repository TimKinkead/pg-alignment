"use strict";

var mongoose = require("mongoose"), Indicator = mongoose.model("Indicator"), _ = require("lodash"), error = require("../../error"), logger = require("../../logger");

exports.init = function(a, b) {
    function c() {
        if (e -= 1, 0 === e) return logger.arrow("indicators initialized"), b.status(200).send("Indicators initialized.");
    }
    logger.filename(__filename);
    var d = require("../data/indicators"), e = d.length;
    logger.dash("upserting indicators"), d.forEach(function(a, b) {
        a && a.id && Indicator.findOne({
            id: a.id
        }).exec(function(b, d) {
            return b ? (error.log(new Error(b)), void c()) : (d ? (d = _.extend(d, a), d.modified = new Date()) : d = new Indicator(a), 
            void d.save(function(a) {
                return a ? (error.log(new Error(a)), void c()) : void c();
            }));
        });
    });
};