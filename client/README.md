# Client Code

This directory contains the code for the front-end, single-page angular app that gets shipped by the server to a client.

*Note:* All code in this `client` directory is compiled using grunt and copied to the `client-compiled` directory for running in production. See `/tasks/README.md` for more information on the `grunt production` task.

### lib

Bower components installed via `bower install --save <pkg name>` as listed in `bower.json`

### modules

* `core`
    * `config` - core config for the angular app
    * `less` - bootstrap & custom styles using [less](http://lesscss.org/)
    * `app.js` - this file starts the angular application
    * `routes.js` - the routes (or states) of the application
    * `user.js` - the 'CurrentUser' service
* `main`
    * Each directory represents an application state and its associated views and controllers.
* `parts`
    * `directives` - angular directives
    * `filters` - angular filters
    * `navbar` - the navigation bar

### other files

| File Name | Description |
| --------- | ----------- |
| index.html | The angular app skeleton. It uses [handlebars](http://handlebarsjs.com) syntax and is rendered by the server via`server/main/index.js`. |
| unsupported.html | The html rendered when a browser is unsupported. |
| styles.css | Compiled CSS stylesheet for html files. This file is compiled by grunt. |
| favicon.ico | Icon that displays on a browser tab. |
| humans.txt | A file for humans to read. |
| robots.txt | A file for robots to read. |
