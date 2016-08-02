# Alignment

*A Preva Group Project* - [prevagroup.com](http://prevagroup.com)

### Project Description

An education research project that aims to leverage machine learning to predict alignment to common core for a variety of teaching modules.

[alignment.prevagroup.com](http://alignment.prevagroup.com)

### Development Details

* This project uses a MEAN stack. ([MongoDB](https://docs.mongodb.com/manual), [Express](https://expressjs.com), [Angular](https://angularjs.org), [Node](https://nodejs.org/en))
* The javascript task runner [Grunt](http://gruntjs.com) is used to compile code.
* The javascript compiler [Babel](https://babeljs.io/) is used to transpile ES2015 javascript.
* The live site is hosted on [AWS](https://aws.amazon.com/) and managed via [OpsWorks](https://console.aws.amazon.com/opsworks/home?region=us-west-2).

### Getting Started

* Download [GitHub Desktop](https://desktop.github.com/).
    * Use GitHub Desktop to clone this repository (alignment) to your local machine.
* Download an [IDE](http://paulb.gd/comparing-nodejs-ides/)
    * Use your IDE to open the project files.
* Install [MongoDB](https://www.mongodb.org/downloads#production).
    * Use the [MongoDB download page](https://www.mongodb.org/downloads#production).
    * For additional guidance follow a [tutorial](https://docs.mongodb.org/manual/administration/install-community/).
* Install [NodeJS](https://nodejs.org/en/).
    * NodeJS comes with [NPM](https://www.npmjs.com/) (Node Package Manager).
* Install the project dependencies.
    * Open a terminal.
    * Change directory to the project root (wherever GitHub cloned the project). `cd C:\<yourname>\Documents\GitHub\alignment`
    * Install the node package dependencies using [NPM](https://www.npmjs.com/).
        * Run `npm install`.
        * The node package dependencies listed in `package.json` will be installed in the `node_modules` directory.
    * Install the web package dependencies using [Bower](http://bower.io/).
        * Install Bower globally with `npm install bower -g`.
        * Run `bower install`.
        * The web packages listed in `bower.json` will be installed in the `client/lib` directory.
* Install [Grunt](http://gruntjs.com/)'s command line interface globally.
    * Run `npm install grunt-cli -g`.

### Starting The Application Locally

* Make sure MongoDB's [mongod process](https://docs.mongodb.org/manual/reference/program/mongod/) is running.
    * Open a terminal.
    * Change directory to MongoDB's install location. `cd C:\Program Files\MongoDB\Server\3.0\bin`
    * Start the mongod process with the command `mongod`.
* Start the alignment application.
    * Open another terminal.
    * Change directory to the project root (wherever GitHub cloned the project). `cd C:\<yourname>\Documents\GitHub\alignment`
    * Start the application with the command `grunt`.

### Accessing the Database through the MongoDB Shell

* Make sure MongoDB's mongod process is running.
    * See above.
* Start the [mongo shell](https://docs.mongodb.org/manual/reference/program/mongo/).
    * Change directory to MongoDB's install location. `cd C:\Program Files\MongoDB\Server\3.0\bin`
    * Start the mongo shell with the command `mongo`.
* Note: If you add MongoDB's install location to your path environment variable, you can run `mongod` and `mongo` from any directory.

### The Project Root Directory

| Name | Description |
| ---- | ----------- |
| **client** | Directory for the front-end (client-side) angular application. |
| **client-compiled** | Compiled front-end code for running in production. |
| **node_modules** | Directory for the node package project dependencies installed via NPM. |
| **server** | Directory for the back-end (server-side) expressjs application. |
| **server-compiled** | Compiled back-end code for runing in development and production. |
| **tasks** | Directory for grunt tasks that are run with grunt command line tool. |
| **temp** | Directory for temporary files. |
| **.babelrc** | Configuration for the javascript compiler Babel. |
| **.bowerrc** | Configuration for the location where web packages installed via Bower should be saved. |
| **.gitignore** | Configuration for the files that should be ignored when committing to GitHub. |
| **.jshintrc** | Configuration for the 'jshint' grunt task. |
| **auth.js** | All passwords and keys for the APIs that this project uses. |
| **bower.json** | The front-end angular application configuration file. It defines the required bower packages. |
| **config.js** | Configuration file for project information and project files. |
| **gruntfile.js** | This file bundles all of the grunt tasks. |
| **LICENSE** | The project license. |
| **package.json** | The back-end express application configuration file. It defines the required node packages. |
| **README.md** | The file that you're looking at right now! |
| **server.js** | This file starts the server. |

### Git

* The project code is hosted on [GitHub](https://github.com/) at [github.com/tselby/pg-alignment](https://github.com/tselby/pg-alignment).
    * All development is performed on the `master` branch.
    * Code is pushed to the `production` branch via the following terminal commands.
        * `git checkout production` - switch to the production branch
        * `git pull` - sync with the remote production branch
        * `git merge --no-ff master` - merge the master branch into the production branch
        * `grunt production` - compile the code for running in production and start the server for testing purposes
        * `git add .` - stage all changes for commit
        * `git commit -m "Grunt Production"` - commit compiled code to production branch
        * `git push` - push changes to the remote production branch
        * `git checkout master` - switch back to the master branch