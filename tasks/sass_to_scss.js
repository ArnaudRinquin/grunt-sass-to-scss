/*
 * grunt-sass-to-scss
 * https://github.com/arnaudrinquin/grunt-sass-to-scss
 *
 * Copyright (c) 2014 Arnaud Rinquin
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  'use strict';

  var p = require('prelude-ls');

  grunt.registerMultiTask('sass_to_scss', 'Convert sass to scss files', function() {

    var options = this.options({
      separator: grunt.util.linefeed
    });

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(f) {

      var validFiles = removeInvalidFiles(f);

      grunt.verbose.writeflags(validFiles, 'Valid files');

      writeFile(f.dest, concatOutput(validFiles, options));

      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

  var concatOutput = function(files, options) {
    return files.map(function(filepath) {
      var sass = grunt.file.read(filepath);
      return convertSassToScss(sass, options, filepath);
    }).join(grunt.util.normalizelf(options.separator));
  };

  var removeInvalidFiles = function(files) {
    return files.src.filter(function(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      } else {
        return true;
      }
    });
  };

  var writeFile = function (path, output) {
    if (output.length < 1) {
      warnOnEmptyFile(path);
    } else {
      grunt.file.write(path, output);
      grunt.log.writeln('File ' + path + ' created.');
    }
  };

  var warnOnEmptyFile = function (path) {
    grunt.log.warn('Destination (' + path + ') not written because compiled files were empty.');
  };

  var convertSassToScss = function(input){
    var lines, idx, j, braces, bracesString, reg, reg2;

    reg = /(^\s*)=(\s*)/;
    reg2 = /(^\s*)\+(\s*)/;

    function fn$(it){
      return lines.indexOf(it);
    }
    function fn1$(it){
      return it.i > lines[i].i;
    }

    if (input != null) {
      lines = p.map(function(it){
        grunt.verbose.writeln('before=' + it);
        it = it.replace(reg, function(match, p1, p2){
          return p1 + '@mixin' + (p2 !== '' ? p2 : ' ');
        });
        it = it.replace(reg2, function(match, p1, p2){
          return p1 + '@include' + (p2 !== '' ? p2 : ' ');
        });
        var m;
        m = it.match(/^\s+/);
        return {
          i: m != null ? m[0].length : 0,
          c: it
        };
      })( input.split('\n') );

      for (var i in lines) {
        idx = parseInt(i, 10);
        if (lines[idx].c.match(/[a-z]+/)) {
          j = p.last(
          p.map(fn$)(
          p.takeWhile(fn1$)(
          p.drop(idx + 1)(
          lines))));
          if (j != null) {
            lines[idx].c += '{';
            lines[j].c += '}';
          } else {
            braces = lines[idx].c.match(/\}+/);
            bracesString = braces ? braces[0] : "";
            lines[idx].c = lines[idx].c.replace(/\}+/, '') + ';' + bracesString;
          }
        }
      }
      return p.join('\n')(
      p.map(function(it){
        return it.c;
      })(
      lines));
    }
  };
};
