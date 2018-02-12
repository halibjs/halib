//   Halib.js 1.0.0
//   http://github.com/halibjs/halib
//   (c) 2018 Mátyás Kiss
//   Halib may be freely distributed under the MIT licence


const isString = x => typeof x === 'string';
const isNumber = x => typeof x === 'number';
const isArr = xs => xs && xs.constructor === Array;
const copyAS = xs => _copyA(xs, 0, _len(xs), isString(xs));
const emptyAS = xs => isString(xs) ? '' : [];
const _chars = str => str.split('');
const _unchars = arr => arr.join('');
const _len = xs => xs.length;
const _nul = xs => _len(xs) === 0;
const bothStr = (x, y) => isString(x) && isString(y);
const arrOrStr = (x, y) => (isArr(x) && isArr(y)) || bothStr(x, y);
const cat = (xs, ys) => xs.concat(ys);
const _eq = fn => (x, y) => _equal(fn(x), fn(y));
const _cmp = (x, y) => x < y ? -1 : (x > y ? 1 : 0);
const _desc = (x, y) => x < y ? 1 : (x > y ? -1 : 0);
const gt = (x, y) => x > y;
const _gt = fn => (x, y) => fn(x) > fn(y);
const lt = (x, y) => x < y;
const _lt = fn => (x, y) => fn(x) < fn(y);
const gt_cmp = cmp => (x, y) => cmp (x, y) > 0;
const lt_cmp = cmp => (x, y) => cmp (x, y) < 0;
const gte = (x, y) => x >= y;
const fn_eq = (fn, x, _, e) => fn(x, e);
const _returnL = x => [x];
const fn_each = (fn, x, ind) => fn(x, ind);
const NUL = {};
const opsString = (a, b) => isString(a) && (b === null || isString(b));
const _id = x => x;
const secFn = (xs, ind, i) => _slice(xs, ind, i, isString(xs));
const secHFn = (xs, ind) => xs[ind];
const toString = Object.prototype.toString;
const isChar = c => isString(c) && !!_len(c);

const _copyA = (xs, ind, xlen, str) => {
    const res = Array(xlen);
    while (ind < xlen) { res[ind] = xs[ind]; ind++; }
    return str ? _unchars(res) : res;
};

const _slice = (xs, start, end, str) => {
    let xlen = _len(xs);
    start = trans(start, xlen);
    end = end < 0 ? end + xlen : end > xlen ? xlen : end;
    xlen = start > end ? 0 : end - start;
    const res = Array(xlen);
    let ind = 0;
    while (ind < xlen) { res[ind] = xs[ind + start]; ind++; };
    return str ? _unchars(res) : res;
};

const _copy = (res, xs, ind, len, idx) => {
    idx = isNumber(idx) ? idx : _len(res);
    while (ind < len) res[idx++] = xs[ind++];
    return idx;
};

const _each = (fn, xs) => {
    const len  = _len(xs);
    let ind = 0;
    
    while (ind < len) {
        fn(xs[ind], ind);
        ind++;
    }
    return xs;
};

const _map = (fn, xs) => {
    const len = _len(xs);
    const res = Array(len);
    let ind = 0;

    while (ind < len) {
        res[ind] = fn(xs[ind], ind);
        ind++;
    }
    return res;
};

const _concat = (xs, fn, rlen) => {
    const xlen = _len(xs);
    const res = Array(rlen);
    let ind = 0;
    let idx = 0;
    let str = xlen;
    let item;

    while (ind < xlen) {
        item = fn(xs[ind], ind);
        if (str) str = isString (item);
        idx = _copy(res, item, 0, _len(item), idx);
        ind++;
    }
    return str ? _unchars(res) : res;
};

const eqArr = (xs, ys, stx, sty) => {
    const xlen = _len(xs);
    let ind;
        
    if (xlen !== _len(ys)) return false;

    for (ind = 0; ind < xlen; ind++) {
        if (!_equal(xs[ind], ys[ind], stx, sty)) return false;
    }
    stx.pop(); sty.pop();
    return true;
};

const eqObj = (x, y, stx, sty) => {
    const xkeys = keys(x);
    const ykeys = keys(y);
    const xlen = _len(xkeys);
    let ind, key;

    if (xlen !== _len(ykeys) || _len(deleteAll(xkeys)(ykeys))) return false;
    for (ind = 0; ind < xlen; ind++) {
        key = xkeys[ind];
        if (!_equal(x[key], y[key], stx, sty)) return false;
    }
    stx.pop(); sty.pop();
    return true;
};

const prim = x => x == null || typeof x !== 'object';
const _equal = (x, y, stx, sty) => x === y || (prim(x) || prim(y) ? x !== x && y !== y : deepEqual(x, y, stx, sty));

const deepEqual = (x, y, stx, sty) => {
    const type = toString.call(x);
    if (type !== toString.call(y)) return false;
    if (type === '[object Date]') return x.valueOf() === y.valueOf();
    stx = stx || []; sty = sty || [];
    let ind = _len(stx);
    while (ind--) if(stx[ind] === x) return sty[ind] === y;
    stx.push(x); sty.push(y);
    return (type === '[object Array]' ? eqArr : eqObj)(x, y, stx, sty);
};

const eqSlice = (xs, ys, xlen, offset) => {
    let ind = 0;
    while (ind < xlen && _equal(xs[ind], ys[ind + offset])) ind++;
    return ind === xlen;
};

const prefix = (xs, ys, xlen, ind) => xlen === 0 || xlen > _len(ys) ? false : eqSlice (xs, ys, xlen, ind);

const _seq = (xs, ys) => {
    const xlen = _len(xs);
    if (!xlen) return -1;
    const max = _len(ys) - xlen + 1;
    let ind = 0;

    while (ind < max) {
        if(eqSlice(xs, ys, xlen, ind)) return ind;
        ind++;
    }
    return -1;
};

const _indices = (res, _, __, index) => (res[_len(res)] = index, res);

const _delall = (res, ys, ind, index, toIns) => {
    _copy(res, ys, ind, index);
    if (toIns) _copy(res, toIns, 0, _len(toIns));
    return res;
};

const _seqAll = (toDel, xs, res, fn, toIns) => {
    const dlen = _len(toDel);
    const xlen = _len(xs);
    const max = _len(xs) - dlen + 1;
    const del = toIns !== NUL;
    let index = 0;
    let ind = 0;

    if (dlen) {
        while (index < max) {
            if (eqSlice(toDel, xs, dlen, index)) {
                res = fn(res, xs, ind, index, toIns);
                ind = index = index + dlen;
            }
            else index++;
        }
    }
    if (del) fn (res, xs, ind, xlen);
    return del && isString(xs) ? _unchars(res) : res;
};

const _copyB = (res, xs, _, __, idx) => (res[idx++] = xs, idx);
const trans = (ind, xlen) => ind < 0 ? ind < -xlen ? 0 : ind + xlen : ind;

const _sec = (ind, dlen, xs, seq, toIns, fn = gte) => {
    const xlen = _len(xs);
    ind = trans(ind, xlen);
    if (fn(ind, _len(xs))) return copyAS(xs);
    if (dlen < 0) dlen = 0;
    const del = toIns === NUL;
    const from = ind + dlen;
    const ilen = del ? 0 : (seq ? _len(toIns) : 1);
    const res = Array(ind + ilen + (xlen - from));
    const fnn = seq ? _copy : _copyB;
    let idx  = 0;

    idx = _copy(res, xs, 0, ind, idx);
    idx = del ? idx : fnn(res, toIns, 0, ilen, idx);
    _copy(res, xs, from, xlen, idx);
    
    return isString(xs) ? _unchars(res) : res;
};

const secc = (ind, dlen, xs, seq, toIns) => ind === -1 ? copyAS(xs) : _sec(ind, dlen, xs, seq, toIns); 

const _delAll = (e, xs, toIns) => {
    if (bothStr(e, xs)) return _seqAll (e, xs, [], _delall, (toIns === NUL ? undefined : toIns));
    const res = [];
    const xlen = _len(xs);
    let ind = 0;
    let idx = 0;

    while (ind < xlen) {
        if (_equal(e, xs[ind])) { if (toIns !== NUL) res[idx++] = toIns; }
        else res[idx++] = xs[ind];
        ind++;
    }
    return isString(xs) ? _unchars(res) : res;
};

