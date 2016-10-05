"use strict";

var config = require("../config.js"), fs = require("fs"), http = require("http"), https = require("https"), path = require("path"), express = require("express"), morgan = require("morgan"), bodyParser = require("body-parser"), session = require("express-session"), compress = require("compression"), methodOverride = require("method-override"), cookieParser = require("cookie-parser"), helmet = require("helmet"), passport = require("passport"), MongoStore = require("connect-mongo")(session), consolidate = require("consolidate"), file = require("./modules/file"), error;

module.exports = function(a) {
    file.globber("server/models/*.js").forEach(function(a) {
        require(path.resolve(a));
    });
    var b = express();
    b.use(compress());
    var c;
    switch (process.env.NODE_ENV) {
      case "development":
        c = "./client", b.set("views", c), b.set("view cache", !1);
        break;

      default:
        c = "./client-compiled", b.set("views", c), b.locals.cache = "memory";
    }
    return b.set("view engine", "html"), b.engine(".html", consolidate.handlebars), 
    b.use(bodyParser.urlencoded({
        extended: !0
    })), b.use(bodyParser.json()), b.use(methodOverride()), b.use(cookieParser()), b.use(session({
        name: config.project.id,
        store: new MongoStore({
            mongooseConnection: a.connection,
            collection: "sessions",
            autoReconnect: !0
        }),
        saveUninitialized: !0,
        resave: !0,
        secret: "keyboardcatmeowza"
    })), require("./config/passport")(), b.use(passport.initialize()), b.use(passport.session()), 
    b.use(helmet()), b.set("showStackError", !0), "on" === process.env.LOGGER && (b.use(morgan("dev", {
        immediate: !0
    })), b.use(morgan("dev"))), b.route("/").get(require("./main/index.js")), b.route("/unsupported").get(require("./main/unsupported.js")), 
    file.globber([ "server/modules/**/routes.js", "server/modules/**/routes/*.js" ]).forEach(function(a) {
        require(path.resolve(a))(b);
    }), b.use(express["static"](path.resolve(c))), error = require("./modules/error"), 
    b.use(function(a, b, c) {
        return a.originalUrl.indexOf("/data/") > -1 ? (error.log(new Error('routing error: "' + a.originalUrl + '" not found')), 
        b.sendStatus(404)) : void c();
    }), b.use(function(a, b, c) {
        return a.path.length > 1 && a.path.lastIndexOf("/") + 1 === a.path.length ? b.redirect(a.path.substr(0, a.path.length - 1)) : void c();
    }), b.use(require("./main/index.js")), b;
};