'use strict';

require('mocha');
var assert = require('assert');
var koalas = require('./');

var path = require('path');
var resolve = path.resolve;
var fs = require('fs');

var dir = path.join.bind(__dirname);

describe('koalas', function() {

  describe('coalesce', function() {

    it('should return the first value', function() {
      var expected = 'foo';
      var actual = koalas.coalesce('foo', 'bar', 'baz', null, undefined);
      assert.equal(expected, actual);
    });

    it('should return the second value when first is null', function() {
      var expected = 'foo';
      var actual = koalas.coalesce(null, 'foo', 'bar', 'baz', undefined);
      assert.equal(expected, actual);
    });

    it('should return the second value when first is undefined', function() {
      var expected = 'foo';
      var actual = koalas.coalesce(undefined, 'foo', 'bar', 'baz', null);
      assert.equal(expected, actual);
    });

  });

  describe('simple strings', function() {

    it('should return the first value', function() {
      var expected = 'foo';
      var actual = koalas('foo', 'bar', 'baz', null, undefined).value();
      assert.equal(expected, actual);
    });

    it('should return the second value when first is null', function() {
      var expected = 'foo';
      var actual = koalas(null, 'foo', 'bar', 'baz', undefined).value();
      assert.equal(expected, actual);
    });

    it('should return the second value when first is undefined', function() {
      var expected = 'foo';
      var actual = koalas(undefined, 'foo', 'bar', 'baz', null).value();
      assert.equal(expected, actual);
    });

  });

  describe('strings with functions', function() {

    var func = function(value) {
      if (value === 'foo') {
        return value;
      }
      return null;
    };

    it('should return the first value', function() {
      var expected = 'foo';
      var actual = koalas('foo', 'bar', 'baz', null, undefined).use(func).value();
      assert.equal(expected, actual);
    });

    it('should return the second value when first fails function test', function() {
      var expected = 'foo';
      var actual = koalas('bar', 'foo', 'baz', null, undefined).use(func).value();
      assert.equal(expected, actual);
    });

    it('should return the second value when first is null', function() {
      var expected = 'foo';
      var actual = koalas(null, 'foo', 'bar', 'baz', undefined).use(func).value();
      assert.equal(expected, actual);
    });

    it('should return the second value when first is undefined', function() {
      var expected = 'foo';
      var actual = koalas(undefined, 'foo', 'bar', 'baz', null).use(func).value();
      assert.equal(expected, actual);
    });

  });

  describe('file system', function() {

    it('should return the first file path that exists', function() {
      var expected = resolve(__dirname + '/index.js');
      var actual = koalas(
          resolve('some/path/to/nothing.js'),
          resolve('another/path/to/nothing.js'),
          resolve(__dirname + '/index.js'),
          resolve(__dirname + '/package.json'))
        .use(function(value) {
          if(fs.existsSync(value)) {
            return value;
          }
        })
        .value();
      assert.equal(expected, actual);
    });

    it('should return the first data file path that exists', function() {
      var expected = resolve(__dirname + '/package.json');
      var actual = koalas(
          resolve('some/path/to/nothing.js'),
          resolve('another/path/to/nothing.js'),
          resolve(__dirname + '/index.js'),
          resolve(__dirname + '/package.json'))
        .use(function(value) {
          if(fs.existsSync(value)) {
            return value;
          }
        })
        .use(function (value) {
          if (/\.json|\.yml|\.yaml^/.test(value)) {
            return value;
          }
        })
        .value();
      assert.equal(expected, actual);
    });

  });

  describe('advanced functions', function() {

    var prop = function(key) {
      return function(obj) {
        return obj[key];
      };
    };

    var func = function(key) {
      return function(obj) {
        return obj[key]();
      };
    };

    it('should check property on object', function() {
      var expected = 'bar';
      var actual = koalas(
          { first: 'item' },
          { second: 'item' },
          { foo: 'bar' })
        .use(prop('foo'))
        .value();
      assert.equal(expected, actual);
    });

    it('should return property value on object when some other ones are null', function() {
      var expected = 'bar';
      var actual = koalas(
          { foo: null },
          { foo: undefined },
          { foo: 'bar' },
          { foo: 'baz' })
        .use(prop('foo'))
        .value();
      assert.equal(expected, actual);
    });

    it('should return value from function on the provided objects', function() {
      var expected = 'bar';
      var getFoo = function() { return this.foo; };

      var actual = koalas(
          { foo: null, getFoo: getFoo },
          { foo: undefined, getFoo: getFoo },
          { foo: 'bar', getFoo: getFoo },
          { foo: 'baz', getFoo: getFoo })
        .use(func('getFoo'))
        .value();

      assert.equal(expected, actual);
    });
  });
});