const _from = (num, n, step, str, ind) => {
    const res = Array(n);

    while (ind < n) {
        res[ind++] = num;
        num += step;
    }
    return str ? String.fromCharCode.apply(null, res) : res;
};

const insSort = (xs, low, high, fn) => {
    let tmp, ind;
    let index = low + 1;

    for (; index <= high; index++) {
        tmp = xs[index];
        for (ind = index - 1; ind >= low && fn(xs[ind], tmp); ind--) xs[ind + 1] = xs[ind];
        xs[ind + 1] = tmp;
    }
    return xs;
};

const _merge = (xs, ys, fn) => {
    const xlen = _len(xs);
    const ylen = _len(ys);
    const res = Array(xlen + ylen);
    let idx = 0;
    let indx = 0;
    let indy = 0;

    while (indx < xlen && indy < ylen){
        res[idx++] = fn(xs[indx], ys[indy]) ? ys[indy++] : xs[indx++];
    }
    
    while (indx < xlen) res[idx++] = xs[indx++];
    while (indy < ylen) res[idx++] = ys[indy++];

    return res;
};

const msort = (xs, fn) => {
    const str = isString(xs);
    const len = _len(xs);

    const ms = xs => {
        const len = _len(xs);
        if (len < 30) return insSort(xs, 0, len - 1, fn);
        const mid = len >>> 1;
        return _merge (ms(_copyA(xs, 0, mid)), ms(_slice(xs, mid, len)), fn);
    };

    const res = ms(len < 30 ? (str ? _chars(xs) : _copyA(xs, 0, len)) : xs);
    return str ? _unchars(res) : res;
};

const swap = (arr, i, j) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
};

const med3 = (arr, low, high, fn) => {
    const mid = (low + high) >>> 1;
    const larger = fn(arr[low], arr[mid]) ? low : mid;
    if (fn(arr[larger], arr[high])) swap(arr, larger, high);
    if (fn(arr[low], arr[mid])) swap(arr, low, mid);
    return arr[mid];
};

const partitionHoare = (arr, low, high, fn) => {
    const p = med3(arr, low, high, fn);

    while (true) {
        while (fn(p, arr[++low]));
        while (fn(arr[--high], p));
        if (low < high) swap(arr, low, high);
        else return high;
    }
};

const qsort = (xs, fn) => {
    const arr = _copyA(xs, 0, _len(xs));
    const stack = [];
    let top = 0;
    let high = _len(xs) - 1;
    let low = 0;
    let p;

    stack[top++] = low;
    stack[top++] = high;

    while (top > 0) {
        high = stack[--top];
        low = stack[--top];

        while (high > low) {
            if (high - low < 30) {
                insSort(arr, low, high, fn);
                high = low;
            }
            else {
                p = partitionHoare(arr, low, high, fn);
                stack[top++] = p+1;
                stack[top++] = high;
                high = p;
            }
        }
    }
    return isString(xs) ? _unchars(arr) : arr;
};

const _insert = (e, xs, fn) => {
    const xlen = _len(xs);
    const res = Array(xlen + 1);
    let idx = 0;
    let ind = 0;

    while (ind < xlen && idx === ind) {
        res[idx++] = fn(e, xs[ind]) ? xs[ind++] : e;
    }

    if (idx === ind) { res[idx] = e; return res; }
    while (ind < xlen) res[idx++] = xs[ind++];
    return res;
};

const _elemBy = (e, xs, eq) => {
    const xlen = _len(xs);
    let ind = 0;

    while (ind < xlen) {
        if (eq(e, xs[ind])) return true;
        ind++;
    }
    return false;
};

const indexgcBy = (e, xs, eq) => {
    const xlen = _len(xs);
    let ind = 0;

    while (ind < xlen) {
        if (eq(e, xs[ind][0])) return ind;
        ind++;
    }
    return -1;
};

const _nubbBy = (xs, res, eq) => {
    const xlen = _len(xs);
    let ind = 0;

    while (ind < xlen) {
        if (!_elemBy(xs[ind], res, eq)) res.push(xs[ind]);
        ind++;
    }
    return res;
};

const _uniqBy = (xs, eq) => {
    const xlen = _len(xs);
    const res = [];
    let ind = 0;

    while (ind < xlen) {
        if (!_elemBy(xs[ind], res, eq)) res.push(xs[ind]);
        else return false;
        ind++;
    }
    return true;
};

const groupAdd = (res, _, x) => res[_len(res)] = [x];
const groupInc = (res, idx, x) => res[idx][_len(res[idx])] = x;
const countAdd = (res, _, x) => res[_len(res)] = [x, 1];
const countInc = (res, idx, _) => res[idx][1]++;

const gcBy = (xs, fnAdd, fnInc, eq, gr) => {
    const xlen = _len(xs);
    const res = [];
    let ind = 0;
    let idx, x;

    while (ind < xlen) {
        x = xs[ind];
        idx = indexgcBy(x, res, eq);
        if (idx !== -1) fnInc(res, idx, x);
        else fnAdd(res, 0, x);
        ind++;
    }
    return gr && isString(xs) ? map (_unchars) (res) : res;
};

const readBy = (e, xs, eq) => {
    const xlen = _len(xs);
    let ind = 0;

    while (ind < xlen) {
        if (eq(e, xs[ind][0])) {
            if (xs[ind][1] > 0) {
                xs[ind][1]--;
                return false;
            }
            return true;
        }
        ind++;
    }
    return true;
};

const _minusBy = (xs, ys, eq) => {
    const xlen = _len(xs);
    const res = [];
    let ind = 0;
    ys = gcBy(ys, countAdd, countInc, eq);
    
    while (ind < xlen) {
        if (readBy(xs[ind], ys, eq)) res.push(xs[ind]);
        ind++;
    }
    return isString(xs) ? _unchars(res) : res;
};

const dallBy = (e, xs, eq, res) => !_elemBy(e, xs, eq) ? res.push(e) : 0;
const kallBy = (e, xs, eq, res) =>  _elemBy(e, xs, eq) ? res.push(e) : 0;
const diffBy = (e, xs, eq, res) => !_elemBy(e, xs, eq) && !_elemBy(e, res, eq) ? res.push(e) : 0;
const intsBy = (e, xs, eq, res) =>  _elemBy(e, xs, eq) && !_elemBy(e, res, eq) ? res.push(e) : 0;

const _dkdi = (xs, ys, fn, eq) => {
    const xlen = _len(xs);
    const res = [];
    let ind = 0;

    while (ind < xlen) {
        fn(xs[ind], ys, eq, res);
        ind++;
    }
    return isString(xs) ? _unchars(res) : res;
};

const _unionBy = (xs, ys, eq, res = _nubbBy(ys, _nubbBy(xs, [], eq), eq)) => isString(xs) ? _unchars(res) : res;
const _nubBy = (xs, eq, res = _nubbBy(xs, [], eq)) => isString(xs) ? _unchars(res) : res;

const _nubSorted = (xs, res, add) => {
    const xlen = _len(xs);
    if (!xlen) return res;
    let ind = 0;
    let first;

    first = add(res, xs[ind++]);
    while (ind < xlen) {
        first = first === xs[ind] ? first : add(res, xs[ind]);
        ind++;
    }
    return res;
};

const rest = (ind, xlen, fn, xs, res, z) => { for (;ind < xlen; ind++) z = fn(res, xs[ind], z); return z;};

const setOrd = (xs, ys, cmp, fn1, fn2, fn3, fn4, res, go, u) => {
    const xlen = _len(xs);
    const ylen = _len(ys);
    let indx = 0;
    let indy = 0;
    let z = NUL;
    let x, y, cres;

    while (indx < xlen && indy < ylen) {
        x = xs[indx]; y = ys[indy];
        cres = cmp(x, y);
        if (cres === 0)    { indx++;  z = fn1(res, x, z); indy = fn4(indy);  }
        else if (cres < 0) { indx++;  z = fn2(res, x, z); }
        else               { indy++;  z = fn3(res, y, z); }
    }
    
    if (go) z = rest (indx, xlen, fn2, xs, res, z);
    if (u) rest (indy, ylen, fn3, ys, res, z);
};

