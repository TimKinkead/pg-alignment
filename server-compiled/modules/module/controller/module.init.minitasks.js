"use strict";

function convertToJson(a) {
    var b, c = [];
    fs.readFile("data/scored_modules_minitasks.csv", "utf8", function(d, e) {
        if (d) return a(new Error(d));
        console.log("splitting into lines");
        var f = e.split("\r\n");
        return f.forEach(function(a, d) {
            d % 100 === 0 && console.log(d + " converting line to json");
            var e;
            try {
                if (e = parse(a, {
                    delimiter: ";"
                })[0], !e) return void error.log(new Error("!lineArray at lineNo " + d));
            } catch (f) {
                return f.message += " (lineNo " + d + ")", void error.log(f);
            }
            if (!b && 0 === d) return void (b = e);
            for (var g = {}, h = 0, i = e.length; h < i; h++) g[b[h]] = e[h];
            c.push(g);
        }), a(null, c);
    });
}

function addMinitask(a, b, c, d) {
    var e = null;
    try {
        if (e = parse(b, {
            delimiter: ";"
        })[0], !e) return error.log(new Error("!lineArray at lineNo " + c)), d();
    } catch (f) {
        return f.message += " (lineNo " + c + ")", f.line = b, error.log(f), d();
    }
    for (var g = {}, h = 0, i = e.length; h < i; h++) g[a[h]] = e[h];
    g.id && g.mod_id && Module.update({
        "ldcDbData.id": g.mod_id,
        "ldcDbData.minitasks.id": g.id
    }, {
        $set: {
            "ldcDbData.minitasks.$": g
        }
    }, function(a) {
        a && error.log(new Error(a)), Module.update({
            "ldcDbData.id": g.mod_id,
            "ldcDbData.minitasks.id": {
                $ne: g.id
            }
        }, {
            $push: {
                "ldcDbData.minitasks": g
            }
        }, function(a) {
            return a ? (error.log(new Error(a)), d()) : d();
        });
    });
}

var mongoose = require("mongoose"), Module = mongoose.model("Module"), _ = require("lodash"), readline = require("readline"), fs = require("fs"), parse = require("csv-parse/lib/sync"), error = require("../../error"), logger = require("../../logger");

exports.initMinitasks = function(a, b) {
    logger.filename(__filename);
    var c, d, e = [], f = 0;
    logger.dash("reading csv file"), fs.readFile("data/scored_modules_minitasks.csv", "utf8", function(a, g) {
        if (a) return error.log(new Error(a)), b.status(500).send({
            error: a
        });
        c = g.split("\r\n");
        try {
            d = parse(c[0], {
                delimiter: ";"
            })[0];
        } catch (a) {
            return a.message += " - error grabbing headers", error.log(a), b.status(500).send({
                error: a
            });
        }
        logger.dash("cleaning up lines (" + c.length + ")");
        for (var h = /^[0-9]{4,7};/, i = 1, j = c.length; i < j; i++) i % 1e3 === 0 && logger.arrow("line " + i + " (" + Math.round(i / c.length * 100) + "%)"), 
        h.test(c[i]) ? e.push(c[i]) : e[e.length - 1] += c[i];
        return logger.dash("adding minitasks (" + e.length + ")"), e.forEach(function(a, b) {
            setTimeout(function() {
                addMinitask(d, a, b, function() {
                    f++, f % 10 === 0 && logger.arrow(f + " (" + Math.round(f / e.length * 100) + "%) - minitask added"), 
                    f >= e.length && logger.arrow("done");
                });
            }, 250 * b);
        }), Module.update({
            ldcDbData: {
                $exists: !0
            },
            "ldcDbData.minitasks": {
                $exists: !1
            }
        }, {
            $set: {
                "ldcDbData.minitasks": []
            }
        }, {
            multi: !0
        }, function(a) {
            a && error.log(new Error(a));
        }), b.status(200).send("Working on adding minitasks.");
    });
};