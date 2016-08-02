# Server Side Code

This directory contains the code for the back-end, node/express server application.

*Note:* All code in this `server` directory is compiled using grunt/babel and copied to the `server-compiled` directory for running in development and production. See `/tasks/README.md` for more information on the `grunt` and `grunt production` tasks.

### Config

Configuration for the express server application.

* [PassportJS](http://passportjs.org/) strategies.

### Main

* `index.js` - render the angular application skeleton
* `unsupported.js` - render the unsupported page

### Models

Data models that map to collections in the MongoDB database.

* Each file is a [MongooseJS](http://mongoosejs.com/) model.

### Modules

Module specific routes and controllers. This is where most server-side operations are performed.

### express.js

This file starts the express application.