const no = () => {};
const noz = (_, __, z) => z;
const ad = (res, x) => res[_len(res)] = x;
const adz = (res, x, z) => x !== z ? ad(res, x) : x;
const _inc = x => x + 1;

const mdk = (xs, ys, fn, go) => {
    const res = [];
    setOrd(xs, ys, _cmp, go?no:ad, go?ad:no, no, fn, res, go, false);
    return isString(xs) ? _unchars(res) : res;
};

const isd = (xs, ys, fn, go) => {
    const res = [];
    setOrd(xs, ys, _cmp, go?noz:adz, go?adz:noz, noz, fn, res, go, false);
    return isString(xs) ? _unchars(res) : res;
};

const _union = (xs, ys) => {
    const res = [];
    setOrd(xs, ys, _cmp, adz, adz, adz, _inc, res, true, true);
    return isString(xs) ? _unchars(res) : res;
};

const _inits = (xs, ind, len, mod, fn) => {
    const res = Array(len + 1);
    const last = mod > 0 ? 0 : 1;
    const xlen = len + last;
    let ys = copyAS (xs);

    while (ind >= last && ind < xlen) {
        res[ind] = ys;
        ys = fn (ys);
        ind += mod;
    }
    
    res[ind] = ys;
    return res;
};

const _index = (xs, e) => {
    const len = _len(xs);
    let ind = 0;

    while (ind < len) {
        if (_equal(xs[ind], e)) return ind;
        ind++;
    }
    return -1;
};

const _indexLast = (eq, xs, e) => {
    let ind = _len(xs);

    while (ind--) {
        if (eq(xs[ind], e)) return ind;
    }
    return -1;
};

const _find = (pred, xs, idx) => {
    const len = _len(xs);
    let ind = 0;

    while (ind < len) {
        if (pred(xs[ind], ind)) return idx ? ind : xs[ind];
        ind++;
    }
    return idx ? -1 : idx;
};

const _findLast = (pred, xs, idx) => {
    let ind = _len(xs);

    while (ind--) {
        if (pred(xs[ind], ind)) return idx ? ind : xs[ind];
    }
    return idx ? -1 : idx;
};

const _elemIndices = (mfn, eq_pred, res,xs, e) => {
    const xlen = _len(xs);
    let ind = 0;

    while (ind < xlen) {
        if(mfn(eq_pred, xs[ind], ind, e)) res.push(ind);
        ind++;
    }
    return res;
};

const _section = (xs, eq, fn, sH) => {
    const len = _len(xs);
    const res = [];
    let idx = 0;
    let ind = 0;
    let i;

    while (ind < len) {
        i = ind + 1;
        while (i < len && eq(xs[ind], xs[i])) i++;
        res[idx++] = fn(xs, ind, i);
        ind = i;
    }
    return sH && isString(xs) ? _unchars(res) : res;
};

const fn_one = _ => 1;
const fn_count = (arr, _) => arr[1]++;
const fn_push_K = (arr, x) => arr[1].push(x);
const fn_push = (arr, x) => arr.push(x);

const _group = (xs, byKey, fn_start, fn_add, fn) => {
    const nums = {};
    const strs = Object.create(null);
    const res = [];
    const xlen = _len(xs);
    let ind = 0;
    let item, key, obj, index;

    while (ind < xlen) {
        item = xs[ind];
        key = fn(item);
        obj = isString(key) ? strs : nums;
        index = obj[key];
        if (index === undefined) res[obj[key] = _len(res)] = byKey ? [key, fn_start(item)] : fn_start(item);
        else fn_add(res[index], item);
        ind++;
    }
    return res;
};

const grOAdd = (xs, item) => (xs.push(item), xs);

const _groupObj = (xs, fn_start, fn_add, fn, gr) => {
    const res = {};
    const xlen = _len(xs);
    let ind = 0;
    let item, key;

    while (ind < xlen) {
        item = xs[ind];
        key = fn(item);
        res[key] = res[key] ? fn_add(res[key], item) : fn_start(item);
        ind++;
    }
    return gr && isString(xs) ? _mapObj(_unchars, res) : res;
};

const newSet = (map, key) => { map[key] = true; };
const nubSet = (map, key, res, x) => { if (!map[key]) { map[key] = true; res.push(x);} };
const _dall  = (map, key, res, x) => { if (!map[key]) res.push(x); };
const _keep  = (map, key, res, x) => { if (map[key]) res.push(x); };
const writeMap = (map, key) => { if (map[key]) map[key]++; else map[key] = 1; };
const readMap = (map, key, res, x) => { if(map[key]) map[key]--; else res.push(x); };
const intSet = (map, key, res, x) => { if (map[key]) { map[key] = false; res.push(x);} };

const _setops = (sfn, xs, nums, strs, res, fn) => {
    const xlen = xs ? _len(xs) : 0;
    let ind = 0;
    let key;

    while (ind < xlen) {
        key = fn(xs[ind]);
        sfn(isString(key) ? strs : nums, key, res, xs[ind]);
        ind++;
    }
};

const ops = (fn1, fn2, xs, ys, fn) => {
    const nums = {};
    const strs = Object.create(null);
    const res = [];

    _setops (fn1, ys, nums, strs, res, fn);
    _setops (fn2, xs, nums, strs, res, fn);

    return (fn1 === fn2 ? opsString(ys, xs) : isString(xs)) ? _unchars(res) : res;
};

const pair = (x, y) => [x, y];

const _prod = (fn, pair, xs, ys) => {
    const xlen = _len(xs);
    const ylen = _len(ys);
    const res = Array(xlen * ylen);
    const fnn = pair && bothStr(xs, ys) ? (x, y, a, b) => _unchars(fn(x, y, a, b)) : fn;
    let idx = 0;
    let indx = 0;
    let indy;

    while (indx < xlen) {
        indy = 0;
        while (indy < ylen) {
            res[idx++] = fnn(xs[indx], ys[indy], indx, indy);
            indy++;
        }
        indx++;
    }
    return res;
};

const comb2 = (res, len, xs, str, mod) => {
    const fn = str ? _unchars : _id;
    let idx = 0;
    let indx = 0;
    let indy;

    while (indx < len) {
        indy = indx + mod;
        while (indy < len) {
            res[idx++] = fn([xs[indx], xs[indy]]);
            indy++;
        }
        indx++;
    }
    return res;
};

const _zip = (fn, pair, xs, ys) => {
    const len = Math.min (_len(xs), _len(ys));
    const res = Array (len);
    const fnn = pair && bothStr(xs, ys) ? (x, y, a) => _unchars(fn(x, y, a)) : fn;
    let ind = 0;
    
    while (ind < len) {
        res[ind] = fnn(xs[ind], ys[ind], ind);
        ind++;
    }
    return res;
};

const _unzip = (xss, fn, mmlen) => {
    const xlen = _len(xss);
    const mlen = xlen > 0 ? mmlen(xss) : 0;
    const fnn = _all(isString, xss) ? (a, b, c, d, e) => _unchars(fn(a, b, c, d, e)) : fn;
    const res = Array(mlen);
    let ind;
    
    for (ind = 0; ind < mlen; ind++) {
        res[ind] = fnn (xss, ind, xlen, 0, mlen);
    }
    return res;
};

const _zip3 = (xss, ind) => [xss[0][ind], xss[1][ind], xss[2][ind]];

const _zipM = (xss, ind, xlen, indx) => {
    const res = Array (xlen);
    for (; indx < xlen; indx++) res[indx] = xss[indx][ind];
    return res;
};

const _rotRight = (xss, ind, xlen, indx) => {
    const res = Array (xlen);
    const xlast = xlen - 1;
    for (; indx < xlen; indx++) res[indx] = xss[xlast - indx][ind];
    return res;
};

const _rotLeft = (xss, ind, xlen, indx, mlen) => {
    const res = Array (xlen);
    const mlast = mlen - 1;
    for (; indx < xlen; indx++) res[indx] = xss[indx][mlast - ind];
    return res;
};

