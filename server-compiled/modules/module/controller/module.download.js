"use strict";

function getLDCAccessToken(a) {
    logger.dash("getting ldc access token"), logger.arrow("starting phantom"), phantom.create().then(function(b) {
        logger.arrow("creating phantom page"), b.createPage().then(function(c) {
            c.property("onConsoleMessage", function(a, b, c) {
                var d = "CONSOLE: " + a + (b || c ? " (from line #" + b + ' in "' + c + '")' : "");
                console.log(d);
            }), c.property("viewportSize", {
                width: 1e3,
                height: 800
            }), logger.arrow("navigating to login page"), c.open("https://coretools.ldc.org/login").then(function(d) {
                function e(a, b) {
                    var c = document.getElementById("loginEmail"), d = document.getElementById("loginPassword"), e = document.getElementsByName("loginForm")[0], f = e.getElementsByTagName("button")[0];
                    c.value = a, c.dispatchEvent(new Event("input")), d.value = b, d.dispatchEvent(new Event("input")), 
                    f.click();
                }
                return "success" !== d ? (a(new Error("status ===" + d)), void b.exit()) : (c.render("temp/1-login-page-blank.png"), 
                logger.arrow("logging in"), void c.evaluate(e, auth.ldcCoreToolsEmail, auth.ldcCoreToolsPassword).then(function() {
                    c.render("temp/2-logging-in.png"), setTimeout(function() {
                        c.render("temp/3-logged-in.png");
                    }, 5e3), logger.arrow("grabbing access token"), c.evaluate(function() {
                        for (var a = localStorage.getItem("ldcEdit.accessToken"); a.indexOf('"') > -1; ) a = a.replace('"', "");
                        return a;
                    }).then(function(c) {
                        return setTimeout(function() {
                            b.exit();
                        }, 5e3), logger.arrow("done"), a(null, c);
                    });
                }));
            });
        });
    });
}

function downloadModule(a, b, c) {
    return a ? a.ldcId ? b ? void request.get({
        url: "https://api.ldc.org/api/v1/mods/" + a.ldcId,
        headers: {
            Authorization: "Bearer " + b
        }
    }, function(b, d, e) {
        if (b) return b = new Error(b), b.module = a, c(b);
        if (200 !== d.statusCode) return void Module.update({
            ldcId: a.ldcId
        }, {
            $set: {
                "downloadError.statusCode": d.statusCode,
                "downloadError.body": e
            }
        }, function(b) {
            return b ? c(new Error(b)) : (b = new Error("statusCode !== 200"), b.module = a, 
            c(b));
        });
        if (!e) return b = new Error("!body || !body.mod"), b.module = a, c(b);
        var f;
        try {
            f = JSON.parse(e);
        } catch (g) {
            return b = new Error(g), b.module = a, c(b);
        }
        return f.mod ? void Module.update({
            ldcId: a.ldcId
        }, {
            $set: {
                ldcData: f.mod,
                modified: new Date()
            }
        }, function(a) {
            return a ? c(new Error(a)) : c();
        }) : (b = new Error("!bodyData.mod"), b.module = a, c(b));
    }) : c(new Error("!token")) : c(new Error("!module.ldcId")) : c(new Error("!module"));
}

function downloadModules(a, b) {
    function c() {
        return d++, d >= a.length ? void logger.arrow("done") : void downloadModule(a[d], b, function(b) {
            b && (e += 1), d % 10 === 0 && logger.arrow(d + " (" + Math.round(d / a.length * 100) + "%) - success: " + d - e + " - errors: " + e), 
            c();
        });
    }
    if (logger.dash("downloading modules"), !a || !a.length) return void error.log(new Error("!modules || !modules.length"));
    if (!b) return void error.log(new Error("!token"));
    var d = -1, e = 0;
    c();
}

var mongoose = require("mongoose"), Module = mongoose.model("Module"), phantom = require("phantom"), request = require("request"), auth = require("../../../../auth.js"), error = require("../../error"), logger = require("../../logger");

exports.download = function(a, b) {
    logger.filename(__filename);
    var c = {
        ldcId: {
            $exists: !0
        },
        "ldcData.uuid": {
            $exists: !1
        },
        "downloadError.statusCode": {
            $exists: !1
        }
    };
    logger.dash("getting modules"), Module.find(c).select("_id ldcId").exec(function(a, c) {
        return a ? (error.log(new Error(a)), b.status(500).send(a)) : c && c.length ? (logger.arrow(c.length + " modules"), 
        void getLDCAccessToken(function(a, d) {
            return a ? (error.log(a), b.status(500).send(a)) : d ? (logger.bold("token: " + d), 
            downloadModules(c, d), b.status(200).send("Working on downloading modules.")) : (error.log(new Error("!token")), 
            b.status(500).send("!token"));
        })) : (error.log(new Error("!moduleDocs || !moduleDocs.length")), b.status(500).send("!moduleDocs || !moduleDocs.length"));
    });
};