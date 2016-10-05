"use strict";

var mongoose = require("mongoose"), Module = mongoose.model("Module"), error = require("../../error"), logger = require("../../logger");

exports.list = function(a, b) {
    logger.filename(__filename);
    var c = {
        "ldcDbData.id": {
            $exists: !0
        }
    }, d = {
        "ldcDbData.id": 1
    }, e = a.query.skip ? Number(a.query.skip) : 0, f = a.query.limit ? Number(a.query.limit) : 100;
    switch (a.query.filterBy) {
      case "manual scores":
        c.manualScores = {
            $exists: !0
        };
        break;

      case "predicted scores":
        c.predictedScores = {
            $exists: !0
        };
        break;

      case "no scores":
        c.manualScores = {
            $exists: !1
        }, c.predictedScores = {
            $exists: !1
        };
    }
    logger.dash("getting modules"), Module.find(c).select("ldcDbData.id ldcDbData.name ldcDbData.uuid manualScores predictedScores").sort(d).skip(e).limit(f).exec(function(a, c) {
        return a ? (a = new Error(a), error.log(a), b.status(500).send(a)) : (logger.arrow("returning " + c.length + " modules"), 
        b.status(200).send(c));
    });
};