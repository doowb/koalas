'use strict';

require('mocha');
var assert = require('assert');
var koalas = require('./');

describe('koalas', function() {
  it('should return the first value', function() {
    var expected = 'foo';
    var actual = koalas('foo', 'bar', 'baz', null, undefined);
    assert.equal(actual, expected);
  });

  it('should return the second value when first is null', function() {
    var expected = 'foo';
    var actual = koalas(null, 'foo', 'bar', 'baz', undefined);
    assert.equal(actual, expected);
  });

  it('should return the second value when first is undefined', function() {
    var expected = 'foo';
    var actual = koalas(undefined, 'foo', 'bar', 'baz', null);
    assert.equal(actual, expected);
  });

  it('should return the second value when first is NaN', function() {
    var expected = 'foo';
    var actual = koalas(NaN, 'foo', 'bar', 'baz', null);
    assert.equal(actual, expected);
  });

  it('should return a string', function() {
    var expected = 'foo';
    var actual = koalas(undefined, 'foo', 'bar', 'baz', null);
    assert.equal(actual, expected);
  });

  it('should return a number', function() {
    var expected = 42;
    var actual = koalas(undefined, null, 42, 'foo', {bar: 'baz'}, null);
    assert.equal(actual, expected);
  });

  it('should return an object', function() {
    var expected = {bar: 'baz'};
    var actual = koalas(undefined, null, {bar: 'baz'}, 42, 'foo', null);
    assert.deepEqual(actual, expected);
  });

  it('should return an array', function() {
    var expected = [{bar: 'baz'}, 'a', 42];
    var actual = koalas(undefined, null, [{bar: 'baz'}, 'a', 42], {bar: 'baz'}, 42, 'foo', null);
    assert.deepEqual(actual, expected);
  });

  it('should return an empty array', function() {
    var expected = [];
    var actual = koalas(undefined, null, [], [{bar: 'baz'}, 'a', 42], {bar: 'baz'}, 42, 'foo', null);
    assert.deepEqual(actual, expected);
  });

  it('should return an array with "invalid" values', function() {
    var expected = [undefined, null, NaN, {bar: 'baz'}, 'a', 42];
    var actual = koalas(undefined, null, [undefined, null, NaN, {bar: 'baz'}, 'a', 42], [{bar: 'baz'}, 'a', 42], {bar: 'baz'}, 42, 'foo', null);
    assert.equal(actual.length, expected.length);
    assert.equal(typeof actual[0], 'undefined');
    assert.equal(actual[1], null);
    assert(isNaN(actual[2]));
    assert.deepEqual(actual[3], expected[3]);
    assert.equal(actual[4], expected[4]);
    assert.equal(actual[5], expected[5]);
  });

  it('should return a RegExp', function() {
    var expected = /foo/gi;
    var actual = koalas(undefined, null, /foo/gi, [{bar: 'baz'}, 'a', 42], {bar: 'baz'}, 42, 'foo', null);
    assert.deepEqual(actual, expected);
  });

  it('should return a Buffer', function() {
    var expected = new Buffer('foo');
    var actual = koalas(undefined, null, new Buffer('foo'), [{bar: 'baz'}, 'a', 42], {bar: 'baz'}, 42, 'foo', null);
    assert.deepEqual(actual, expected);
  });

  it('should return last value when nothing is valid', function() {
    var actual = koalas(undefined, null, NaN);
    assert(isNaN(actual));
  });

  describe('strict', function() {
    it('should return the first value', function() {
      var expected = 'foo';
      var actual = koalas.strict('foo', 'bar', 'baz', null, undefined);
      assert.equal(actual, expected);
    });

    it('should return the first value when first is null', function() {
      var expected = null;
      var actual = koalas.strict(null, 'foo', 'bar', 'baz', undefined);
      assert.equal(actual, expected);
    });

    it('should return the second value when first is undefined', function() {
      var expected = 'foo';
      var actual = koalas.strict(undefined, 'foo', 'bar', 'baz', null);
      assert.equal(actual, expected);
    });

    it('should return the second value when first is NaN', function() {
      var expected = 'foo';
      var actual = koalas.strict(NaN, 'foo', 'bar', 'baz', null);
      assert.equal(actual, expected);
    });

    it('should return a string', function() {
      var expected = 'foo';
      var actual = koalas.strict(undefined, 'foo', 'bar', 'baz', null);
      assert.equal(actual, expected);
    });

    it('should return a number', function() {
      var expected = 42;
      var actual = koalas.strict(undefined, 42, 'foo', {bar: 'baz'}, null);
      assert.equal(actual, expected);
    });

    it('should return an object', function() {
      var expected = {bar: 'baz'};
      var actual = koalas.strict(undefined, {bar: 'baz'}, 42, 'foo', null);
      assert.deepEqual(actual, expected);
    });

    it('should return an array', function() {
      var expected = [{bar: 'baz'}, 'a', 42];
      var actual = koalas.strict(undefined, [{bar: 'baz'}, 'a', 42], {bar: 'baz'}, 42, 'foo', null);
      assert.deepEqual(actual, expected);
    });

    it('should return an empty array', function() {
      var expected = [];
      var actual = koalas.strict(undefined, [], [{bar: 'baz'}, 'a', 42], {bar: 'baz'}, 42, 'foo', null);
      assert.deepEqual(actual, expected);
    });

    it('should return an array with "invalid" values', function() {
      var expected = [undefined, null, NaN, {bar: 'baz'}, 'a', 42];
      var actual = koalas.strict(undefined, [undefined, null, NaN, {bar: 'baz'}, 'a', 42], [{bar: 'baz'}, 'a', 42], {bar: 'baz'}, 42, 'foo', null);
      assert.equal(actual.length, expected.length);
      assert.equal(typeof actual[0], 'undefined');
      assert.equal(actual[1], null);
      assert(isNaN(actual[2]));
      assert.deepEqual(actual[3], expected[3]);
      assert.equal(actual[4], expected[4]);
      assert.equal(actual[5], expected[5]);
    });

    it('should return a RegExp', function() {
      var expected = /foo/gi;
      var actual = koalas.strict(undefined, /foo/gi, [{bar: 'baz'}, 'a', 42], {bar: 'baz'}, 42, 'foo', null);
      assert.deepEqual(actual, expected);
    });

    it('should return a Buffer', function() {
      var expected = new Buffer('foo');
      var actual = koalas.strict(undefined, new Buffer('foo'), [{bar: 'baz'}, 'a', 42], {bar: 'baz'}, 42, 'foo', null);
      assert.deepEqual(actual, expected);
    });

    it('should return last value when nothing is valid', function() {
      var actual = koalas.strict(undefined, NaN);
      assert(isNaN(actual));
    });
  });

});
