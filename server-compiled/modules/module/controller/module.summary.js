"use strict";

var mongoose = require("mongoose"), Module = mongoose.model("Module"), error = require("../../error"), logger = require("../../logger");

exports.summary = function(a, b) {
    function c() {
        if (e -= 1, 0 === e) return b.status(200).send(f);
    }
    function d(a, b) {
        b["ldcDbData.id"] = {
            $exists: !0
        }, Module.count(b, function(b, d) {
            b && error.log(new Error(b)), (d || 0 === d) && (f[a] = d), c();
        });
    }
    logger.filename(__filename);
    var e, f = {};
    e = 3, d("manualScores", {
        manualScores: {
            $exists: !0
        }
    }), d("predictedScores", {
        predictedScores: {
            $exists: !0
        }
    }), d("noScores", {
        manualScores: {
            $exists: !1
        },
        predictedScores: {
            $exists: !1
        }
    });
};