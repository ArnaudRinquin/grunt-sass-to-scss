# grunt-sass-to-scss

> Convert sass to scss files. It is basivally a port from [@askucher](https://github.com/askucher) [script](http://develton.com/#/research/indent_to_braces_function). It also converts `+` and `=` sass specific syntaxe to scss `@include` and `@mixin`.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sass-to-scss --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sass-to-scss');
```

## The "sass_to_scss" task

### Overview
In your project's Gruntfile, add a section named `sass_to_scss` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sass_to_scss: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `'\n'`

A string value that is used to separate files when merging them.

### Usage Examples

#### Default Options

With default options, you can specify several files to be converted. The files
will be merged with a new line.

```js
grunt.initConfig({
  sass_to_scss: {
    options: {},
    files: {
      'dest/style.scss': ['src/file1.sass', 'src/file2.sass'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 0.1.8 - Remove // comment only lines
* 0.1.7 - Remove /* comment */ only lines
* 0.1.6 - Allow * only selectors
* 0.1.5 - Fix [issue #3](https://github.com/ArnaudRinquin/grunt-sass-to-scss/issues/3) for real
* 0.1.4 - Fix [#3](https://github.com/ArnaudRinquin/grunt-sass-to-scss/issues/3) + refactored tests and code
* 0.1.3 - Fix [#1](https://github.com/ArnaudRinquin/grunt-sass-to-scss/issues/1)
* 0.1.2 - Fix [#2](https://github.com/ArnaudRinquin/grunt-sass-to-scss/issues/2)
* 0.1.1 - Updated documentation, credits to @askucher
* 0.1.0 - Initial version, wrong documentation, no credit
