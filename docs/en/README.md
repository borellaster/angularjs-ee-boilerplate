# Angular.js Enterprise Edition Boilerplate

<!-- toc -->

* [Overview](#overview)
* [Installation Guide](#installation-guide)
  * [Prerequisites](#prerequisites)
* [Use Guide](#use-guide)
  * [Tools for Development Workflow](#tools-for-development-workflow)
    * [Build](#build)
    * [Code Generation](#code-generation)
    * [Development](#development)
    * [Distribuction Preview](#distribuction-preview)
    * [Tests](#tests)
    * [Tools Configuration](#tools-configuration)
    * [Tips](#tips)
    * [Known Issues](#known-issues)
  * [Publishing tool for GitHub gh-pages](#publishing-tool-for-github-gh-pages)
* [Directories Structure](#directories-structure)
  * [Development](#development)
  * [Publishing](#publishing)
  * [Project](#project)

<!-- toc stop -->


## Overview

FrontEnd Boilerplate project with development and publishing tools (for GitHub gh-pages)

* **Important**: to define a better communication between frontend and backend (server), please consider follow the given proposal [REST URL Design](rest_url_design.md)


## Installation Guide

Enter the following commands in the terminal

```bash
$ git clone https://github.com/erkobridee/angularjs-ee-boilerplate.git
$ cd angularjs-ee-boilerplate
$ cd publicher
$ npm install
$ cd ..
$ cd tools
$ npm run setup
```


### Prerequisites

* Must have [Git](http://git-scm.com/) installed

* Must have [node.js (at least v0.10.0)](http://nodejs.org/) installed with npm (Node Package Manager)

* Must have [Grunt](https://github.com/gruntjs/grunt) node package installed globally


## Use Guide

> `./` means root directoy

### Tools for Development Workflow

> Inside `./tools` directory, available grunt.js commands

* `grunt` >> (default task) that will execute lintspaces, jshint to verify and ensure js code quality and cleanup build and dist directories

  > **Attention:** the following task **lintspaces** will verify the patterns insides files according rules inside `.editorconfig` in the root directory

#### Build

* `grunt build:dev` >> prepare files for development, inside `./tools/.temp` directory

* `grunt build:prod` >> cleanup build directories, execute test's and then prepare files for distribution / production, inside `./dist` directory

#### Code Generation

* `grunt generate` >> ask for which code generate option you want, values for the chosen and finally output destination

#### Development

* `grunt dev:livereload` >> first will execute `build:dev` task, after that start web server with livereload support and watch changes on files *.html, .css and .js*, that will update all browsers and devices connect to server

* `grunt dev:livereload:proxy` >> beyond the `grunt dev` tasks, this task create a proxy to route requests to other server based on given context, for example `/rest`

* `grunt dev:sync` >> first will execute `build:dev` task, after that start web server with browser-sync support and watch changes on files *.html, .css and .js*, that will update all browsers and devices connect to server and sync data and navigation

* `grunt dev:sync:proxy` >> beyond the `grunt dev:sync` tasks, this task create a proxy to route requests to other server based on given context, for example `/rest`

* alias

  * `grunt dev` >> alias to `grunt dev:livereload`

  * `grunt dev:proxy` >> alias to `grunt dev:livereload:proxy`

#### Distribuction Preview

* `grunt dist` >> first will execute `build:prod` task, after that start web server with generated files

* `grunt dist:proxy` >> first will execute `build:prod` task, after that start web server with generated files + proxy to route requests to other server based on given context, for example `/rest`

* `grunt dist:sync` >> first will execute `build:prod` task, after that start web server with generated files + browser-sync to synchronize data and navigation

* `grunt dist:sync:proxy` >> first will execute `build:prod` task, after that start web server with generated files + browser-sync to synchronize data and navigation + proxy to route requests to other server based on given context, for example `/rest`

#### Tests

* `grunt ci` - cleanup build directories and then execute `karma:ci` grunt task that run test's

* `grunt reports` - cleanup build directories, execute `karma:reports` grunt task that generate coverage and jasmine html reports and then open reports output directory

* `grunt specs` - first generate coverage and jasmine html reports, start karma with watch process and webserver with livereload watching reports html's

> **Attention:** if you want to run with dev flow, run first dev task (ex.: `grunt dev`) in one terminal and in other terminal run `grunt specs`

#### Tools Configuration

* Tools global configs: `./tools/config.js` which is used on `./tools/helpers/grunt/config/project.js`

  * Proxy routing configuration ( see: `var backend = { ...` )

    * Proxy Grunt.js Plugin : [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) | [Using grunt-connect-proxy](http://www.fettblog.eu/blog/2013/09/20/using-grunt-connect-proxy/)

  * To center and make more easy to manage Grunt.js tasks configurations was defined the file `./tools/helpers/grunt/config/project.js`

#### Tips

* If you use Sublime Text, check this out:

  * [[GitHub] erkobridee / sublime-angularjs-ee-snippets](https://github.com/erkobridee/sublime-angularjs-ee-snippets) - Sublime Text 2 / 3 Snippets and Completions for Angular.js and Require.js (focused to the angularjs-ee-boilerplate code)

  * [[GitHub] caiogondim / jasmine-sublime-snippets](https://github.com/caiogondim/jasmine-sublime-snippets) - Snippets for Jasmine, the BDD framework for testing JavaScript, in Sublime Text

#### Known Issues

##### Mac OSX

* [How do I fix the error EMFILE: Too many opened files? | grunt-contrib-watch - GitHub](https://github.com/gruntjs/grunt-contrib-watch#how-do-i-fix-the-error-emfile-too-many-opened-files)

  * [[SuperUser] How to change default ulimit values in Mac OS X 10.6?](https://superuser.com/questions/261023/how-to-change-default-ulimit-values-in-mac-os-x-10-6)

  This is because of your system's max opened file limit.
  For OSX the default is very low (256).
  Temporarily increase your limit with `ulimit -n 10480`,
  the number being the new max limit.

  In some versions of OSX the above solution doesn't work.
  In that case try `launchctl limit maxfiles 10480 10480` and restart your terminal.

##### Windows

* Behind a NTLM proxy

  * run `npm install` two times, to install all dependencies


### Publishing tool for GitHub gh-pages

> Inside `./publisher` directory, available grunt.js commands

* `grunt init` >> do project clone from GitHub inside `./publisher/local/gh-pages` directory and checkout `gh-pages` branch, which is used to update remote `gh-pages` branch on GitHub

> Execute this command at once, before the following commands

--

* `grunt publish` >> this task will invoke `grunt build:prod` command inside `./tools` directory, then copy generated files from `./dist` to `./publisher/local/gh-pages`, commit files and finally push to `gh-pages` branch on GitHub

* `grunt publish:dev` - this task will copy files  from `./src` to `./publisher/local/gh-pages`, commit files and finally push to `gh-pages` branch on GitHub


## Directories Structure

```
./
  /src        >> project source
  /tools      >> development tools
  /publisher  >> publisher tool
```


### Development

```
/tools
  /helpers
    /lib                 >> auxiliary processing
    /scripts             >> automation processing
    /html_report_template
      jasmine.html       >> jasmine html report template
    /grunt
      /config            >> configuration files to grunt.js tasks
      /tasks             >> custom grunt.js tasks
    /tests
      require.config.js  >> load application files and test's specs to Karma Runner
  /templates             >> templates files for grunt.js generate task
  config.js              >> global configs to grunt.js tasks
  Gruntfile.js           >> main grunt.js configuration file
  package.json           >> node.js 'tools' project and dependencies configuration
```


### Publishing

```
/publisher
  /helpers
    /grunt
      /config     >> configuration files to grunt.js tasks
      /tasks      >> custom grunt.js tasks
  Gruntfile.js    >> main grunt.js configuration file
  package.json    >> node.js 'publisher' project and dependencies configuration
```


### Project

> The directories structure of the project is organized following the BDD (Behavior Driven Development [wikipedia](https://en.wikipedia.org/wiki/Behavior-driven_development)) concept, where all one "use case" (behavior) is inside the same directory, which this allow code and behavior reuse

```
/src
  /app

    /bookmarks >> CRUD example with mock
      >> require.load.js map all js files in the directory
         this file is referenced as a dependency on /app/main/module.js
      /mock
        >> require.load.js map all js files in the directory
           this file is referenced as a dependency on /require.mock.load.js
      /tests/unit
        >> require.load.js map all js files in the directory
           this file is referenced as a dependency on /require.unit.load.js

    /about
      >> module referenced as a dependency on /app/main/module.js

    /help
      >> module referenced as a dependency on /app/main/module.js

    /home
      >> module referenced as a dependency on /app/main/module.js

    /main
      >> main application module where other modules are charged on /module.js
      >> require.load.js map all js files in the directory
         this file is referenced as a dependency on /ng.app.js

  /shared
    /fallback
      >> scripts for Internet Explorer
    /fend
      >> set of commons and useful reusable modules across projects and other modules
    /mock
      >> module that enables emulate the backend
    /less
      /bootstrap
          default.less >> default theme and configuration for Bootstrap,
                          which is imported in /less/app.less
      >> other configurations and components

  /less
    app.less >> map .less files that generate /styles/app.css

  /styles
    app.css

  /vendor
    >> third party libraries (ex.: twitter bootstrap, jquery, angular.js, ...)


  require.mock.load.js  >> list and reference all mocks to be loaded
                           this file is referenced as a dependency on /ng.app.js

  require.unit.load.js  >> list and reference all tests unit to be loaded
                           this file is referenced as dependency on
                           ./tools/helpers/tests/require.config.js

  ng.app.js             >> where start Angular.js application

  require.config.js     >> main configuration file to load all needed JavaScripts
                           files to execute /ng.app.js

  index.html
```