const _zipLongest = (xss, ind, xlen, indx) => {
    const res = [];
    for (; indx < xlen; indx++) {
        if (_len(xss[indx]) > ind)
            res.push(xss[indx][ind]);
    }
    return res;
};

const _isUniq = (xs, fn) => {
    const xlen = _len(xs);
    const nums = {};
    const strs = Object.create(null);
    let ind = 0;
    let key, map;

    while (ind < xlen) {
        key = fn(xs[ind]);
        map = isString(key) ? strs : nums;
        if (map[key]) return false;
        else map[key] = true;
        ind++;
    }
    return true;
};

const _while = (fn, pred, xs) => {
    const len = _len(xs);
    let ind = 0;

    while (ind < len && pred(xs[ind], ind)) ind++;
    return fn (ind) (xs);
};

const _whileLast = (fn, pred, xs) => {
    let ind = _len(xs);
    while (ind-- && pred(xs[ind], ind));
    return fn (ind + 1) (xs);
};

const _foldl = (fn, res, xs) => {
    const xlen = _len(xs);
    let ind = -1;
    if (res === NUL) res = xs[++ind];
    while (++ind < xlen) res = fn(res, xs[ind], ind);
    return res;
};

const _foldr = (fn, res, xs) => {
    let ind = _len(xs);
    if (res === NUL) res = xs[--ind];
    while (ind-- > 0) res = fn(xs[ind], res, ind);
    return res;
};

const _scanl = (fn, z, xs) => {
    const mod = z === NUL ? 0 : 1;
    const res = Array(_len(xs) + mod);
    if (_len(res)) res[0] = mod ? z : xs[0];
    _foldl ((z, x, ind) => res[ind + mod] = fn(z, x, ind), z, xs);
    return res;
};

const _scanr = (fn, z, xs) => {
    const mod = z === NUL ? 0 : 1;
    const res = Array(_len(xs) + mod);
    if (_len(res)) res[_len(res) - 1] = mod ? z : xs[_len(xs) - 1];
    _foldr ((x, z, ind) => res[ind] = fn(x, z, ind), z, xs);
    return res;
};

const _iterNum = (n, fn, x) => {
    let ind = -1;
    while (++ind < n) x = fn(x, ind);
    return x;
};

const _iterWhile = (pred, fn, x) => {
    let res;
    while (pred (x)) { res = x; x = fn(x); }
    return res;
};

const _until = (pred, fn, x) => {
    while (!pred(x)) x = fn(x);
    return x;
};

const _iterateNum = (n, fn, x) => {
    const res = Array(n + 1);
    _iterNum (n, (x, ind) => res[ind + 1] = fn(x, ind), res[0] = x);
    return res;
};

const _iterateWhile = (pred, fn, x) => {
    const res = [];
    _iterWhile (pred, x => (res.push(x), fn(x)), x);
    return res;
};

const _untilA = (pred, fn, x) => {
    const res = [x];
    _until (pred, x => res[_len(res)] = fn(x), x);
    return res;
};

const _iter = (n_pred, fn, x) => (isNumber (n_pred) ? _iterNum : _iterWhile) (n_pred, fn, x);
const _iterate = (n_pred, fn, x) => (isNumber (n_pred) ? _iterateNum : _iterateWhile) (n_pred, fn, x);

const _cp = (fns, res) => {
    let ind = _len(fns);
    while (ind--) res = fns[ind](res);
    return res;
};

const _chain = (fns, res) => {
    const flen = _len(fns);
    let ind = 0;
    while (ind < flen) res = fns[ind++](res);
    return res;
};

const copyComb = (pos, xs, str) => {
    const ilen = _len(pos);
    const last = ilen - 1;
    const res = Array(ilen);
    let ind = 0;

    while (ind < ilen) { res[last - ind] = xs[pos[ind]]; ind++; }
    return str ? _unchars(res) : res;
};

const copyPerm = (pos, xs, to, str) => {
    const res = Array(to);
    let ind = 0;

    while (ind < to) { res[ind] = xs[pos[ind]]; ind++; }
    return str ? _unchars(res) : res;
};

const copyProd = (xss, pos, xlen, str) => {
    const res = Array(xlen);
    let ind = 0;
    for (; ind < xlen; ind++) {
        res[ind] = xss[ind][pos[ind]];
    }
    return str ? _unchars(res) : res;
};

const rotPerm = (xs, ind) => {
    const last = _len(xs) - 1;
    const tmp = xs[ind];
    while (ind < last) { xs[ind] = xs[ind+1]; ind++; }
    xs[last] = tmp;
};

const _countE = (e, eq, xs) => {
    const xlen = _len(xs);
    let res = 0;
    let ind = 0;

    while (ind < xlen) {
        res = res + (eq(e, xs[ind]) ? 1 : 0);
        ind++;
    }
    return res;
};

const _append = (xs, ys) => arrOrStr(xs, ys) ? cat(xs, ys) : isString(xs) ? cat(_chars(xs), ys) : cat(xs, _chars(ys));
const _cons = (x, xs) => cat (isString(xs) ? String(x) : [x], xs);
const _consR = (xs, x) => cat (xs, isString(xs) ? x : [x]);

const _rotate = (n, xs) => {
    if (_nul(xs)) return copyAS(xs);
    const xlen = _len(xs);
    const res = Array(xlen);
    let idx = 0;

    n = n % xlen;
    n = n < 0 ? xlen + n : n;
    idx = _copy(res, xs, xlen - n, xlen, idx);
    _copy(res, xs, 0, xlen - n, idx);

    return isString(xs) ? _unchars(res) : res;
};

const _intersperse = (sep, xs) => {
    const xlen = _len(xs);
    if (xlen < 2) return copyAS(xs);
    const len = xlen - 1;
    const res = Array(xlen + len);
    let idx = 0;
    let ind;

    for (ind = 0; ind < len; ind++) {
        res[idx++] = xs[ind];
        res[idx++] = sep;
    }
    res[idx] = xs[ind];
    return isString(xs) ? _unchars(res) : res;
};

const binCoeff = (k, n) => _iterNum (k > n - k ? n - k : k, (x, i) => x * (n - i) / (i + 1), 1);
const _fact = n => {
    let res = 1;
    while(n > 1) res = res * n--;
    return res;
};

const _combinations = (k, xs) => {
    const xlen = _len(xs);
    const str = isString(xs);
    if (k > xlen || k <= 0) return [str ? '' : []];
    const res = Array(binCoeff(k, xlen));
    if (k === 2) return comb2(res, xlen, xs, str, 1);
    const last = xlen - 1;
    const pos = range(k - 1, 0);
    let idx = 0;
    let ind;

    while (true) {
        res[idx++] = copyComb(pos, xs, str);
        for (ind = 0; pos[ind] >= last - ind;) if (++ind >= k) return res;
        for (pos[ind]++; ind; ind--) pos[ind - 1] = pos[ind] + 1;
    }
};

const _repeat = (n, x, fn = _id) => {
    const res = Array(n);
    let ind = 0;
    while (ind < n) res[ind++] = fn(x);
    return res;
};

const _combRep = (k, xs) => {
    const xlen = _len(xs);
    const str = isString(xs);
    if (k <= 0) return [str ? '' : []];
    const res = Array(binCoeff(k, xlen + k - 1));
    if (k === 2) return comb2(res, xlen, xs, str, 0);
    const last = xlen - 1;
    const pos = _repeat(k, 0);
    let idx = 0;
    let ind;

    while (true) {
        res[idx++] = copyComb(pos, xs, str);
        for (ind = 0; pos[ind] >= last;) if (++ind >= k) return res;
        for (pos[ind]++; ind; ind--) pos[ind - 1] = pos[ind];
    }
};

const _permutations = (xs, k = _len(xs)) => {
    const xlen = _len(xs);
    const str = isString(xs);
    if (k > xlen || k <= 0) return [str ? '' : []];
    const res = Array(binCoeff(k, xlen) * _fact(k));
    const pos = from(0, xlen);
    const used = range(xlen, xlen - k + 1);
    let idx = 0;
    let i;

    loop1:
    while (true) {
        res[idx++] = copyPerm(pos, xs, k, str);
        for (i = k - 1; i >= 0; i--) {
            if(--used[i]) { swap(pos, i, xlen - used[i]); continue loop1; }
            rotPerm(pos, i); used[i] = xlen - i;
        }
        return res;
    }
};

