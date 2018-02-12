import { cp, len, nul, map, unlines, unwords, maxLen, tpLongest, repeat, intersperse } from './halib.js';


export const print = xs => {
    if (typeof document !== 'undefined') {
        if (nul(xs)) {
            const br = document.createElement('br');
            document.getElementById('res').appendChild(br);    
        }
        else {
            const pg = document.createElement('p');
            const text = document.createTextNode(xs);
            pg.appendChild(text);
            document.getElementById('res').appendChild(pg);    
        }
    }
    else console.log(xs);
};

export const drawh1D = unwords;
export const drawv1D = unlines;
export const printh1D = cp(print, drawh1D);
export const printv1D = cp(print, drawv1D);

export const draw2D = cp(unlines, map(unwords));
export const print2D = cp(print, draw2D);

export const draw3D = cp(unlines, intersperse(' '), map(draw2D));
export const print3D = cp(print, draw3D);


const _drawTable = (data, fn, dt = map(map(String))(data)) => {
    const widths = map (maxLen) (fn(dt));
    const cell = (txt, ind, ws = repeat(widths[ind] - len(txt), ' ')) => isNaN(txt) ? txt + ws : ws + txt;
    return unlines (map (row => unwords (map (cell) (row))) (dt));
};

export const drawTable = data => _drawTable(data, tpLongest);
export const printTable = cp(print, drawTable);


const _drawArr3D = xs => {
    const isArr = xs => xs && xs.constructor === Array;
    const inner = (arr, ind, newline = true) => {
        const head = ind ? ' ' : '';
        const body = ' [' + map(x => isArr(x) ? inner(x, 0, false) : ' ' + x)(arr) + ' ]';
        const tail = ind < len(xs) - 1 && newline ? ',' : '';
        return head + body + tail;
    };
                     
    return '[' +  unlines(map(inner)(xs)) + ' ]';
};

export const drawArr3D = _drawArr3D;
export const printArr2D = cp(print, drawArr3D);
export const printArr3D = cp(print, drawArr3D);



