# koalas [![NPM version](https://img.shields.io/npm/v/koalas.svg?style=flat)](https://www.npmjs.com/package/koalas) [![NPM monthly downloads](https://img.shields.io/npm/dm/koalas.svg?style=flat)](https://npmjs.org/package/koalas)  [![NPM total downloads](https://img.shields.io/npm/dt/koalas.svg?style=flat)](https://npmjs.org/package/koalas) [![Linux Build Status](https://img.shields.io/travis/doowb/koalas.svg?style=flat&label=Travis)](https://travis-ci.org/doowb/koalas) [![Windows Build Status](https://img.shields.io/appveyor/ci/doowb/koalas.svg?style=flat&label=AppVeyor)](https://ci.appveyor.com/project/doowb/koalas)

> Coalesce for JavaScript. Returns the first value that is not undefined or null.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save koalas
```

## Usage

```js
var koalas = require('koalas');
```

## API

### [koalas](index.js#L27)

Coalesce function to find the first valid value. A valid value is one that is not undefined, not null and not NaN (not a number). If no values are valid, then the last argument is returned.

**Params**

* `arguments` **{Mixed}**: Pass in any amount of arguments.
* `returns` **{Mixed}**: First valid value.

**Example**

```js
console.log(koalas(undefined, null, NaN, 'a', 'b'));
//=> 'a'

console.log(koalas(undefined, null, NaN, {a: 'b'}, 'b'));
//=> {a: 'b'}

console.log(koalas(undefined, null, NaN, ['a', 'b', 'c'], {a: 'b'}, 'b'));
//=> ['a', 'b', 'c']

console.log(koalas(undefined, NaN, null));
//=> null
```

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 35 | [doowb](https://github.com/doowb) |
| 1 | [jonschlinkert](https://github.com/jonschlinkert) |

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](https://twitter.com/doowb)

### License

Copyright © 2017, [Brian Woodward](https://github.com/doowb).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.3, on April 18, 2017._