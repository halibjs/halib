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

To use in node module (.mjs):
```javascript
import { fnName } from 'halib'
// or
import * as h from 'halib'
```

To use in web (all files in same folder) :
```html
<script type="module" src="./your_module.js"></script>
```
```javascript
import { fnName } from './halib.js'
// or
import * as h from './halib.js'
```

