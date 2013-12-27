
var expect = require('chai').expect;
var koalas = require('../');

var path = require('path');
var resolve = path.resolve;
var fs = require('fs');

var dir = path.join.bind(__dirname);

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
	    expect(actual).to.eql(expected);
	  });

	  it('should return the second value when first fails function test', function() {
	    var expected = 'foo';
	    var actual = koalas('bar', 'foo', 'baz', null, undefined).use(func).value();
	    expect(actual).to.eql(expected);
	  });

	  it('should return the second value when first is null', function() {
	    var expected = 'foo';
	    var actual = koalas(null, 'foo', 'bar', 'baz', undefined).use(func).value();
	    expect(actual).to.eql(expected);
	  });

	  it('should return the second value when first is undefined', function() {
	    var expected = 'foo';
	    var actual = koalas(undefined, 'foo', 'bar', 'baz', null).use(func).value();
	    expect(actual).to.eql(expected);
	  });
	
	});

	describe('file system', function() {
	
	  it('should return the first file path that exists', function() {
	    var expected = resolve(dir('index.js'));
	    var actual = koalas(
	    		resolve('some/path/to/nothing.js'),
	    		resolve('another/path/to/nothing.js'),
	    		resolve(dir('index.js')),
	    		resolve(dir('package.json')))
	    	.use(function(value) {
	    		if(fs.existsSync(value)) {
	    			return value;
	    		}
	    	})
	    	.value();
	    expect(actual).to.eql(expected);
	  });
	
	});
  
});