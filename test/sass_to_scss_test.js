'use strict';

var grunt = require('grunt');

var assertFileEqual = function(test, fileName, message) {
  var actual = grunt.file.read('tmp/' + fileName);
  var expected = grunt.file.read('test/expected/' + fileName);
  test.equal(actual, expected, message);
};

exports.sass_to_scss = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  basic: function(test) {

    assertFileEqual(
      test,
      'basic',
      'should convert the basic cases right');

    test.done();
  },
  non_characters_selectors: function(test) {

    assertFileEqual(
      test,
      'non_characters_selectors',
      'should detect selectors not containing characters');

    test.done();
  },

  include_and_mixin_aliases: function(test) {

    assertFileEqual(
      test,
      'include_and_mixin_aliases',
      'should convert `+` and `=` aliases');

    test.done();
  },

  last_block_line_comment: function(test) {

    assertFileEqual(
      test,
      'last_block_line_comment',
      'should handle comments on the last line');

    test.done();
  }
};
