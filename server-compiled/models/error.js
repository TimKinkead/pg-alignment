"use strict";

var mongoose = require("mongoose"), Schema = mongoose.Schema, pkg = require("../../package.json"), ErrorSchema = new Schema({
    name: {
        type: String
    },
    message: {
        type: String
    },
    stack: [ {
        type: String
    } ],
    type: {
        type: String,
        "enum": [ "server", "client" ]
    },
    priority: {
        type: Boolean
    },
    info: {
        type: Object
    },
    release: {
        type: String,
        "default": pkg.version
    },
    created: {
        type: Date,
        "default": Date.now
    }
});

ErrorSchema.pre("validate", function(a) {
    if (this.stack) {
        var b;
        if (this.stack.length) {
            b = "";
            for (var c = 0, d = this.stack.length; c < d; c++) b += this.stack[c].toString() + (c < d - 1 ? "\n" : "");
        } else b = this.stack.toString();
        this.stack = b.split(/\n\s*/);
    }
    a();
}), mongoose.model("Error", ErrorSchema);