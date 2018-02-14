const { cp, chain, append, head, last, init, tail, nul, len, copy, cons, consR, uncons, nth, each, id,
         flip, not, iter, until, equal, eq, equalBy } = require('./halib.js');
const { inc, sq, sub } = require('./halib.js'); // helper funtions



describe('Basic functions:', () => {        
    describe('cp', () => {
        it('performs right-to-left function composition. All functions (even the rightmost one) must be unary.', () => {
            expect(cp(sub(20), sq, inc)(3)).toEqual(sub(20)(sq(inc(3))));
            expect(cp(sub(20), sq, inc)(3)).toEqual(4);
        });
    });

    describe('chain', () => {
        it('performs top-to-down function composition. All functions (even the topmost one) must be unary.', () => {
            expect(chain(inc, sq, sub(20))(3)).toEqual(sub(20)(sq(inc(3))));
            expect(chain(inc, sq, sub(20))(3)).toEqual(4);
        });
    });
    
    describe('append', () => {
        it('combines two arrays/strings', () => {
            expect(append([1,2,3]) ([4,5,6])).toEqual([1,2,3,4,5,6]);
            expect(append('abc') ('def')).toEqual('abcdef');
        });

        it('if args are mixed type (string/array), string arg is treated as array', () => {
            expect(append([1,2,3]) ('abc')).toEqual([1,2,3,'a','b','c']);
            expect(append('abc') ([1,2,3])).toEqual(['a','b','c',1,2,3]);
            expect(append([1,2,3]) ('')).toEqual([1,2,3]);
            expect(append('abc') ([])).toEqual(['a','b','c']);
            expect(append('') ([1,2,3])).toEqual([1,2,3]);
            expect(append([]) ('abc')).toEqual(['a','b','c']);
            expect(append('') ([])).toEqual([]);
            expect(append([]) ('')).toEqual([]);
        });
        
        it('one or both args can be empty', () => {
            expect(append([1,2,3]) ([])).toEqual([1,2,3]);
            expect(append([]) ([4,5,6])).toEqual([4,5,6]);
            expect(append([]) ([])).toEqual([]);
            expect(append('abc') ('')).toEqual('abc');
            expect(append('') ('def')).toEqual('def');
            expect(append('') ('')).toEqual('');
        });
    });
    
    describe('head', () => {
        it('returns the first element of an array/string', () => {
            expect(head([1, 2, 3])).toEqual(1);
            expect(head('abc')).toEqual('a');
        });
        
        it('can be given a one-element array/string', () => {
            expect(head([4])).toEqual(4);
            expect(head('d')).toEqual('d');
        });
        
        it('returns undefined given an empty array/string', () => {
            expect(head([])).toEqual(undefined);
            expect(head('')).toEqual(undefined);
        });
    });
    
    describe('last', () => {
        it('returns the last element of an array/string', () => {
            expect(last([1, 2, 3])).toEqual(3);
            expect(last('abc')).toEqual('c');
        });
        
        it('can be given a one-element array/string', () => {
            expect(last([4])).toEqual(4);
            expect(last('d')).toEqual('d');
        });
        
        it('returns undefined given an empty array/string', () => { 
            expect(last([])).toEqual(undefined);
            expect(last('')).toEqual(undefined);
        });
    });
    
    describe('init', () => {
        it('returns everything from an array/string but the last element', () => {
            expect(init([1, 2, 3, 4])).toEqual([1, 2, 3]);
            expect(init('abcd')).toEqual("abc");
        });
        
        it('returns an empty array/string given a one-element array/string', () => { 
            expect(init([4])).toEqual([]);
            expect(init('d')).toEqual('');
        });
        
        it('returns an empty array/string given an empty array/string', () => { 
            expect(init([])).toEqual([]);
            expect(init('')).toEqual('');
        });
    });
    
    describe('tail', () => {
        it('returns everything from an array/string but the first element', () => { 
            expect(tail([1, 2, 3, 4])).toEqual([2, 3, 4]);
            expect(tail('abcd')).toEqual('bcd');
        });
        
        it('returns an empty array/string given a one-element array/string', () => { 
            expect(tail([4])).toEqual([]);
            expect(tail('d')).toEqual('');
        });
        
        it('returns an empty array/string given an empty array/string', () => { 
            expect(tail([])).toEqual([]);
            expect(tail('')).toEqual('');
        });
    });
    
    describe('nul', () => {
        it('returns true when given an empty array/string, false otherwise', () => { 
            expect(nul([])).toEqual(true);
            expect(nul('')).toEqual(true);
            expect(nul([1,2,3])).toEqual(false);
            expect(nul('abc')).toEqual(false);
            expect(nul([4])).toEqual(false);
            expect(nul('d')).toEqual(false);
        });
    });

    describe('len', () => {
        it('returns the length of an array/string', () => {               
            expect(len([1,2,3])).toEqual(3);
            expect(len('abc')).toEqual(3);
            expect(len([4])).toEqual(1);
            expect(len('d')).toBe(1);
            expect(len([])).toEqual(0);
            expect(len('')).toBe(0);
        });
    });

    describe('copy', () => {
        it('clones the given array/string one level deep.', () => {               
            expect(copy([1,2,3])).toEqual([1,2,3]);
            expect(copy('abc')).toEqual(['a','b','c']);
        });
    });
    
    describe('cons', () => {
        it('adds an element to the front of a array/string', () => { 
            expect(cons(1) ([2, 3])).toEqual([1,2,3]);
            expect(cons('a') ('bc')).toEqual('abc');
        });
        
        it('added element can be an array/string ', () => { 
            expect(cons([1]) ([2, 3])).toEqual([[1], 2, 3]);
            expect(cons('abc') ('def')).toEqual('abcdef');
        });
        
        it('second arg can be an empty array/string', () => { 
            expect(cons(1) ([])).toEqual([1]);
            expect(cons([1]) ([])).toEqual([[1]]);
            expect(cons('a') ('')).toEqual('a');
            expect(cons('ab') ('')).toEqual('ab');
        });
        
        it('string can be added to an array', () => { 
            expect(cons('a') ([1,2])).toEqual(['a', 1,2]);
            expect(cons('abc') ([1,2])).toEqual(['abc', 1,2]);
            expect(cons('a') ([])).toEqual(['a']);
        });

        it('not string can be added to string', () => { 
            expect(cons(1) ('abc')).toEqual('1abc');
        });
    });
    
    describe('consR', () => {
        it('adds an element to the end of the array/string', () => { 
            expect(consR([1,2])(3)).toEqual([1,2,3]);
            expect(consR('ab')('c')).toEqual('abc');
        });
        
        it('added element can be an array/string ', () => { 
            expect(consR([1,2])([3])).toEqual([1,2,[3]]);
            expect(consR('abc')('def')).toEqual('abcdef');
        });
        
        it('first arg can be an empty array/string', () => { 
            expect(consR([])(1)).toEqual([1]);
            expect(consR([])([1])).toEqual([[1]]);
            expect(consR('') ('a')).toEqual('a');
            expect(consR('') ('ab')).toEqual('ab');
        });
        
        it('string can be added to an array', () => { 
            expect(consR([1,2])('a')).toEqual([1,2,'a']);
            expect(consR([1,2])('abc')).toEqual([1,2,'abc']);
            expect(consR([])('a')).toEqual(['a']);
        });
        
        it('not string can be added to string', () => { 
            expect(consR ('abc')(1)).toEqual('abc1');
        });       
    });
    
    describe('uncons', () => {
        it('decomposes an array/string into head and tail', () => { 
            expect(uncons([1,2,3])).toEqual([1,[2,3]]);
            expect(uncons('abc')).toEqual(['a', 'bc']);
        });
        
        it('arg can be a one-element array/string', () => { 
            expect(uncons([4])).toEqual([4,[]]);
            expect(uncons('d')).toEqual(['d', '']);
        });
        
        it('returns undefined given an empty array/string', () => { 
            expect(uncons([])).toEqual([undefined,[]]);
            expect(uncons('')).toEqual([undefined, '']);
        });
    });

    describe('nth', () => {
        it('returns the element at the given index from an array/string ', () => {
            expect(nth (1) ([1,2,3])).toEqual(2);
            expect(nth (1) ('abc')).toEqual('b');
        });

        it('given a negative index returns the nth element from the end', () => {
            expect(nth (-1) ([1,2,3])).toEqual(3);
            expect(nth (-1) ('abc')).toEqual('c');
        });
    });
    
    describe('each', () => {
        it('calls the given function with each element of an array/string, returns the given array/string,' +
           'is used for its side effect', () => {
            const list = [];
            expect(each (x => list.push(x)) ([1,2,3])).toEqual([1,2,3]);
        });
    });

    describe('id', () => {
        it('returns the given parameter.', () => {
            const obj = { a: 1 };
            const arr = [1, 2, 3];
                
            expect(id(1)).toEqual(1);
            expect(id("foo")).toEqual("foo");
            expect(id(obj)).toBe(obj);
            expect(id(arr)).toBe(arr);
        });
    });

    describe('flip', () => {
        it('invokes the given function with parameters reversed.', () => {             
            expect(flip(sub) (1)(4)).toEqual(3);
        });
    });
    
    describe('not', () => {
        it('returns the inverted value of the given boolean parameter.', () => {             
            expect(not(true)).toEqual(false);
        });
    });

    describe('iter', () => {
        it('if a number is given as the first parameter, returns a value resulting from repeated application of' +
           'the supplied function.', () => {                
            expect(iter(3)(inc)(5)).toEqual(8);
        });

        it('if a predicate is given as the first parameter, returns a value resulting from' +
           'the repeated application of the supplied function that satisfy predicate.', () => {
            const lt100 = r => (2 * r * Math.PI) < 100;
                
            expect(iter(lt100)(inc)(5)).toEqual(15);
        });

        it('returns the supplied value' + 
           'when a less-than-one value given as first arg', () => {                
            expect(iter(0)(inc)(5)).toEqual(5);
        });
        
        it('returns undefined if the predicate is not satisfied at least once', () => {
            const lt10 = x => x < 10;
                
            expect(iter(lt10)(inc)(15)).toEqual(undefined);
        });
    });

    describe('until', () => {
        it(`Returns a value resulting from the repeated application of the supplied function
            until the given predicate is satisfied`, () => {
            const gt100 = r => (2 * r * Math.PI) > 100;

            expect(until(gt100)(inc)(5)).toEqual(16);
        });
    });

    describe('equal', () => {
        it('Performs a deep equality test', () => {  
            expect(equal([1,2,3], [1,2,3])).toEqual(true);
            expect(equal([1,2,[3]], [1,2,[3]])).toEqual(true);
            expect(equal([1,2,3], [1,2,3,4])).toEqual(false);
            expect(equal([1,{a:[2]}], [1,{a:[2]}])).toEqual(true);
            expect(equal(1, 1)).toEqual(true);
            expect(equal(1, 2)).toEqual(false);
            expect(equal('a', 'a')).toEqual(true);
            expect(equal('a', 'b')).toEqual(false);
            expect(equal('abc', 'abc')).toEqual(true);
            expect(equal('abc', 'abcd')).toEqual(false);
        });
    });

    describe('eq', () => {
        it('Performs a deep equality test', () => {  
            expect(eq([1,2,3])([1,2,3])).toEqual(true);
            expect(eq([1,2,[3]])([1,2,[3]])).toEqual(true);
            expect(eq([1,2,3])([1,2,3,4])).toEqual(false);
            expect(eq([1,{a:[2]}])([1,{a:[2]}])).toEqual(true);
            expect(eq(1)(1)).toEqual(true);
            expect(eq(1)(2)).toEqual(false);
            expect(eq('a')('a')).toEqual(true);
            expect(eq('a')('b')).toEqual(false);
            expect(eq('abc')('abc')).toEqual(true);
            expect(eq('abc')('abcd')).toEqual(false);
        });
    });

    describe('equalBy', () => {
        it('Performs a deep equality test using fn.', () => {
            expect(equalBy(id) ([1,2,3], [1,2,3])).toEqual(true);
            expect(equalBy(id)([1,2,[3]], [1,2,[3]])).toEqual(true);
            expect(equalBy(id)([1,2,3], [1,2,3,4])).toEqual(false);
            expect(equalBy(id)([1,{a:[2]}], [1,{a:[2]}])).toEqual(true);
        });
    });
});