const _any = (pred, xs) => {
    const len = _len(xs);
    let ind = 0;
    
    while (ind < len) {
         if (pred(xs[ind], ind)) return true;
         ind++;
    }
    return false;
};

const _all = (pred, xs) => {
    const len = _len(xs);
    let ind = 0;
    
    while (ind < len) {
         if (!pred(xs[ind], ind)) return false;
         ind++;
    }
    return true;
};

const _cycle = (n, xs) => {
    if (_nul(xs)) return emptyAS(xs);
    const xlen = _len(xs);
    const res = Array(n);
    let ind = 0, idx = 0;

    while (idx < n) {
        res[idx++] = xs[ind++];
        if (ind === xlen) ind = 0;
    }
    return isString(xs) ? _unchars(res) : res;
};

const _filter = (pred, xs) => {
    const xlen = _len(xs);
    const res = [];
    let ind = 0;
    let idx = 0;
    
    while (ind < xlen) {
        if(pred(xs[ind], ind)) res[idx++] = xs[ind];
        ind++;
    }
    return isString(xs) ? _unchars(res) : res;
};

const _reject = (pred, xs) => {
    const xlen = _len(xs);
    const res = [];
    let ind = 0;
    let idx = 0;
    
    while (ind < xlen) {
        if(!pred(xs[ind], ind)) res[idx++] = xs[ind];
        ind++;
    }
    return isString(xs) ? _unchars(res) : res;
};

const _partition = (pred, xs) => {
    const xlen = _len(xs);
    const pass = [];
    const fail = [];
    let ind = 0;
    
    while (ind < xlen) {
        (pred(xs[ind], ind) ? pass : fail).push(xs[ind]);
        ind++;
    }
    return isString(xs) ? [_unchars(pass), _unchars(fail)] : [pass, fail];
};

const _elemIndexSorted = (e, xs) => {
    let low = 0;
    let high = _len(xs);
    let mid;
    
    while (low < high) {
        mid = (low + high) >>> 1;
        if (e > xs[mid]) low = mid + 1;
        else high = mid;
    }
    return low < _len(xs) && xs[low] === e ? low : -1;
};

const _mergeSorted = (xs, ys, res = _merge(xs, ys, gt)) => bothStr(xs, ys) ? _unchars(res) : res;
const _insertSorted = (e, xs, res = _insert(e, xs, gt)) => isString(xs) ? _unchars(res) : res;

const _mergeSortedBy = (fn, xs, ys) => {
    const res = _merge(xs, ys, _len(fn) > 1 ? gt_cmp(fn) : _gt(fn));
    return bothStr(xs, ys) ? _unchars(res) : res;
};

const _insertSortedBy = (fn, e, xs) => {
    const res = _insert(e, xs, _len(fn) > 1 ? gt_cmp(fn) : _gt(fn));
    return isString(xs) ? _unchars(res) : res;
};

const _splitBy = (n, xs) => {
    if (n <= 0) return [];
    const str = isString(xs);
    const len = _len(xs);
    const res = Array(Math.ceil(len / n));
    let idx = 0;
    let ind = 0;

    while (ind < len) res[idx++] = _slice(xs, ind, ind = ind + n, str);
    return res;
};

const _uncharsInner = xs => (xs[1] = _unchars(xs[1]), xs);

const _groupBy = (fn, xs, byKey, fn_add) => {
    const res = _group(xs, byKey, _returnL, fn_add, fn);
    if (isString(xs)) {
        const rlen = _len(res);
        const fnn = byKey ? _uncharsInner : _unchars;
        let ind = 0;
        while (ind < rlen) { res[ind] = fnn(res[ind]); ind++; }
    }
    return res;
};

const _deleteIndices = (indices, xs, value) => {
    const xlen = _len(xs);
    const ilen = _len(indices);
    const mask = Array(xlen);
    const res = [];
    let ind = 0;
    let idx = 0;

    while (ind < ilen) mask[indices[ind++]] = true;

    ind = 0;
    while (ind < xlen) {
        if (mask[ind] === value) res[idx++] = xs[ind];
        ind++;
    }
    return isString(xs) ? _unchars(res) : res;
};

const outT = (xs, n) => n <= 0 ? emptyAS(xs) : _copyA(xs, 0, _len(xs), isString(xs));
const outD = (xs, n) => n <= 0 ? _copyA(xs, 0, _len(xs), isString(xs)) : emptyAS(xs);

const uncurry = fn => _len(fn) > 1 ? fn : (a, b) => fn(a)(b);

const _reverse = xs => {
    const xlen = _len(xs);
    const last = xlen - 1;
    const res = Array(xlen);
    let ind = 0;
    
    while (ind < xlen) {
        res[last - ind] = xs[ind];
        ind++;
    }
    return isString(xs) ? _unchars(res) : res;
};

const _shuffle = xs => {
    const xlen = _len(xs);
    const res = Array (xlen);
    let rand, ind;
    
    for (ind = 0; ind < xlen; ind++) {
        rand = Math.floor ((ind + 1) * Math.random());
        if (rand !== ind) res[ind] = res[rand];
        res[rand] = xs[ind];
    }
    return isString(xs) ? _unchars(res) : res;
};

const _flatten = xs => {
    const res = [];
    const fn = xs => {
        const xlen = _len(xs);
        let ind = 0;
        
        while (ind < xlen) {
            if (isArr(xs[ind])) fn(xs[ind]); else res.push(xs[ind]);
            ind++;
        }
    };
    fn(xs);
    return res;
};

const _subsequences = xs => {
    const str = isString(xs);
    const xlen = _len(xs);
    if (xlen > 30) return [];
    const count = (1 << xlen);
    const res = Array(count);
    let combs, ind, indx, icom;

    for (ind = 0; ind < count; ind++){
        combs = []; icom = 0;
        for (indx = 0; indx < xlen; indx++){
            if (ind & (1 << indx)) combs[icom++] = xs[indx];
        }
        res[ind] = str ? _unchars(combs) : combs;
    }
    return res;
};

const _cartProd = xss => {
    const xlen = _any(x => _len(x) === 0, xss) ? 0 : _len(xss);
    if (xlen === 0) return [];
    const str = _all (isString, xss);
    if (xlen === 2) return _prod(pair, true, xss[0], xss[1]);
    const last = xlen - 1;
    const res = Array(_foldl((z, x) => z * _len(x), 1, xss));
    const pos = _repeat(xlen, 0);
    let idx = 0;
    let ind;

    while (true) {
        res[idx++] = copyProd(xss, pos, xlen, str);
        ind = last;
        while (true) {
            if (++pos[ind] < _len(xss[ind])) break;
            pos[ind] = 0;
            if (--ind < 0) return res;
        }
    }
};

const _diagonals = (xss, left) => {
    const str = _all(isString, xss);
    const m = _len(xss) - 1;
    const n = _len(xss[0]) - 1;
    const len = m + n;
    const res = Array(len);
    let ind, tmp, idx, from, to;

    for (ind = 0; ind <= len; ind++) {
        from = ind < m ? ind : m;
        to = ind < n ? 0 : ind - n;
        tmp = Array(from - to + 1);
        idx = 0;
        while (from >= to) tmp[idx++] = xss[left ? from : m - from][ind - from--];
        res[ind] = str ? _unchars(tmp) : tmp;
    }
    return res;
};

const _times = (n, fn) => {
    const res = Array(n);
    let ind = -1;
    while (++ind < n) res[ind] = fn(ind);
    return res;
};

const bestMed = (xs, fn, ind, xlen) => {
    let res = xs[ind++];

    while (ind < xlen) {
        res = fn(xs[ind], res) ? xs[ind] : res;
        ind++;
    }
    return res;
};

const partMed = (xs, low, high, mid, p, gtfn) => {
    while (p !== mid) {
        p = partitionHoare(xs, low, high, gtfn);
        if (p > mid) high = p;
        else if (p < mid) low = p + 1;
    }
    return xs;
};

