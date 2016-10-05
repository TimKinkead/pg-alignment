"use strict";

var mongoose = require("mongoose"), Indicator = mongoose.model("Indicator"), Module = mongoose.model("Module"), error = require("../../error"), logger = require("../../logger");

exports.read = function(a, b) {
    function c() {
        if (i -= 1, i <= 0) return f || h.length ? g || h.length || h.push(new Error("!scores")) : h.push(new Error("!indicator")), 
        h.length ? (h.forEach(function(a) {
            error.log(a);
        }), b.status(500).send(h)) : (f.manualScores = g, b.status(200).send(f));
    }
    function d() {
        Indicator.findOne({
            id: a.query.indicator
        }).lean().exec(function(a, b) {
            return a ? (h.push(new Error(a)), void c()) : (f = b, void c());
        });
    }
    function e() {
        var b = "manualScores." + a.query.indicator, d = [ {
            $match: {}
        }, {
            $group: {
                _id: "$" + b,
                count: {
                    $sum: 1
                }
            }
        } ];
        d[0].$match[b] = {
            $exists: !0
        }, Module.aggregate(d, function(a, b) {
            return a ? (h.push(new Error(a)), void c()) : b && b.length ? (g = {
                total: 0
            }, b.forEach(function(a) {
                g[a._id] = a.count, g.total += a.count;
            }), void c()) : (h.push(new Error("!results || !results.length")), void c());
        });
    }
    if (logger.filename(__filename), !a.query.indicator) return b.status(400).send({
        message: "!req.query.indicator"
    });
    var f, g, h = [], i = 2;
    d(), e();
};