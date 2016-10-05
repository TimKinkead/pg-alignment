"use strict";

var user = require("../user");

module.exports = function(a) {
    a.route("/data/user").get(user.read), a.route("/data/user/list").get(user.list), 
    a.route("/data/user/sign-up").post(user.signUp), a.route("/data/user/login").post(user.login), 
    a.route("/data/user/logout").get(user.logout), a.route("/data/user/forgot-password").post(user.forgotPassword), 
    a.route("/data/user/reset-password").post(user.resetPassword), a.route("/data/user/settings").get(user.readSettings).put(user.updateSettings), 
    a.route("/data/user/count").get(user.count);
};