const _median = (xs, gtfn, ltfn, fn) => {
    const xlen = _len(xs);
    if (!xlen) return NaN;
    if (xlen === 1) return fn(xs[0]);
    const mid = (xlen >>> 1) - (even(xlen) ? 1 : 0);
    xs = partMed(copy(xs), 0, xlen - 1, mid, -1, gtfn);
    const first = fn(bestMed(xs, gtfn, 0, mid+1));
    return even(xlen) ? ((first + fn(bestMed(xs, ltfn, mid+1, xlen))) / 2) : first;
};

const _sum = xs => {
    const xlen = _len(xs);
    let res = 0;
    let ind = 0;

    while (ind < xlen) {
        res = res + xs[ind];
        ind++;
    }
    return res;
};

const best = (xs, fn) => {
    const xlen = _len(xs);
    let res = xs[0];
    let ind = 1;

    while (ind < xlen) {
        res = fn(xs[ind], res) ? xs[ind] : res;
        ind++;
    }
    return res;
};

const _nths = (n, ind, xs) => {
    const xlen = _len(xs);
    if (!xlen || n <= 0 || ind >= xlen - 1) return emptyAS(xs);
    ind = trans(ind, xlen);
    const res = Array(Math.floor((xlen - (ind + 1)) / n) + 1);
    let idx = 0;

    while (ind < xlen) {
        res[idx++] = xs[ind];
        ind = ind + n;
    }
    return isString(xs) ? _unchars(res) : res;
};

const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

const _pick = (keys, obj) => {
    const res = {};
    const klen = _len(keys);
    let ind = 0;
    let key;

    while (ind < klen) {
        key = keys[ind];
        if (has(obj, key)) res[key] = obj[key];
        ind++;
    }
    return res;
};

const _pickBy = (pred, obj) => {
    const res = {};
    const objkeys = keys(obj);
    const klen = _len(objkeys);
    let ind = 0;
    let key;

    while (ind < klen) {
        key = objkeys[ind];
        if (pred(obj[key], key)) res[key] = obj[key];
        ind++;
    }
    return res;
};

const _mapObj = (fn, obj) => {
    const res = {};
    const objkeys = keys(obj);
    const klen = _len(objkeys);
    let ind = 0;
    let key;    

    while (ind < klen) {
        key = objkeys[ind];
        res[key] = fn(obj[key], key);
        ind++;
    }
    return res;
};

const _invert = (obj, fn_start, fn_add) => {
    const res = {};
    const arr = isArr(obj);
    const okeys = keys(obj);
    const klen = _len(okeys);
    let ind = 0;
    let key, value;

    while (ind < klen) {
        key = okeys[ind];
        value = obj[key];
        key = arr ? Number(key) : key;
        res[value] = has(res, value) ? fn_add(res[value], key) : fn_start(key);
        ind++;
    }
    return res;
};

const _elemInd = (e, xs) => {
    const len = _len(xs);
    let ind = 0;

    while (ind < len) {
        if (e === xs[ind]) return ind;
        ind++;
    }
    return -1;
};

const _omit = (keysToDel, obj) => {
    const res = {};
    const objkeys = keys(obj);
    const klen = _len(objkeys);
    let ind = 0;
    let key;    

    while (ind < klen) {
        key = objkeys[ind];
        if (_elemInd(key, keysToDel) === -1) res[key] = obj[key];
        ind++;
    }
    return res;
};

const cloneArr = (xs, stD, stS) => {
    const xlen = _len(xs);
    const res = Array(xlen);
    let ind = 0;

    stD.push(res); stS.push(xs);
    while (ind < xlen) {
        res[ind] = _clone(xs[ind], stD, stS);
        ind++;
    }
    stD.pop(); stS.pop();
    return res;
};

const cloneObj = (obj, stD, stS) => {
    const res = {};
    const objkeys = keys(obj);
    const klen = _len(objkeys);
    let ind = 0;
    let key;    

    stD.push(res); stS.push(obj);
    while (ind < klen) {
        key = objkeys[ind];
        res[key] = _clone(obj[key], stD, stS);
        ind++;
    }
    stD.pop(); stS.pop();
    return res;
};

const _clone = (obj, stD, stS) => {
    if (prim(obj)) return obj;
    const type = toString.call(obj);
    if (type === '[object Date]') return new Date(obj.valueOf());
    stD = stD || []; stS = stS || [];
    const index = _elemInd(obj, stS);
    return index !== -1 ? stD[index] : (type === '[object Array]' ? cloneArr : cloneObj) (obj, stD, stS);
};

const _ordered = (xs, fn) => {
    const xlen = _len(xs);
    let ind = 1;

    while (ind < xlen) {
        if (fn(xs[ind-1], xs[ind])) return false;
        ind++;
    }
    return true;
};

const _sortN = (n, xs, sortfn, partfn) => {
    if (n <= 0) return emptyAS(xs);
    if (n >= _len(xs)) return sortfn(xs);
    const res = sortfn(take (n) (partMed(copy(xs), 0, _len(xs)-1, n-1, -1, partfn)));
    return isString(xs) ? _unchars(res) : res;
}

const gtfn = fn => _len(fn) > 1 ? gt_cmp(fn) : _gt(fn);
const ltfn = fn => _len(fn) > 1 ? lt_cmp(fn) : _lt(fn);


//////////////////////////////////////////////////////////////////////////////////////////////////////


// current version of the library
export const VERSION = '1.0.0';

// Basic functions
export const cp = (...fns) => arg => _cp(fns, arg);
export const chain = (...fns) => arg => _chain(fns, arg);

export const append = xs => ys => _append(xs, ys);
export const head = xs => xs[0];
export const last = xs => xs[_len(xs) - 1];
export const init = xs => _copyA(xs, 0, _nul(xs) ? 0 : _len(xs) - 1, isString(xs));
export const tail = xs => _slice(xs, _nul(xs) ? 0 : 1, _len(xs), isString(xs));
export const nul = _nul;
export const len = _len;
export const copy = xs => _copyA(xs,0,_len(xs));
export const cons = x => xs => _cons(x, xs);
export const consR = xs => x => _consR(xs, x);
export const uncons = xs => [head(xs), tail(xs)];
export const nth = ind => xs => xs[ind + (ind < 0 ? _len(xs) : 0)];
export const each = fn => xs => _each(fn, xs);
export const id = _id;
export const flip = fn => x => y => fn (y) (x);
export const not = x => !x;
export const iter = npred => fn => x => _iter (npred, fn, x);
export const until = pred => fn => x => _until(pred, fn, x);
export const equal = (x, y) => _equal(x, y);
export const eq = x => y => _equal(x, y);
export const equalBy = _eq;


// List transformations
export const map = fn => xs => _map(fn, xs);

export const concat = xss => _concat(xss, _id, _foldl((z, x) => z + _len(x), 0, xss));
export const concatMap = fn => xs => _concat(xs, fn, 0);

export const reverse = _reverse;
export const rotate = n => xs => _rotate(n, xs);
export const intersperse = sep => xs => _intersperse(sep, xs);

export const group = xs => _groupBy(_id, xs, false, fn_push);
export const count = xs => _group(xs, true, fn_one, fn_count, _id);
export const section = xs => _section(xs, _equal, secFn);
export const sectionH = xs => _section(xs, _equal, secHFn, true);
export const sectionBy = fn => xs => _section(xs, _len(fn) > 1 ? fn : _eq(fn), secFn);
export const sectionHBy = fn => xs => _section(xs, _len(fn) > 1 ? fn : _eq(fn), secHFn, true);
export const splitBy = n => xs => _splitBy(n, xs);

export const shuffle = _shuffle;
export const flatten = _flatten;
export const prod = xs => ys => _prod(pair, true, xs, ys);

export const diags1 = xss => _diagonals(xss, true);
export const diags2 = xss => _diagonals(xss, false);


// Combinatorics
export const subsequences = _subsequences;
export const cartProd = _cartProd;
export const combinations = k => xs => _combinations(k, xs);
export const combRep = k => xs => _combRep(k, xs);
export const permutations = xs => _permutations(xs);
export const permK = k => xs => _permutations(xs, k);
export const permRep = k => xs => cartProd (_repeat (k, xs));

