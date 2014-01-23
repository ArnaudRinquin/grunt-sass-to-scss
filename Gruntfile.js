/*
 * grunt-sass-to-scss
 * https://github.com/arnaudrinquin/grunt-sass-to-scss
 *
 * Copyright (c) 2014 Arnaud Rinquin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    sass_to_scss: {
      tests: {
        options: {
        },
        files: {
          'tmp/basic': ['test/fixtures/basic'],
          'tmp/non_characters_selectors': ['test/fixtures/non_characters_selectors'],
          'tmp/last_block_line_comment': ['test/fixtures/last_block_line_comment'],
          'tmp/include_and_mixin_aliases': ['test/fixtures/include_and_mixin_aliases'],
        },
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sass_to_scss', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
