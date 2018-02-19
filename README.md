# Halib

Halib is a lightweight (less than 25 kb, minified) but powerful (contains about 250 utility functions),
easy to learn, easy to use library
that was from the ground up developed using ES6 JS, to be used in ES6 module. The library itself
is __one ES6 module__, it provides __named exports__ exporting function expressions (fat arrow functions).

> node: v10.0.0 or later is needed to run all files below.

> web: Es6 modules may not run in some older browsers.


## Installation and use

To install with node:
```bash
$ npm install halib
```

To use in node:
```javascript
// my_module.mjs
import { fnName } from 'halib'
import * as h from 'halib'
```
```bash
$ node my_module
```

To use in web:
```html
<script type="module" src="./my_module.js"></script>
```

```javascript
// my_module.js
import { fnName } from './node_modules/halib/dist/halib.min.js'
import * as h from './node_modules/halib/dist/halib.min.js'
```
or without installing with node:
```javascript
// my_module.js
import { fnName } from '//cdn.jsdelivr.net/npm/halib/dist/halib.min.js'
import { fnName } from '//unpkg.com/halib'
```


## Run examples

### Node

After installation:
```bash
$ node node_modules/halib/examples/example
```
Or clone this repository and:
```bash
$ npm install
```
```bash
$ node examples/example
```

### Browser

See the examples in action [here](http://mts.nhely.hu/examples).

## Run tests
Note: At the time of writing this (02.16.2018) there is no jasmine test framework for es6 modules.
Because of this translated versions (node: cjs, browser: script) of the library are tested.


Clone this repository and:
### Node
```bash
$ npm install
```
```bash
$ npm test
```

### Browser
Just open jasmine-standalone-3.0.0/SpecRunner.html in you favorite browser.

