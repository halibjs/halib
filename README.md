# Halib

Halib is a lightweight (less than 25 kb, minified) but powerful (contains about 250 utility functions),
easy to learn, easy to use library
that was from the ground up developed using ES6 JS, to be used in ES6 module. The library itself
is one ES6 module, it provides named exports exporting function expressions (fat arrow functions).


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
import { fnName } from './halib.min.js'
import * as h from './halib.min.js'
```
```javascript
// copy from node_modules/halib/dist/ the necessary files to the folder of my_module.js 
```
or
```html
<script src="//cdn.jsdelivr.net/npm/halib@latest/dist/halib.min.js"></script>
<script src="//unpkg.com/halib"></script>
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

