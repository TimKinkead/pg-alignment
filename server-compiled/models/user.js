"use strict";

var mongoose = require("mongoose"), Schema = mongoose.Schema, crypto = require("crypto"), UserSchema = new Schema({
    id: {
        type: Number,
        required: !0,
        unique: !0
    },
    name: {
        type: String,
        required: !0
    },
    firstName: {
        type: String,
        required: !0
    },
    lastName: {
        type: String,
        required: !0
    },
    email: {
        type: String,
        trim: !0,
        lowercase: !0,
        match: /.+\@.+\..+/,
        required: !0,
        unique: !0
    },
    password: {
        type: String,
        required: !1
    },
    salt: {
        type: String
    },
    passwordResetCode: {
        type: String
    },
    passwordResetExp: {
        type: Date
    },
    admin: {
        type: Boolean,
        "default": !1
    },
    created: {
        type: Date,
        "default": Date.now
    }
});

UserSchema.virtual("initials").get(function() {
    return this.firstName.slice(0, 1).toUpperCase() + this.lastName.slice(0, 1).toUpperCase();
}), UserSchema.methods.hashPassword = function(a) {
    return this.salt && a ? crypto.pbkdf2Sync(a, this.salt, 1e4, 64).toString("base64") : a;
}, UserSchema.methods.authenticate = function(a) {
    return this.password === this.hashPassword(a);
}, UserSchema.statics.checkNewEmail = function(a, b) {
    if (!a) return b(new Error("!email"));
    var c = this;
    c.count({
        email: a
    }).exec(function(a, c) {
        return a ? b(new Error(a)) : b(null, 0 === c);
    });
}, UserSchema.statics.uniqueId = function(a) {
    function b() {
        for (var a = "", b = 0; b < e; b++) a += Math.floor(10 * Math.random());
        return "0" === a.charAt(0) && (a = "1" + a), Number(a);
    }
    function c(g) {
        d.count({
            id: g
        }).exec(function(d, h) {
            return d ? a(new Error(d)) : 0 === h ? a(null, g) : (f++, f > 10 && (e++, f = 0), 
            void c(b()));
        });
    }
    var d = this, e = 4, f = 0;
    c(b());
}, UserSchema.pre("validate", function(a) {
    this.password && (this.salt = new Buffer(crypto.randomBytes(16).toString("base64"), "base64"), 
    this.password = this.hashPassword(this.password)), this.name = this.firstName + " " + this.lastName, 
    a();
}), mongoose.model("User", UserSchema);