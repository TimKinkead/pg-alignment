"use strict";

var mongoose = require("mongoose"), Schema = mongoose.Schema, ModuleSchema = new Schema({
    ldcId: {
        type: String,
        required: !0,
        unique: !0
    },
    spreadsheetData: {
        type: Object
    },
    ldcApiData: {
        type: Object
    },
    ldcDbData: {
        type: Object
    },
    downloadError: {
        statusCode: {
            type: Number
        },
        body: {
            type: Object
        }
    },
    manualScores: {
        type: Object
    },
    predictedScores: {
        type: Object
    },
    modified: {
        type: Date,
        "default": Date.now
    },
    created: {
        type: Date,
        "default": Date.now
    }
});

mongoose.model("Module", ModuleSchema);