export const bindL = xs => fn => _concat (xs, fn, 0);
export const returnL = _returnL;
export const guardL = b => fn => b ? fn(0) : [];
export const liftM2L = fn => xs => ys => _prod(uncurry(fn), false, xs, ys);
export const foldM = fn => z => xs => _foldr ((x, res) => a => bindL(fn(a, x))(res), _returnL, xs) (z);

export const bindR = fn1 => fn2 => x => fn2 (fn1 (x)) (x);
export const returnR = x => () => x;
export const liftM2R = fn => fn1 => fn2 => x => uncurry(fn) (fn1(x), fn2(x));

export const divx = fn1 => fn2 => x => [fn1 (x), fn2 (x)];


// Math
export const add = (x, y) => y === undefined ? y => x + y : x + y;
export const sub = (x, y) => y === undefined ? y => x - y : x - y;
export const mul = (x, y) => y === undefined ? y => x * y : x * y;
export const div = (x, y) => y === undefined ? y => x / y : x / y;
export const fact = _fact;
export const negate = x => -x;

export const even = n => n % 2 === 0;
export const odd = n => n % 2 !== 0;
export const sq = x => x * x;
export const sqrt = Math.sqrt;
export const inc = _inc;
export const dec = x => x - 1;

export const max = (x, y) => y > x ? y : x;
export const min = (x, y) => y < x ? y : x;

export const random = (min, max) => min <= max ? min + Math.floor((max - min + 1) * Math.random()) : random(max, min);
export const choice = xs => xs[random(0, _len(xs) - 1)];


// Objects
export const copyO = obj => Object.assign({}, obj);
export const clone = obj => _clone(obj);

export const pick = (...keys) => obj => _pick(keys, obj);
export const pickBy = pred => obj => _pickBy(pred, obj);
export const mapO = fn => obj => _mapObj(fn, obj);
export const select = (...keys) => objs => map (pick(...keys)) (objs);
export const invert = obj => _invert(obj, _id, (_,key) => key);
export const invertAll = obj => _invert(obj, returnL, grOAdd);
export const extend = obj1 => obj2 => Object.assign({}, obj1, obj2);
export const omit = (...keys) => obj => _omit(keys, obj);


// Reducing lists
export const foldl = fn => z => xs => _foldl(fn, z, xs);
export const foldr = fn => z => xs => _foldr(fn, z, xs);
export const foldl1 = fn => xs => _foldl(fn, NUL, xs);
export const foldr1 = fn => xs => _foldr(fn, NUL, xs);

export const any = pred => xs => _any(pred, xs);
export const all = pred => xs => _all(pred, xs);

export const none = pred => xs => !_any(pred, xs);
export const or = xs => _any(_id, xs);
export const and = xs => _all(_id, xs);

export const sum = _sum;
export const product = xs => _foldl (mul, 1, xs);
export const mean = xs => sum(xs) / _len(xs);
export const median = xs => _median(xs, gt, lt, _id);
export const sumBy = fn => xs => _foldl ((z, x) => z + fn(x), 0, xs);
export const meanBy = fn => xs => sumBy (fn) (xs) / _len(xs);
export const medianBy = fn => xs => _median(xs, _gt(fn), _lt(fn), fn);

export const maximum = xs => best (xs, gt);
export const minimum = xs => best (xs, lt);

export const maxLen = xss => _len(xss) ? _len(best (xss, _gt(_len))) : undefined;
export const minLen = xss => _len(xss) ? _len(best (xss, _lt(_len))) : undefined;

export const uniq = xs => _isUniq(xs, _id);

export const countElem = e => xs => _countE(e, _equal, xs);
export const countSeq = xs => ys => _seqAll(xs, ys, 0, _inc, NUL);
export const toObj = xss => _foldl ((z, p) => (z[p[0]] = p[1], z), {}, xss);


// Building lists
export const scanl = fn => z => xs => _scanl(fn, z, xs);
export const scanr = fn => z => xs => _scanr(fn, z, xs);
export const scanl1 = fn => xs => _scanl(fn, NUL, xs);
export const scanr1 = fn => xs => _scanr(fn, NUL, xs);

export const iterate = npred => fn => x => _iterate (npred, fn, x);
export const untilA = pred => fn => x => _untilA(pred, fn, x);
export const times = n => fn => _times(n, fn);
export const repeat = (n, x) => isString(x) ? (n<0?'':x.repeat(n)) : _repeat(n,x,prim(x)?_id:isArr(x)?copy:copyO);
export const replicate = (n, x) => _repeat(n, x, prim(x) ? _id : clone);
export const cycle = (n, xs) => _cycle(n, xs);

export const from = (first, n, step = 1) => {
    if (step === 0) step = 1;
    const str = isString(first);
    return _from (str ? ord(first) : first, n, step, str, 0);
};

export const range = (first, last, step = 1) => {
    if (step === 0) step = 1;
    const str = isString(first) && isString(last);
    if (str) {
        first = ord(first);
        last = ord(last);
    }

    const step_abs = Math.abs(step);
    const n = Math.ceil ((Math.abs(last - first) + 1) / step_abs);

    return _from (first, n, first > last ? -step_abs : step_abs, str, 0);
};

export const keys = Object.keys;
export const values = Object.values || (obj => _map (key => obj[key], keys(obj)));
export const entries = Object.entries || (obj => _map (key => [key, obj[key]], keys(obj)));


// Sublists
export const take = n => xs => n <= 0 || n > _len(xs) ? outT(xs, n) : _copyA(xs, 0, n, isString(xs));
export const drop = n => xs => n <= 0 || n > _len(xs) ? outD(xs, n) : _slice(xs, n, _len(xs), isString(xs));
export const takeLast = n => xs => drop (_len(xs) - n) (xs);
export const dropLast = n => xs => take (_len(xs) - n) (xs);
export const takeFrom = ind => n => xs => n <= 0 ? emptyAS(xs) : _slice(xs,ind,trans(ind,_len(xs))+n,isString(xs));
export const splitAt = n => xs => [take(n) (xs), drop(n) (xs)];

export const takeWhile = pred => xs => _while(take, pred, xs);
export const dropWhile = pred => xs => _while(drop, pred, xs);
export const span = pred => xs => _while(splitAt, pred, xs);

export const takeLastWhile = pred => xs => _whileLast(drop, pred, xs);
export const dropLastWhile = pred => xs => _whileLast(take, pred, xs);
export const spanLast = pred => xs => _whileLast(splitAt, pred, xs);

export const nths = (n, start = 0) => xs => _nths(n, start, xs);
export const tails = xs => _inits (xs, 0, _len(xs), 1, tail);
export const inits = xs => _inits (xs, _len(xs), _len(xs), -1, init);


// Searching
export const elem = e => xs => _elemBy(e, xs, _equal);
export const notElem = e => xs => !_elemBy(e, xs, _equal);
export const elemSorted = e => xs => _elemIndexSorted(e, xs) !== -1;

export const startsWith = xs => ys => prefix (xs, ys, _len(xs), 0);
export const endsWith = xs => ys => prefix (xs, ys, _len(xs), _len(ys) - _len(xs));
export const seq = xs => ys => _seq (xs, ys) !== -1;

export const find = pred => xs => _find (pred, xs);
export const filter = pred => xs => _filter(pred, xs);
export const reject = pred => xs => _reject(pred, xs);
export const findLast = pred => xs => _findLast (pred, xs);
export const partition = pred => xs => _partition(pred, xs);


// Indexing
export const elemIndex = e => xs => _index(xs, e);
export const elemIndices = e => xs => _elemIndices(fn_eq, _equal, [], xs, e);
export const elemIndexLast = e => xs => _indexLast(_equal, xs, e);
export const findIndex = pred => xs => _find (pred, xs, true);
export const findIndices = pred => xs => _elemIndices(fn_each, pred, [], xs);
export const findIndexLast = pred => xs => _findLast (pred, xs, true);

export const elemIndexSorted = e => xs => _elemIndexSorted(e, xs);

export const seqIndex = xs => ys => _seq (xs, ys);
export const seqIndices = xs => ys => _seqAll (xs, ys, [], _indices, NUL);


