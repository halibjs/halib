declare module "halib" {

// Basic functions
    export const cp: (...fns: ((x: any) => any)[]) => (arg: any) => any;
    export const chain: (...fns: ((x: any) => any)[]) => (arg: any) => any;

    export const append: (xs: string | any[]) => (ys: string | any[]) => string | any[];
    export const head: { (xs: string): string; <T>(xs: T[]): T; };
    export const last: { (xs: string): string; <T>(xs: T[]): T; };
    export const init: { (xs: string): string; <T>(xs: T[]): T[]; };
    export const tail: { (xs: string): string; <T>(xs: T[]): T[]; };
    export const nul: (xs: string | any[]) => boolean;
    export const len: (xs: string | any[]) => number;
    export const copy: { (xs_obj: string): any; <T>(xs_obj: T[]): T[]; (xs_obj: Object) : Object;};
    export const cons: (x: any) => (xs: string | any[]) => string | any[];
    export const consR: (xs: string | any[]) => (ys: any) => string | any[];
    export const uncons: { (xs: string): any[]; <T>(xs: T[]): (T | T[])[]; };
    export const nth: (ind: number) => (xs: string | any[]) => any;
    export const each: (fn: (x: any, ind: number) => void) => (xs: string | any[]) => void;
    export const id: <T> (x: T) => T;
    export const flip: (fn: (x: any) => (y: any) => any) => (x: any) => (y: any) => any;
    export const not: (x: boolean) => boolean;
    export const iter: (npred: number|((x: any) => boolean)) => (fn: (x: any, ind: number) => any) => (x: any) => any;
    export const until: (pred: ((x: any) => boolean)) => (fn: (x: any) => any) => (x: any) => any;
    export const equal: (x: any, y: any) => boolean;
    export const eq = (x: any) => (y: any) => boolean;    
    export const equalBy: (fn: ((x: any) => any)) => (x: any, y: any) => boolean;
    
    
/////////////////////////////////////////////////////////////////////////////////////////////////////

// List transformations
    export const map: <TRes>(fn: (x: any, ind: number) => TRes) => (xs: string | any[]) => TRes[];

    export const concat: (xss: any[]) => any;
    export const concatMap: (fn: (x: any) => any[]) => (xs: string | any[]) => any;

    export const reverse: { (xs: string): any; <T>(xs: T[]): T[]; };
    export const rotate: (n: number) => (xs: string | any[]) => any;
    export const intersperse: (sep: any) => (xs: string | any[]) => any;

    export const group: { (xs: string): string[]; <T>(xs: T[]): T[][]; };
    export const count: (xs: string | any[]) => any[];
    export const section: { (xs: string): string[]; <T>(xs: T[]): T[][]; };
    export const sectionH: { (xs: string): string[]; <T>(xs: T[]): T[]; };
    export const sectionBy = (fn: (x:any, y:any) => boolean) => (xs: string | any[]) => any[];
    export const sectionHBy = (fn: (x:any, y:any) => boolean) => (xs: string | any[]) => any[];
    export const splitBy: (n: number) => <T>(xs: string | T[]) => any[];
    
    export const shuffle: { (xs: string): string; <T>(xs: T[]): T[]; };
    export const flatten: (xs: string | any[]) => any[];
    export const prod: (xs: string | any[]) => (ys: string | any[]) => string | any[];

    export const diags1 = <T>(xss: T[][]) => T[][];
    export const diags2 = <T>(xss: T[][]) => T[][];
    

/////////////////////////////////////////////////////////////////////////////////////////////////////

// Combinatorics
    export const subsequences: { (xs: string): string[]; <T>(xs: T[]): T[][]; };
    export const cartProd: {(xss: string[]): string[]; <T>(xss: T[][]): T[][];};
    export const combinations: { (k: number): (xs: string) => string[]; (k: number): <T>(xs: T[]) => T[][]; }
    export const combRep: { (k: number): (xs: string) => string[]; (k: number): <T>(xs: T[]) => T[][]; }
    export const permutations: { (xs: string): string[]; <T>(xs: T[]): T[][]; };
    export const permK: { (xs: string): string[]; <T>(xs: T[]): T[][]; };
    export const permRep: { (xs: string): string[]; <T>(xs: T[]): T[][]; };

    export const bindL: <T>(xs: string|T[]) => (fn: (x: string|T) => string|any[]) => string|any[];
    export const returnL: <T>(x: T) => T[];
    export const guardL: (b: boolean) => (fn: (x: number) => any[]) => any[];
    export const liftM2L: (fn: (x: any, y: any, indx: number, indy: number) => any) =>
                        (xs: string | any[]) => (ys: string | any[]) => any;
    export const foldM = (fn: (x:any) => string | any[]) => (z: any) => (xs: string | any[]) => any[];
    export const bindR: (fn1: (x:any) => any) => (fn2: ((x:any) => (y:any) => any)) => (x:any) => any;
    export const returnR: (x: any) => () => any;
    export const liftM2R: (fn: (x: any, y: any) => any)=>(fn1: (x:any) => any)=>(fn2: (x:any) => any)=>(x:any) => any;

    export const divx: (fn1: (x:any) => any) => (fn2: (x:any) => any) => (x:any) => any[];


/////////////////////////////////////////////////////////////////////////////////////////////////////

// Math
    export const add: (a: number, b: number) => number;
    export const sub: (a: number, b: number) => number;
    export const mul: (a: number, b: number) => number;
    export const div: (a: number, b: number) => number;
    export const fact: (x: number) => number;
    export const negate = (x: number) => number;
    
    export const even: (n: number) => boolean;
    export const odd: (n: number) => boolean;
    export const sq = (n: number) => number;
    export const sqrt = (n: number) => number;
    export const inc = (n: number) => number;
    export const dec = (n: number) => number;
    
    export const max: (x: any, y: any) => any;
    export const min: (x: any, y: any) => any;

    export const random: (min: number, max: number) => number;
    export const choice: { (xs: string): string; <T>(xs: T[]): T; };


//////////////////////////////////////////////////////////////////////////////////////////

    // Objects
    export const copyO = (obj: Object) => Object;
    export const clone = (obj: Object) => Object;


    export const pick = (...keys) => (obj: Object) => Object;
    export const pickBy = (pred: ((x: any) => boolean)) => (obj: Object) => Object;
    export const mapO = (fn: ((x: any) => any)) => (obj: Object) => Object;
    export const select = (...keys: string[]) => (obj: Object) => Object[];
    export const invert = (obj: Object) => Object;
    export const invertAll = (obj: Object) => Object;
    export const extend = (obj1: Object) => (obj2: Object) => Object;
    export const omit = (...keys: string[]) => (obj: Object) => Object;

    

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Reducing lists    
    export const foldl: <TRes>(fn: (z: any, x: any, ind: number) => TRes) => (z: any) => (xs: string | any[]) => TRes;
    export const foldr: <TRes>(fn: (x: any, z: any, ind: number) => TRes) => (z: any) => (xs: string | any[]) => TRes;
    export const foldl1: <TRes>(fn: (z: any, x: any, ind: number) => TRes) => (xs: string | any[]) => TRes;
    export const foldr1: <TRes>(fn: (x: any, z: any, ind: number) => TRes) => (xs: string | any[]) => TRes;

    export const any: (pred: (x: any) => boolean) => (xs: string | any[]) => boolean;
    export const all: (pred: (x: any) => boolean) => (xs: string | any[]) => boolean;

    export const none: (pred: (x: any) => boolean) => (xs: string | any[]) => boolean;
    export const or: (xs: boolean[]) => boolean;
    export const and: (xs: boolean[]) => boolean;

    export const sum: (xs: number[]) => number;
    export const product: (xs: number[]) => number;
    export const mean: (xs: number[]) => number;
    export const median = (xs: number[]) => number;
    export const sumBy: (fn: (x: any) => number) =>  (xs: any[]) => number;
    export const meanBy: (fn: (x: any) => number) =>  (xs: any[]) => number;
    export const medianBy = (fn: (x: any) => number) =>  (xs: any[]) => number;
    
    export const maximum: { (xs: string): string; <T>(xs: T[]): T; };
    export const minimum: { (xs: string): string; <T>(xs: T[]): T; };

    export const maxLen: {(xss: string[]): number; <T>(xss: T[][]): number;};
    export const minLen: {(xss: string[]): number; <T>(xss: T[][]): number;};

    export const uniq: { (xs: string): boolean; <T>(xs: T[]): boolean; };

    export const countElem: (e: any) => (xs: string | any[]) => number;
    export const countSeq: (xs: string | any[]) =>(ys: string | any[]) => number;
    export const toObj = (xss: any[][]) => Object;


/////////////////////////////////////////////////////////////////////////////////////

// Building lists
    export const scanl: <TRes>(fn: (z: any, x: any, ind: number) => TRes) => (z: any) => (xs: string | any[]) => TRes[];
    export const scanr: <TRes>(fn: (x: any, z: any, ind: number) => TRes) => (z: any) => (xs: string | any[]) => TRes[];
    export const scanl1: <TRes>(fn: (z: any, x: any, ind: number) => TRes) => (xs: string | any[]) => TRes[];
    export const scanr1: <TRes>(fn: (x: any, z: any, ind: number) => TRes) => (xs: string | any[]) => TRes[];

    export const iterate: (npred: number|((x: any)=> boolean))=> (fn: (x: any, ind: number)=> any) => (x: any)=> any[];
    export const untilA: (pred: ((x: any) => boolean)) => (fn: (x: any) => any) => (x: any) => any[];
    export const times = (n: number) => (fn: (x: any) => any) => any;
    
    export const repeat: (n: number, x: any) => any;
    export const replicate: (n: number, x: any) => any;
    export const cycle: (n: number, xs: string | any[]) => any;

    export const from: {
        (first: number, n: number, step?: number): number[];
        (first: string, n: number, step?: number): string;
    };

    export const range: {
        (first: number, last: number, step?: number): number[];
        (first: string, last: string, step?: number): string;
    };

    export const keys: (x: Object) => any[];
    export const values: (x: Object) => any[];
    export const entries: (x: Object) => any[][];


/////////////////////////////////////////////////////////////////////////////////

// Sublists
    export const take: (n: number) => (xs: string | any[]) => string | any[];
    export const drop: (n: number) => (xs: string | any[]) => string | any[];
    export const takeLast: (n: number) => (xs: string | any[]) => string | any[];
    export const dropLast: (n: number) => (xs: string | any[]) => string | any[];
    export const takeFrom: (ind: number) => (n: number) => (xs: string | any[]) => string | any[];
    export const splitAt: (n: number) => (xs: string | any[]) => any[];

    export const takeWhile: (pred: (x: any, ind: number) => boolean) => (xs: string | any[]) => string | any[];
    export const dropWhile: (pred: (x: any, ind: number) => boolean) => (xs: string | any[]) => string | any[];
    export const span: (pred: (x: any, ind: number) => boolean) => (xs: string | any[]) => any[];

    export const takeLastWhile: (pred: (x: any, ind: number) => boolean) => (xs: string | any[]) => string | any[];
    export const dropLastWhile: (pred: (x: any, ind: number) => boolean) => (xs: string | any[]) => string | any[];
    export const spanLast: (pred: (x: any, ind: number) => boolean) => (xs: string | any[]) => any[];

    export const nths = (n: number, start?: number) => (xs: string | any[]) => string | any[];
    export const inits: { (xs: string): string[]; <T>(xs: T[]): T[][]; };
    export const tails: { (xs: string): string[]; <T>(xs: T[]): T[][]; };

        
///////////////////////////////////////////////////////////////////////////////

// Searching
    export const elem: (x: any) => (xs: string | any[]) => boolean;
    export const notElem: (x: any) => (xs: string | any[]) => boolean;
    export const elemSorted: (x: any) => (xs: string | any[]) => boolean;

    export const startsWith: (xs: string|any[]) => (ys: string | any[]) => boolean;
    export const endsWith: (xs: string|any[]) => (ys: string | any[]) => boolean;    
    export const seq: (xs: string|any[]) => (ys: string | any[]) => boolean;

    export const find: (pred: (x: any) => boolean) => (xs: string | any[]) => any;
    export const filter: (pred: (x: any) => boolean) => <T>(xs: string | T[]) => string | T[];
    export const reject: (pred: (x: any) => boolean) => (xs: string | any[]) => any[];
    export const findLast: (pred: (x: any) => boolean) => (xs: string | any[]) => any;
    export const partition: (pred: (x: any) => boolean) => (xs: string | any[]) => any[];


///////////////////////////////////////////////////////////////////////////////

// Indexing
    export const elemIndex: (e: any) => (xs: string | any[]) => number;
    export const elemIndices: (e: any) => (xs: string | any[]) => number[];
    export const elemIndexLast: (e: any) => (xs: string | any[]) => number;
    export const findIndex: (pred: (x: any, ind: number) => boolean) => (xs: string | any[]) => number;
    export const findIndices: (pred: (x: any, ind: number) => boolean) => (xs: string | any[]) => number[];
    export const findIndexLast: (pred: (x: any, ind: number) => boolean) => (xs: string | any[]) => number;

    export const elemIndexSorted: (e: any) => (xs: string | any[]) => number;

    export const seqIndex: (xs: string| any[]) => (ys: string | any[]) => number;
    export const seqIndices: (xs: string| any[]) => (ys: string | any[]) => number[];


///////////////////////////////////////////////////////////////////////////////

// Zipping
    export const zip: (xs: string | any[]) => (ys: string | any[]) => any[];
    export const zipWith: (fn: (x: any, y: any, ind: number)=> any)=> (xs: string | any[])=>(ys: string | any[])=> any;

    export const unzip: {(xss: string[]): any[]; <T>(xss: T[][]): T[][];};
    export const transpose: {(xss: string[]): any[]; <T>(xss: T[][]): T[][];};
    export const tpLongest: {(xss: string[]): any[]; <T>(xss: T[][]): T[][];};
    export const rotateL: {(xss: string[]): any[]; <T>(xss: T[][]): T[][];};
    export const rotateR: {(xss: string[]): any[]; <T>(xss: T[][]): T[][];};
    

///////////////////////////////////////////////////////////////////////////////

// Special lists
    export const lines: (str: string) => string[];
    export const words: (str: string) => string[];
    export const chars: (str: string) => string[];
    export const split: (sep: string) => (str: string) => string[];
    export const toLower: (str: string) => string;
    export const toUpper: (str: string) => string;
    export const trim: (str: string) => string;
    export const ord: (chr: string) => number;
    
    export const unlines: (arr: string[]) => string;
    export const unwords: (arr: string[]) => string;
    export const unchars: (arr: string[]) => string;
    export const join: (sep: string) => (arr: string[]) => string;
    export const chr: (ord: number) => string;

    export const upper = (c: string) => boolean;
    export const lower = (c: string) => boolean;
    export const alpha = (c: string) => boolean;
    export const digit = (c: string) => boolean;
    export const space = (c: string) => boolean;
    export const alnum = (c: string) => boolean;
    

///////////////////////////////////////////////////////////////////////////////////

// Deleting
    export const del: (e: any) => (xs: string | any[]) => string | any[];
    export const delAll: (e: any) => (xs: string | any[]) => string | any[];
    export const deleteSeq: (seq: string | any[]) => (xs: string | any[]) => string | any[];
    export const deleteSeqAll: (seq: string | any[]) => (xs: string | any[]) => string | any[];
    export const deleteAt: (ind: number) => (xs: string | any[]) => any;
    export const deleteFrom: (ind: number) => (n: number) => (xs: string | any[]) => any;

    export const deleteIndices: (indices: number[]) => (xs: string | any[]) => string | any[];
    export const keepIndices: (indices: number[]) => (xs: string | any[]) => string | any[];

    export const replace: (e: any) => (toIns: any) => (xs: string | any[]) => any;
    export const replaceAll: (e: any) => (toIns: any) => (xs: string | any[]) => any;
    export const replaceSeq: (seq: string | any[]) => (toIns: string | any[]) => (xs: string | any[]) => any[];
    export const replaceSeqAll: (seq: string | any[]) => (toIns: string | any[]) => (xs: string | any[]) => any[];
    export const replaceAt: (ind: number) => <T1>(toIns: T1) => <T2>(xs: string | T2[]) => any; 
    export const replaceFrom: (ind: number) => (n: number) => <T1>(xs: string | T1[]) => 
                                                            <T2>(xs: string | T2[]) => any;
    export const insertAt: (ind: number) => (e: any) => (xs: string | any[]) => any;
    export const insertSeqAt: (ind: number) => (seq: string | any[]) => (xs: string | any[]) => any;


///////////////////////////////////////////////////////////////////////////////////

// Set operations
    export const nub: { (xs: string): any; <T>(xs: T[]): T[]; };

    export const minus: {
        (xs: string): (ys: string | any[]) => any;
        <T1>(xs: T1[]): (ys: string | any[]) => T1[];
    };
    
    export const deleteAll: (xs: any) => (ys: string | any[]) => any;
    export const keepAll: (xs: any) => (ys: string | any[]) => any;

    export const intersect: {
        (xs: string): (ys: string | any[]) => any;
        <T1>(xs: T1[]): (ys: string | any[]) => T1[];
    };

    export const difference: {
        (xs: string): (ys: string | any[]) => any;
        <T1>(xs: T1[]): (ys: string | any[]) => T1[];
    };

    export const union: {
        (xs: string): (ys: string | any[]) => any;
        (xs: any[]): (ys: string | any[]) => any[];
    };
    
    export const nubSorted: { (xs: string): any; <T>(xs: T[]): T[]; };

    export const minusSorted: {
        (xs: any): (ys: string | any[]) => any;
        <T1>(xs: T1[]): (ys: string | any[]) => T1[];
    };

    export const deleteAllSorted: (xs: any) => (ys: string | any[]) => any;
    export const keepAllSorted: (xs: any) => (ys: string | any[]) => any;

    export const intersectSorted: {
        (xs: string): (ys: string | any[]) => any;
        <T1>(xs: T1[]): (ys: string | any[]) => T1[];
    };

    export const differenceSorted: {
        (xs: string): (ys: string | any[]) => any;
        <T1>(xs: T1[]): (ys: string | any[]) => T1[];
    };

    export const unionSorted: {
        (xs: string): (ys: string | any[]) => any;
        (xs: any[]): (ys: string | any[]) => any[];
    };


///////////////////////////////////////////////////////////////////////////////////

// Sorting
    export const asc = (fn: (x: any) => any) => (x: any, y: any) => number;
    export const desc = (fn: (x: any) => any) => (x: any, y: any) => number;
    export const cmp = (...fns: ((x: any, y: any) => number)[]) => (x: any, y: any) => number;

    export const sort: { (xs: string): string; <T>(xs: T[]): T[]; };
    export const sortDesc: { (xs: string): string; <T>(xs: T[]): T[]; };

    export const sortBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                                                     (xs: string | any[]) => any;
    export const sortDescBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                                                     (xs: string | any[]) => any;

    export const sortN: { (n: number) : (xs: string) => string; <T>(n: number) :(xs: T[]) => T[]; };
    export const sortNDesc: { (n: number) : (xs: string) => string; <T>(n: number) :(xs: T[]) => T[]; };
    export const sortNBy: (n: number) => (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                                                    (xs: string | any[]) => any;
    export const sortNDescBy: (n: number) => (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                                                    (xs: string | any[]) => any;
                                                                                     
    export const merge: {
        (xs: string): (ys: string | any[]) => any;
        <T1>(xs: T1[]): (ys: string | any[]) => T1[];
    };

    export const insert: (e: any) => (xs: string | any[]) => any;
    export const mergeBy: (fn: (x: any) => number | string) =>(xs: string | any[]) => (ys: string | any[]) => any;
    export const insertBy: (fn: (x: any) => number | string) => (e: any) => (xs: string | any[]) => any;

    export const maxBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                                                    (x: any, y: any) => any;
    export const minBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                                                    (x: any, y: any) => any;
    export const maximumBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                                                    (xs: string | any[]) => any;
    export const minimumBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                                                    (xs: string | any[]) => any;

    export const ordered = (xs: string | any[]) => boolean;
    export const orderedBy = (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                                                  (xs: string | any[]) => boolean;
    

///////////////////////////////////////////////////////////////////////////////////

// The "By" operations
    export const nubBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => any;
    export const minusBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => (ys: string | any[]) => any;
    export const deleteAllBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => (ys: string | any[]) => any;
    export const keepAllBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => (ys: string | any[]) => any;
    export const intersectBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => (ys: string | any[]) => any;
    export const differenceBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => (ys: string | any[]) => any;
    export const unionBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => (ys: string | any[]) => any;

    export const uniqBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => boolean;
    export const elemBy = (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => boolean;

    export const groupBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => any[];
    export const countBy: (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => any[];

    export const grouppBy: (fn: (x: any) => number | string) => (xs: string | any[]) => any[];

    export const groupOBy = (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => Object;
    export const countOBy = (fn: ((x: any, y: any) => number) | ((x: any) => number | string)) =>
                                                        (xs: string | any[]) => Object;

}

