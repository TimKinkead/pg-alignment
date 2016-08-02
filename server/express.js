'use strict';

var config = require('../config.js');

//----------------------------------------------------------------------------------------------------------------------
// Dependencies

// TODO - upgrade connect-mongo

var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    path = require('path'),                                     // resolve file paths
    express = require('express'),                               // express application
    morgan = require('morgan'),                                 // console logger (using in dev)
    bodyParser = require('body-parser'),                        // parse request body
    session = require('express-session'),                       // sessions
    compress = require('compression'),                          // gzip response data if browser is compatible
    methodOverride = require('method-override'),                // enables app.put & app.delete requests
    cookieParser = require('cookie-parser'),                    // parse session cookies
    helmet = require('helmet'),						            // security
    passport = require('passport'),                             // authentication
    MongoStore = require('connect-mongo')(session),             // mongo specific sessions
    consolidate = require('consolidate');			            // template engine consolidation library

//----------------------------------------------------------------------------------------------------------------------
// Controllers

var file = require('./modules/file'),
    error; // = require('./modules/error'); // must be after models loaded

//----------------------------------------------------------------------------------------------------------------------
// Initialize Application

module.exports = function(mongoose) {

    // -- MODELS --

    // glob model files
    file.globber('server/models/*.js').forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });

    // -- INITIALIZATION --

    // initialize express app
    var app = express();

    // -- COMPRESSION --

    // compress (gzip) response data if browser is compatible (before express.static)
    app.use(compress());

    // -- VIEWS --

    // views static directory & views cache
    var staticDirectory;
    switch (process.env.NODE_ENV) {
        case 'development':
            staticDirectory = './client';
            app.set('views', staticDirectory);
            app.set('view cache', false);
            break;
        //case 'production':
        default:
            staticDirectory = './client-compiled';
            app.set('views', staticDirectory);
            app.locals.cache = 'memory';
            break;
    }

    // set .html as the default extension
    app.set('view engine', 'html');

    // assign the handlebars engine to .html files
    app.engine('.html', consolidate.handlebars);

    /*
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('json',
        function(obj) {
            return JSON.stringify(obj);
        }
    );
    */

    // -- REQUEST, BODY, COOKIES --

    // body parsing middleware (before methodOverride)
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // enable http method override for app.put & app.delete
    app.use(methodOverride());

    // cookie parsing middleware (before session)
    app.use(cookieParser());

    // -- SESSIONS --

    // express mongodb session storage
    app.use(session({
        name: config.project.id,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'sessions',
            autoReconnect: true
            //stringify: false
        }),
        saveUninitialized: true,
        resave: true,
        secret: 'keyboardcatmeowza'
    }));

    // use passport
    require('./config/passport')();
    app.use(passport.initialize());
    app.use(passport.session());

    // -- SECURITY --

    // use helmet to secure express headers
    app.use(helmet());

    // -- LOGGING --

    // show stack errors
    app.set('showStackError', true);

    // enable logger
    if (process.env.LOGGER === 'on') {
        app.use(morgan('dev', {immediate: true}));  // log @ req
        app.use(morgan('dev'));                     // log @ res
    }

    // -- ROUTING --
    
    app.route('/').get(require('./main/index.js'));
    app.route('/unsupported').get(require('./main/unsupported.js'));

    // glob routing files
    file.globber([
        'server/modules/**/routes.js',
        'server/modules/**/routes/*.js'
    ]).forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });
    

    // set app router & static folder
    // - permission checked in server/modules/core/routes.js
    app.use(express.static(path.resolve(staticDirectory)));

    // routing error
    error = require('./modules/error');
    app.use(function(req, res, next) {
        if (req.originalUrl.indexOf('/data/') > -1) {
            error.log(new Error('routing error: "'+req.originalUrl+'" not found'));
            return res.sendStatus(404);
        }
        next();
    });

    // remove '/' from end of path
    app.use(function(req, res, next) {
        if (req.path.length > 1 && req.path.lastIndexOf('/') + 1  === req.path.length) {
            return res.redirect(req.path.substr(0, req.path.length - 1));
        }
        next();
    });

    // return index.html
    app.use(require('./main/index.js'));

    // -- DONE --

    // return express server instance
    return app;
};
