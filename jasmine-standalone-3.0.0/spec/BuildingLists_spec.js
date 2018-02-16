//const { scanl, scanr, scanl1, scanr1, iterate, untilA, times, repeat, replicate, cycle, from, range,
//        keys, values, entries } = require('./halib.js');
//const { add, sub, last, head, foldl, foldl1, foldr1, inc } = require('./halib.js');



describe('Building lists:', () => { 
    describe('scanl', () => {
        it('returns an array of continuous folded values from the left', () => { 
            expect(scanl(add)(0)([1,2,3,4])).toEqual([0,1,3,6,10]);
            expect(scanl(sub)(10)([1,2,3,4])).toEqual([10,9,7,4,0]);
        });
        
        it ('the last element given by scanl should be the result of foldl', () => { 
            expect(last(scanl(add)(0)([1,2,3,4]))).toEqual(foldl(add)(0)([1,2,3,4]));
        });
        
        it('returns an array with initial value when given an empty list', () => { 
            expect(scanl(add)(0)([])).toEqual([0]);
        });
    });

    describe('scanr', () => {
        it('returns an array of continuous folded values from the right', () => { 
            expect(scanr(add)(0)([1,2,3,4])).toEqual([10,9,7,4,0]);
            expect(scanr(sub)(10)([1,2,3,4])).toEqual([8,-7,9,-6,10]);
        });
        
        it ('the head element given by scanr should be the result of foldl', () => { 
            expect(head(scanr(add)(0)([1,2,3,4]))).toEqual(foldl(add)(0)([1,2,3,4]));
        });
        
        it('returns an array with initial value when given an empty list', () => { 
            expect(scanr(add)(0)([])).toEqual([0]);
        });
    });

    describe('scanl1', () => {
        it('returns an array of continuous folded values from the left', () => { 
            expect(scanl1(add)([1,2,3,4])).toEqual([1,3,6,10]);
            expect(scanl1(sub)([1,2,3,4])).toEqual([1,-1,-4,-8]);
        });
        
        it ('the last element given by scanl1 should be the result of foldl1', () => { 
            expect(last(scanl1(add)([1,2,3,4]))).toEqual(foldl1(add)([1,2,3,4]));
        });
        
        it('returns an array with initial value when given an empty list', () => { 
            expect(scanl1(add)([])).toEqual([]);
        });
    });

    describe('scanr1', () => {
        it('returns an array of continuous folded values from the right', () => { 
            expect(scanr1(add)([1,2,3,4])).toEqual([10,9,7,4]);
            expect(scanr1(sub)([1,2,3,4])).toEqual([-2,3,-1,4]);
        });
        
        it ('the head element given by scanr1 should be the result of foldr1', () => { 
            expect(head(scanr1(add)([1,2,3,4]))).toEqual(foldr1(add)([1,2,3,4]));
        });
        
        it('returns undefined value when given an empty array/string', () => { 
            expect(scanr1(add)([])).toEqual([]);
        });
    });
        
    describe('iterate', () => {
        it('analogous to iter, but instead of a final value it returns' +
           'x and fn application results in an array', () => {                
            expect(iterate(3)(inc)(5)).toEqual([5,6,7,8]);
        });

        it('if a predicate is given as first arg, returns an array containing values resulting from supplied value' +
           'and repeated application of the supplied function that satisfy predicate', () => {
            const under10 = x => x < 10;
                
            expect(iterate(under10)(inc)(5)).toEqual([5,6,7,8,9]);
        });

        it('returns an array containing the supplied value' + 
           'when a less-than-one value given as first arg', () => {                
            expect(iterate(0)(inc)(5)).toEqual([5]);
        });
        
        it('returns an empty array if the predicate is not satisfied at least once', () => {
            const under10 = x => x < 10;
                
            expect(iterate(under10)(inc)(15)).toEqual([]);
        });
    });

    describe('untilA', () => {
        it(`Returns an array containing values resulting from supplied value
            and repeated application of the supplied function while does not satisfy predicate`, () => {
            const eq = x => x === 3;
            expect(untilA(eq)(inc)(1)).toEqual([1,2,3]);
        });
    });

    describe('times', () => {
        it(`Calls fn with numbers ranging from 0 to n - 1 and returns the results in an array.`, () => {
            expect(times(4)(inc)).toEqual([1,2,3,4]);
        });
    });
    
    describe('repeat', () => {
        it('returns an array/string containing a specified number of supplied value', () => {
            expect(repeat(3, 5)).toEqual([5,5,5]);
            expect(repeat(3, 'a')).toEqual('aaa');
        });

        it('if the supplied value is array or object, shallow copies are created', () => {
            expect(repeat(3, [1,2])).toEqual([[1,2],[1,2],[1,2]]);
            expect(repeat(3, [1,{a:1}])).toEqual([[1,{a:1}],[1,{a:1}],[1,{a:1}]]);
            
            const arr = [1,{a:1}];
            expect(repeat(3, arr)[0][1]).toBe(arr[1]);
            expect(repeat(3, [])).toEqual([[],[],[]]);
        });

        
        it('when a less-than 1 value given as first arg an empty array/string is returned', () => {
            expect(repeat(0, 5)).toEqual([]);
            expect(repeat(0, 'a')).toEqual('');
        });
    });

    describe('replicate', () => {
        it('returns an array/string containing a specified number of supplied value', () => {
            expect(replicate(3, 5)).toEqual([5,5,5]);
            expect(replicate(3, 'a')).toEqual(['a','a','a']);
        });

        it('if the supplied value is array or object, deep copies are created', () => {
            expect(replicate(3, [1,{a:[2]}])).toEqual([[1,{a:[2]}],[1,{a:[2]}],[1,{a:[2]}]]);

            const arr = [1,{a:1}];
            expect(replicate(3, arr)[0][1]).not.toBe(arr[1]);
            expect(replicate(3, [])).toEqual([[],[],[]]);
        });

        
        it('when a less-than 1 value given as first arg an empty array/string is returned', () => {
            expect(replicate(0, 5)).toEqual([]);
            expect(replicate(0, 'a')).toEqual([]);
        });
    });
    
    describe('cycle', () => {
        it('turns a finite array/string into a circular one', () => {
            expect(cycle(7, [1,2,3])).toEqual([1,2,3,1,2,3,1]);
            expect(cycle(7, 'abc')).toEqual('abcabca');
        });
        
        it('when a smaller-than-one value given as first arg an empty array/string is returned', () => {
            expect(cycle(0, [5])).toEqual([]);
            expect(cycle(0, 'a')).toEqual('');
        });
        
        it('throws an error given an empty array/string', () => { 
            expect(cycle(2, [])).toEqual([]);
            expect(cycle(2, '')).toEqual('');
        });
    });
    
    describe('from', () => {
        it('returns an array/string of specified length starting from first parameter', () => {
            expect(from(2, 4)).toEqual([2,3,4,5]);
            expect(from('a', 4)).toEqual('abcd');
        });
        
        it('step can be supplied in third arg', () => {
            expect(from(2, 4, 2)).toEqual([2,4,6,8]);
            expect(from('a', 4, 2)).toEqual('aceg');
        });
        
        it('when given 0 value as step the step will be 1', () => {
            expect(from (2, 4, 0)).toEqual([2,3,4,5]);
            expect(from ('a', 4, 0)).toEqual('abcd');
        });
    });
    
    describe('range', () =>{
        it('returns a from (first arg incl.) to (second arg incl.) array/string', () => {
            expect(range(0, 4)).toEqual([0,1,2,3,4]);
            expect(range(4, 0)).toEqual([4,3,2,1,0]);
            expect(range('a', 'd')).toEqual('abcd');
            expect(range('d', 'a')).toEqual('dcba');
        });
        
        it('step can be supplied in third arg', () => {
            expect(range(0, 4, 2)).toEqual([0,2,4]);
            expect(range(4, 0, 2)).toEqual([4,2,0]);
            expect(range('a', 'd', 2)).toEqual('ac');
            expect(range('d', 'a', 2)).toEqual('db');
        });
        
        it('the sign of the step is ignored', () => {
            expect(range(0, 4, -2)).toEqual(range(0, 4,  2));
            expect(range(4, 0,  2)).toEqual(range(4, 0, -2));
            expect(range('a', 'd',  2)).toEqual(range('a', 'd', -2));
        });
        
        it('when given 0 value as step the step will be 1', () => {
            expect(range(0, 4, 0)).toEqual([0,1,2,3,4]);
            expect(range('a','d',0)).toEqual('abcd');
        });
    });

    describe('keys', () => {
        it(`Returns an array/string of the keys of the given object`, () => {
            expect(keys({ a: 1, b:2})).toEqual(['a','b']);
        });
    });

    describe('values', () => {
        it(`Returns an array/string of the values of the given object`, () => {
            expect(values({ a: 1, b:2})).toEqual([1,2]);
        });
    });

    describe('entries', () => {
        it(`Returns an array/string of the entries of the given object`, () => {
            expect(entries({ a: 1, b:2})).toEqual([['a',1],['b',2]]);
        });
    });
});
