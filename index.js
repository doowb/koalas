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
 * @param {Mixed} `arguments` Pass in any amount of arguments.
 * @return {Mixed} First valid value.
 * @api public
 */

function koalas() {
  var len = arguments.length;
  for (var i = 0; i < len; i++) {
    var arg = arguments[i];
    if (hasValue(arg)) {
      return arg;
    }
  }
  return null;
}

/**
 * Check to see if a value actual has a valid value:
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
 * Expose koalas
 */

module.exports = koalas;
