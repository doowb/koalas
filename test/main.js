
var expect = require('chai').expect;
var koalas = require('../');

describe('koalas', function() {

	describe('simple strings', function() {

	  it('should return the first value', function() {
	    var expected = 'foo';
	    var actual = koalas('foo', 'bar', 'baz', null, undefined).value();
	    expect(actual).to.eql(expected);
	  });

		it('should return the second value when first is null', function() {
	    var expected = 'foo';
	    var actual = koalas(null, 'foo', 'bar', 'baz', undefined).value();
	    expect(actual).to.eql(expected);
	  });

	  it('should return the second value when first is undefined', function() {
	    var expected = 'foo';
	    var actual = koalas(undefined, 'foo', 'bar', 'baz', null).value();
	    expect(actual).to.eql(expected);
	  });

	});

	
  
});