// Zipping
export const zip = xs => ys => _zip (pair, true, xs, ys);
export const zipWith = fn => xs => ys => _zip (uncurry(fn), false, xs, ys);
export const unzip = xss => _len(xss)===2?_zip(pair,true,xss[0],xss[1]):_unzip(xss,_len(xss)===3?_zip3:_zipM,minLen);
export const transpose = unzip;
export const tpLongest = xss => _unzip(xss, _zipLongest, maxLen);
export const rotateL = xss => _unzip(xss, _rotLeft, minLen);
export const rotateR = xss => _unzip(xss, _rotRight, minLen);


// Special lists
export const lines = str => str.split('\n');
export const words = str => str.split(' ');
export const chars = _chars;
export const split = sep => str => str.split(sep);
export const toLower = str => str.toLowerCase();
export const toUpper = str => str.toUpperCase();
export const trim = str => str.trim();
export const ord = chr => chr.charCodeAt(0);

export const unlines = arr => arr.join('\n');
export const unwords = arr => arr.join(' ');
export const unchars = _unchars;
export const join = sep => arr => arr.join(sep);
export const chr = ord => String.fromCharCode(ord);

export const upper = c => isChar(c) && c[0] !== toLower(c[0]);
export const lower = c => isChar(c) && c[0] !== toUpper(c[0]);
export const alpha = c => isChar(c) && toUpper(c[0]) !== toLower(c[0]);
export const digit = c => isChar(c) && '0' <= c[0]  && c[0] <= '9';
export const space = c => isChar(c) && (c = ord(c[0]), c === 32 || (c > 8 && c < 14));
export const alnum = c => alpha(c) || digit(c);


// Deleting
export const del = e => xs => bothStr(e, xs) ? xs.replace(e,'') : secc(_index(xs, e), 1, xs, false, NUL);
export const delAll = e => xs => _delAll(e, xs, NUL);
export const deleteSeq = seq => xs => secc(_seq(seq, xs), _len(seq), xs, true, NUL);
export const deleteSeqAll = seq => xs => _seqAll (seq, xs, [], _delall);
export const deleteAt = ind => xs => _sec(ind, 1, xs, false, NUL);
export const deleteFrom = ind => n => xs => _sec(ind, n, xs, true, NUL);

export const deleteIndices = indices => xs => _deleteIndices(indices, xs);
export const keepIndices = indices => xs => _deleteIndices(indices, xs, true);

export const replace = e => toIns => xs => bothStr(e,xs) ? xs.replace(e,toIns) : secc(_index(xs,e),1,xs,false,toIns);
export const replaceAll = e => toIns => xs => _delAll(e, xs, toIns);
export const replaceSeq = seq => toIns => xs => secc(_seq(seq, xs), _len(seq), xs, true, toIns);
export const replaceSeqAll = seq => toIns => xs => _seqAll(seq, xs, [], _delall, toIns);
export const replaceAt = ind => toIns => xs => _sec(ind, 1, xs, false, toIns);
export const replaceFrom = ind => n => toIns => xs => _sec(ind, n, xs, true, toIns);

export const insertAt = ind => e => xs => _sec(ind, 0, xs, false, e, gt);
export const insertSeqAt = ind => seq => xs => _sec(ind, 0, xs, true, seq, gt);


// Set operations
export const nub = xs => ops(nubSet, nubSet, null, xs, _id);
export const minus = xs => ys => ops(writeMap, readMap, xs, ys, _id);
export const deleteAll = xs => ys => ops(newSet, _dall, ys, xs, _id);
export const keepAll = xs => ys => ops(newSet, _keep, ys, xs, _id);
export const intersect = xs => ys => ops(newSet, intSet, xs, ys, _id);
export const difference = xs => ys => ops(newSet, nubSet, xs, ys, _id);
export const union = xs => ys => ops(nubSet, nubSet, ys, xs, _id);

export const nubSorted = xs => {
    if (_nul(xs)) return copyAS(xs);
    const res = _nubSorted(xs, [], ad);
    return isString(xs) ? _unchars(res) : res;
};

export const minusSorted = xs => ys => mdk(xs, ys, _inc, true);
export const deleteAllSorted = xs => ys => mdk(ys, xs, _id, true);
export const keepAllSorted = xs => ys => mdk(ys, xs, _id, false);
export const intersectSorted = xs => ys => isd(xs, ys, _inc, false);
export const differenceSorted = xs => ys => isd(xs, ys, _id, true);
export const unionSorted = xs => ys => _union(xs, ys);


// Sorting
export const asc = fn => (x, y) => _cmp (fn(x), fn(y));
export const desc = fn => (x, y) => _desc (fn(x), fn(y));

export const cmp = (...fns) => (x, y) => {
    const flen = _len(fns);
    let res = 0;
    let ind = 0;

    while (res === 0 && ind < flen) res = fns[ind++](x, y);
    return res;
};

export const sort = xs => qsort(xs, gt);
export const sortDesc = xs => qsort(xs, lt);

export const sortBy = fn => xs => msort(xs, gtfn(fn));
export const sortDescBy = fn => xs => msort(xs, ltfn(fn));

export const sortN = n => xs => _sortN(n, xs, sort, gt);
export const sortNDesc = n => xs => _sortN(n, xs, sortDesc, lt);
export const sortNBy = n => fn => xs => _sortN(n, xs, sortBy(fn), gtfn(fn));
export const sortNDescBy = n => fn => xs => _sortN(n, xs, sortDescBy(fn), ltfn(fn));

export const merge = xs => ys => _mergeSorted(xs, ys);
export const insert = e => xs => _insertSorted(e, xs);

export const mergeBy = fn => xs => ys => _mergeSortedBy(fn, xs, ys);
export const insertBy = fn => e => xs => _insertSortedBy(fn, e, xs);

export const maxBy = fn => (x, y) => gtfn(fn) (y, x) ? y : x;
export const minBy = fn => (x, y) => ltfn(fn) (y, x) ? y : x;
export const maximumBy = fn => xs => best (xs, gtfn(fn));
export const minimumBy = fn => xs => best (xs, ltfn(fn));

export const ordered = xs => _ordered(xs, gt);
export const orderedBy = fn => xs => _ordered(xs, gtfn(fn));


// The "By" operations
export const nubBy = fn => xs => _len(fn) > 1 ? _nubBy(xs, fn) : ops(nubSet, nubSet, null, xs, fn);
export const minusBy = fn => xs => ys => _len(fn) > 1 ? _minusBy(xs,ys,fn) : ops(writeMap,readMap,xs,ys,fn);
export const deleteAllBy = fn => xs => ys => _len(fn) > 1 ? _dkdi(ys,xs,dallBy,fn) : ops(newSet,_dall,ys,xs,fn);
export const keepAllBy = fn => xs => ys => _len(fn) > 1 ? _dkdi(ys,xs,kallBy,fn) : ops(newSet,_keep,ys,xs,fn);
export const intersectBy = fn => xs => ys => _len(fn) > 1 ? _dkdi(xs,ys,intsBy,fn) : ops(newSet,intSet,xs,ys,fn);
export const differenceBy = fn => xs => ys => _len(fn) > 1 ? _dkdi(xs,ys,diffBy,fn) : ops(newSet,nubSet,xs,ys,fn);
export const unionBy = fn => xs => ys => _len(fn) > 1 ? _unionBy(xs, ys, fn) : ops(nubSet, nubSet, ys, xs, fn);

export const uniqBy = fn => xs => _len(fn) > 1 ? _uniqBy(xs, fn) : _isUniq(xs, fn);
export const elemBy = fn => e => xs => _elemBy(e, xs, _len(fn) > 1 ? fn : _eq(fn));

export const groupBy = fn => xs => _len(fn) > 1 ? gcBy(xs, groupAdd, groupInc, fn, true):_groupBy(fn,xs,false,fn_push);
export const countBy = fn => xs => _len(fn) > 1 ? gcBy(xs, countAdd, countInc, fn): _group(xs,true,fn_one,fn_count,fn);

export const grouppBy = fn => xs => _groupBy(fn, xs, true, fn_push_K);

export const groupOBy = fn => xs => _groupObj(xs, returnL, grOAdd, fn, true);
export const countOBy = fn => xs => _groupObj(xs, fn_one, inc, fn);