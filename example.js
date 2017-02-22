'use strict';

var koalas = require('./');

console.log(koalas(undefined, null, NaN, 'a', 'b'));
//=> 'a'

console.log(koalas(undefined, null, NaN, {a: 'b'}, 'b'));
//=> {a: 'b'}

console.log(koalas(undefined, null, NaN, ['a', 'b', 'c'], {a: 'b'}, 'b'));
//=> ['a', 'b', 'c']
