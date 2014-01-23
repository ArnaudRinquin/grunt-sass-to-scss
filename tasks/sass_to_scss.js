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
  var _ = grunt.util._;

  var mixin_alias_regex = /(^\s*)=(\s*)/;
  var include_alias_regex = /(^\s*)\+(\s*)/;

  grunt.registerMultiTask('sass_to_scss', 'Convert sass to scss files', function() {

    var options = this.options({
      separator: grunt.util.linefeed
    });

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(f) {

      var validFiles = removeInvalidFiles(f);

      grunt.verbose.writeflags(validFiles, 'Valid files');

      writeFile(f.dest, concatOutput(validFiles, options));
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

  var replaceIncludeAlias = function(line){
    return line.replace(include_alias_regex, function(match, spacesBefore, spacesAfter){
      return spacesBefore + '@include' + (spacesAfter !== '' ? spacesAfter : ' ');
    });
  };

  var replaceMixinAlias = function(line){
    return line.replace(mixin_alias_regex, function(match, spacesBefore, spacesAfter){
      return spacesBefore + '@mixin' + (spacesAfter !== '' ? spacesAfter : ' ');
    });
  };

  var insertBeforeComment = function(inserted, text){
    var index = text.indexOf('//');

    if(index > -1) {
      return text.slice(0, index) + inserted + text.substr(index);
    } else {
      return text + inserted;
    }
  };

  var insertBeforeClosingBrackets = function(inserted, text){
    var value = text.replace(/([^\}]*)(\/\/.*)?/,
      function(match, beforeBrackets, brackets){
        return beforeBrackets + inserted + (brackets ? brackets : '');
      }
    );

    return value;
  };

  var convertSassToScss = function(input, options){
    var lines, lastBlockLineIndex, braces, bracesString;

    function fn$(it){
      return lines.indexOf(it);
    }
    function fn1$(it){
      return it.indentation > lines[idx].indentation;
    }

    if (input != null) {

      var raw_lines = _.reject(
        input.split('\n'), // split every lines
        function(line){
          return line.match(/^\s*$/); // reject empty ones
        }
      );

      // Cleanup lines and add indentation information
      lines = _.map(raw_lines, function(line){

        line = replaceIncludeAlias(line);
        line = replaceMixinAlias(line);

        var match = line.match(/^\s+/);

        return {
          indentation: match != null ? match[0].length : 0,
          text: line
        };
      });

      for (var idx in lines) {

        idx = parseInt(idx, 10);
        var line = lines[idx];

        if (line.text.match(/[a-z>~*]+/)) {

          lastBlockLineIndex = p.last(
            p.map(fn$)(
              p.takeWhile(fn1$)(
                p.drop(idx + 1)( lines))));

          if (lastBlockLineIndex != null) {

            lines[idx].text = insertBeforeComment('{', lines[idx].text);
            lines[lastBlockLineIndex].text = insertBeforeComment('}', lines[lastBlockLineIndex].text);
          } else {

            lines[idx].text = insertBeforeClosingBrackets(';', lines[idx].text );
          }
        }
      }

      // Return lines content joined in a single string
      return _.map(lines, function(it){
        return it.text;
      }).join(grunt.util.normalizelf(options.separator));
    }
  };
};
