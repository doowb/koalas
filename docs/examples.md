### Simple Example

Given a list of values, find the first one that isn't null or undefined.

```js
var value = koalas.coalesce('foo', 'bar', 'baz', null, undefined);
```

### Find Valid Path Example

This example returns the first path that exists.

```js
var path = require('path');
var resolve = path.resolve;
var fs = require('fs');
var dir = path.join.bind(__dirname);

var value = koalas(
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
```
