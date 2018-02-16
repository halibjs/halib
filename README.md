# Halib

Halib is a lightweight (less than 25 kb, minified) but powerful (contains about 250 utility functions),
easy to learn, easy to use library
that was from the ground up developed using ES6 JS, to be used in ES6 module. The library itself
is one ES6 module, it provides named exports exporting function expressions (fat arrow functions).


## Installation and use

To install with node (npm):
```bash
$ npm install halib
```

To use in node module (your_module.mjs):
```javascript
// your_module.mjs
import { fnName } from 'halib'
// or
import * as h from 'halib'
```

To use in web:
```html
<script type="module" src="./your_module.js"></script>
```
```javascript
// your_module.js
import { fnName } from './halib.js'
//or
import { fnName } from './halib.min.js'
// or
import * as h from './halib.js'
// or
import * as h from './halib.min.js'
```

```javascript
// copy from node_modules/halib/dist/ the necessary files to the folder of your_module.js 
```
or
```html
<script src="//cdn.jsdelivr.net/npm/halib@1.0.0/dist/halib.min.js"></script>
<!--or-->
<script src="//cdn.unpkg.net/npm/halib@1.0.0/dist/halib.min.js"></script>
```


## Run examples

### Node

After installation:
```
$ node --experimental-modules node_modules/halib/examples/example.mjs
```
Or after cloning this repositary:
```
$ npm install
```
```
$ node --experimental-modules examples/example.mjs
```

### Browser

See the examples in action here

## Run tests (after cloning this repositary):
Note: At the time of writing this (2018.02.16.) there is no jasmine test framework for es6 modules.
Because of this translated versions (node: cjs, browser: script) of this library are tested.
### Node
```
$ npm install
```
```
$ npm test
```

### Browser
Just open jasmine-standalone-3.0.0/SpecRunner.html in you favorite browser.


## Tree-shaking

Because the library is one es6 module, if you want to use only a few functions
from the library (instead of the whole library) you can apply tree-shaking like rollup or webpack.
