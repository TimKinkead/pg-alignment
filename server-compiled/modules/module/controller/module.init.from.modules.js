"use strict";

function convertToJson2(a) {
    var b, c = [], d = [], e = [ "tsv" ];
    fs.readFile("data/scored_modules.csv", "utf8", function(f, g) {
        if (f) return a(new Error(f));
        var h = g.split("\r\n");
        return h.forEach(function(a, f) {
            var g;
            try {
                if (g = parse(a, {
                    delimiter: ";"
                })[0], !g) return void error.log(new Error("!lineArray at lineNo " + f));
            } catch (h) {
                h.message += " (lineNo " + f + ")", error.log(h);
            }
            if (!b && 0 === f) return void (b = g);
            for (var i = {}, j = 0, k = g.length; j < k; j++) if ("body" === b[j]) try {
                i.body = JSON.parse(g[j]);
            } catch (h) {
                return void error.log(new Error(h));
            } else e.indexOf(b[j]) < 0 && (i[b[j]] = g[j]);
            i.uuid && d.indexOf(i.uuid) < 0 && (c.push({
                ldcId: i.uuid,
                ldcDbData: i
            }), d.push(i.id));
        }), a(null, c);
    });
}

function convertToJson(a) {
    var b, c = [], d = [], e = [ "tsv" ], f = 0, g = readline.createInterface({
        input: fs.createReadStream("data/scored_modules.csv")
    });
    g.on("line", function(a) {
        f++, f % 1e3 === 0 && logger.arrow("reading line " + f);
        try {
            if (a = parse(a, {
                delimiter: ";"
            })[0], !a) return void error.log(new Error("!line at lineNo " + f));
        } catch (g) {
            return g.message += " (lineNo " + f + ")", console.log("end of line: ..." + a.slice(a.length - 20, a.length - 1)), 
            void console.log(g.message);
        }
        if (!b) return void (b = a);
        for (var h = {}, i = 0, j = a.length; i < j; i++) if ("body" === b[i]) try {
            h.body = JSON.parse(a[i]);
        } catch (g) {
            return void error.log(new Error(g));
        } else e.indexOf(b[i]) < 0 && (h[b[i]] = a[i]);
        h.uuid && d.indexOf(h.uuid) < 0 && (c.push({
            ldcId: h.uuid,
            ldcDbData: h
        }), d.push(h.id));
    }), g.on("error", function(a) {
        error.log(new Error(a));
    }), g.on("close", function() {
        return logger.arrow("done"), a(null, c);
    });
}

var mongoose = require("mongoose"), Module = mongoose.model("Module"), _ = require("lodash"), readline = require("readline"), fs = require("fs"), parse = require("csv-parse/lib/sync"), error = require("../../error"), logger = require("../../logger");

exports.initFromModules = function(a, b) {
    logger.filename(__filename);
    var c = 0;
    return logger.dash("converting csv to json"), convertToJson2(function(a, d) {
        return a ? (error.log(a), b.status(500).send(a)) : (logger.dash("upserting modules (" + d.length + ")"), 
        void d.forEach(function(a, b) {
            a && a.ldcId && setTimeout(function() {
                Module.findOne({
                    ldcId: a.ldcId
                }).exec(function(b, e) {
                    return b ? void error.log(new Error(b)) : (e ? (e = _.extend(e, a), e.modified = new Date()) : e = new Module(a), 
                    void e.save(function(a) {
                        return a ? void error.log(new Error(a)) : (c++, c % 10 === 0 && logger.arrow(c + " (" + Math.round(c / d.length * 100) + '%) - "' + e.ldcId + '" module saved'), 
                        void (c >= d.length && logger.arrow("done")));
                    }));
                });
            }, 250 * b);
        }));
    }), b.status(200).send("Initializing Modules");
};