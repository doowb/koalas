'use strict';

/**
 * Coalesce function to find the first valid value.
 * A valid value is one that is not undefined, not null and not NaN (not a number).
 *
 * ```js
 * console.log(koalas(undefined, null, NaN, 'a', 'b'));
 * //=> 'a'
 *
 * console.log(koalas(undefined, null, NaN, {a: 'b'}, 'b'));
 * //=> {a: 'b'}
 *
 * console.log(koalas(undefined, null, NaN, ['a', 'b', 'c'], {a: 'b'}, 'b'));
 * //=> ['a', 'b', 'c']
 * ```
 * @name koalas
 * @param {Mixed} `arguments` Pass in any amount of arguments.
 * @return {Mixed} First valid value.
 * @api public
 */

var koalas = create(hasValue);

/**
 * Coalesce function to find the first valid value.
 * A strictly valid value is one that is not undefined and not NaN (not a number).
 *
 * ```js
 * console.log(koalas.strict(undefined, NaN, 'a', 'b'));
 * //=> 'a'
 *
 * console.log(koalas.strict(undefined, NaN, {a: 'b'}, 'b'));
 * //=> {a: 'b'}
 *
 * console.log(koalas.strict(undefined, NaN, ['a', 'b', 'c'], {a: 'b'}, 'b'));
 * //=> ['a', 'b', 'c']
 *
 * console.log(koalas.strict(undefined, null, NaN, ['a', 'b', 'c'], {a: 'b'}, 'b'));
 * //=> null
 *
 * console.log(koalas.strict(undefined, NaN, null, ['a', 'b', 'c'], {a: 'b'}, 'b'));
 * //=> null
 * ```
 * @name strict
 * @param {Mixed} `arguments` Pass in any amount of arguments.
 * @return {Mixed} First valid value.
 * @api public
 */

koalas.strict = create(hasStrictValue);

/**
 * Create a function using the passed in `valid` function
 * to determine if an argument is valid.
 *
 * @param  {Function} `valid` Method to determine if a value is valid.
 * @return {Function} koalas function
 */

function create(valid) {
  return function() {
    var len = arguments.length;
    var arg;
    for (var i = 0; i < len; i++) {
      arg = arguments[i];
      if (valid(arg)) {
        return arg;
      }
    }
    return arg;
  }
}

/**
 * Check to see if a value actually has a valid value:
 *  - not undefined
 *  - not null
 *  - not NaN (not a number)
 *
 * @param  {*} `val` value to check
 * @return {Boolean} returns `true` if the `val` has a valid value
 */

function hasValue(val) {
  // eslint-disable-next-line no-self-compare
  return val != null && val === val;
}

/**
 * Check to see if a value actually has a strictly valid value:
 *  - not undefined
 *  - not NaN (not a number)
 *
 * @param  {*} `val` value to check
 * @return {Boolean} returns `true` if the `val` has a valid value
 */

function hasStrictValue(val) {
  // eslint-disable-next-line no-self-compare
  return typeof val !== 'undefined' && val === val;
}

/**
 * Expose koalas
 */

module.exports = koalas;
