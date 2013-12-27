


var slice = Array.prototype.slice;

var noop = function(value) { return value; };

var create = function(args) {
  var obj = args[0];
  args = args.splice(1);
  function F() {
    return obj.apply(this, args);
  };
  F.prototype = obj.prototype;
  return new F();
};

var Koalas = function() {
	this.args = slice.call(arguments, 0);
	this.funcs = [];
	this.funcs.push(noop);
};

var koalas = module.exports = function() {
	return create([ Koalas ].concat(slice.call(arguments)));
};

Koalas.prototype.use = function (func) {
	this.funcs.push(func);
	return this;
};

Koalas.prototype.process = function(value) {
	var ret = value;
	for (var i = 0; i < this.funcs.length; i++) {
		ret = this.funcs[i](ret);
		if (typeof ret === 'undefined' || ret === null) {
			break;
		}
	}
	return ret;
};

Koalas.prototype.value = function() {
	var ret = null;
	for (var i = 0; i < this.args.length; i++) {
		var arg = this.process(this.args[i]);
		if (typeof arg !== 'undefined' && arg !== null) {
			ret = arg;
			break;
		}
	}
	return ret;
};