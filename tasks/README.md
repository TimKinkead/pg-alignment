# Grunt Tasks
[Grunt](http://gruntjs.com/api/grunt) is a javascript task runner.

### Built-In Tasks

The files in `tasks/config/*.js` are used to configure built-in tasks. They are bundled into a single configuration object in `gruntfile.js` and applied via `grunt.initConfig(config)`.

* [babel](https://www.npmjs.com/package/grunt-babel) - Transpile es6 javascript code.
* [clean](https://www.npmjs.com/package/grunt-contrib-clean) - Remove files or wipe entire directories.
* [concat](https://www.npmjs.com/package/grunt-contrib-concat) - Concatenate multiple files into a single file.
* [copy](https://www.npmjs.com/package/grunt-contrib-copy) - Copy files from one location to another.
* [express](https://www.npmjs.com/package/grunt-express-server) - Start an express application.
* [html2js](https://www.npmjs.com/package/grunt-html2js) - Bundle html files into a single javascript file.
* [htmlmin](https://www.npmjs.com/package/grunt-contrib-htmlmin) - Minify html files.
* [jshint](https://www.npmjs.com/package/grunt-contrib-jshint) - Check javascript code.
* [less](https://www.npmjs.com/package/grunt-lesslint) - Compile less to css.
* [uglify](https://www.npmjs.com/package/grunt-contrib-uglify) - Minify and uglify files.

### Custom Tasks

Custom tasks are run on the command line via `grunt <task name>`.

* **`grunt`** - This will run `grunt default`.
    * **`grunt default`** - This is a pass through for `grunt development`.
* **`grunt development`** - Compile & transpile client/server directories and start application in development mode.
    * **`grunt client`** - Compile & transpile *client directory only* and start application in development mode.
    * **`grunt server`** - Compile & transpile *server directory only* and start application in development mode.
    * **`grunt client-dev`** - Compile & transpile *client directory only* for development.
    * **`grunt server-dev`** - Compile & transpile *server directory only* for development.
* **`grunt production`** - Compile & transpile client/server directories and start application in production mode.
    * **`grunt client-prod`** - Compile & transpile *client directory only* for production.
    * **`grunt server-prod`** - Compile & transpile *server directory only* for production.