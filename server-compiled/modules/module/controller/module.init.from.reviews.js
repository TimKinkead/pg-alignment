"use strict";

function convertToJson(a) {
    var b, c = [], d = [], e = {}, f = 0, g = readline.createInterface({
        input: fs.createReadStream("data/ldc_reviews - reviews.csv")
    });
    g.on("line", function(a) {
        if (f++, f % 1e3 === 0 && logger.arrow("reading line " + f), a = parse(a, {
            delimiter: ","
        })[0], !b) return void (b = a);
        for (var g = {}, h = 0, i = a.length; h < i; h++) g[b[h]] = a[h];
        if (g.id) {
            e[g.id] || (e[g.id] = {}), g.indicator_id1 && g.score1 && (e[g.id][g.indicator_id1.slice(0, 4)] = g.score1);
            var j = g.linktomodule || "", k = j.indexOf("/mods/"), l = k > -1 ? j.slice(k + 6) : null;
            if (!l) {
                var m = new Error("!ldcId");
                return m.module = g, void error.log(m);
            }
            d.indexOf(g.id) < 0 && (c.push({
                ldcId: l,
                spreadsheetData: g
            }), d.push(g.id));
        }
    }), g.on("error", function(a) {
        error.log(new Error(a));
    }), g.on("close", function() {
        return c.forEach(function(a) {
            e[a.spreadsheetData.id] && (a.manualScores = e[a.spreadsheetData.id]);
        }), logger.arrow("done"), a(null, c);
    });
}

var mongoose = require("mongoose"), Module = mongoose.model("Module"), _ = require("lodash"), readline = require("readline"), fs = require("fs"), parse = require("csv-parse/lib/sync"), error = require("../../error"), logger = require("../../logger");

exports.initFromReviews = function(a, b) {
    logger.filename(__filename);
    var c = 0;
    return logger.dash("converting csv to json"), convertToJson(function(a, d) {
        return a ? (error.log(a), b.status(500).send(a)) : (logger.dash("upserting modules (" + d.length + ")"), 
        void d.forEach(function(a, b) {
            a && a.ldcId && Module.findOne({
                ldcId: a.ldcId
            }).exec(function(b, e) {
                return b ? void error.log(new Error(b)) : (e ? (e = _.extend(e, a), e.modified = new Date()) : e = new Module(a), 
                void e.save(function(a) {
                    return a ? void error.log(new Error(a)) : (c++, c % 100 === 0 && logger.arrow(c + " (" + Math.round(c / d.length * 100) + '%) - "' + e.ldcId + '" module saved'), 
                    void (c >= d.length && logger.arrow("done")));
                }));
            });
        }));
    }), b.status(200).send("Initializing Modules");
};