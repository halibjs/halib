const { foldl, foldr, foldl1, foldr1, any, all, none, or, and, sum, product, mean, median, sumBy,
        meanBy, medianBy, maximum, minimum, maxLen, minLen, uniq, countElem, countSeq, toObj } = require('./halib.js');
const { toUpper, id, add, sub } = require('./halib.js');

describe('Reducing lists:', () => {
    describe('foldl', () => {
        it('reduces an array/string using a function and an initial value, starting from left', () => {
            expect(foldl(add)(0)([1,2,3,4])).toEqual(10);
            expect(foldl(sub)(10)([1,2,3,4])).toEqual(0);
        });
        
        it('returns initial value when given an empty array/string', () => { 
            expect(foldl(add)(0)([])).toEqual(0);
        });
    });
        
    describe('foldr', () => {
        it('reduces an array/string using a function and an initial value, starting from right', () => {
            expect(foldr(add)(0)([1,2,3,4])).toEqual(10);
            expect(foldr(sub)(10)([1,2,3,4])).toEqual(8);
        });
        
        it('returns initial value when given an empty array/string', () => { 
            expect(foldr(add)(0)([])).toEqual(0);
        });
    });
        
    describe('foldl1', () => {
        it('reduces an array/string using a function, starting from left', () => {
            expect(foldl1(add)([1,2,3,4])).toEqual(10);
            expect(foldl1(sub)([1,2,3,4])).toEqual(-8);
        });
        
        it('returns undefined when given an empty list', () => { 
            expect(foldl1(add)([])).toEqual(undefined);
        });
    });

    describe('foldr1', () => {
        it('reduces an array/string using a function, starting from right', () => {
            expect(foldr1(add)([1,2,3,4])).toEqual(10);
            expect(foldr1(sub)([1,2,3,4])).toEqual(-2);
        });
        
        it('returns undefined when given an empty array/string', () => { 
            expect(foldr1(add)([])).toEqual(undefined);
        });
    });

    const eq3 = x => x === 3;
    const eqa = x => x === 'a';
    describe('any', () => {           
        it('returns true if one element of an array/string satisfies a predicate', () => {           
            expect(any(eq3)([1,2,3])).toEqual(true);
            expect(any(eqa)('abc')).toEqual(true);
        });
        
        it('returns false if no elements of an array/string satisfy a predicate', () => {           
            expect(any(eq3)([1,2])).toEqual(false);
            expect(any(eqa)('bc')).toEqual(false);
        });
        
        it('returns false if the supplied array/string is empty', () => { 
            expect(any(eq3) ([])).toEqual(false);
            expect(any(eqa)('')).toEqual(false);
        });
    });
    
    describe('all', () => {
        it('returns true if every element of an array/string satisfies a predicate', () => {
            expect(all(eq3) ([3,3,3])).toEqual(true);
            expect(all(eqa) ('aaa')).toEqual(true);
        });
        
        it('returns false if any element of an array/string fails to satisfy a predicate', () => {
            expect(all(eq3) ([3,2,3])).toEqual(false);
            expect(all(eqa) ('aba')).toEqual(false);
        });
        
        it('returns true if the supplied array/string is empty', () => {
            expect(all(eq3) ([])).toEqual(true);
            expect(all(eqa) ('')).toEqual(true);
        });
    });
    
    describe('none', () => {
        it('returns true if no element of an array/string satisfies a predicate', () => {
            expect(none(eq3) ([1,2])).toEqual(true);
            expect(none(eqa) ('bc')).toEqual(true);
        });
        
        it('returns true if the supplied array/string is empty', () => {
            expect(none(eq3) ([])).toEqual(true);
            expect(none(eqa) ('')).toEqual(true);
        });
    });
    
    describe('or', () => {
        it('returns true if any element of a given array/string is truthy', () => {
            expect(or([true, false, false])).toEqual(true);
            expect(or([false, false, false])).toEqual(false);
            expect(or([1, 0, 0])).toEqual(true);
            expect(or([0, 0, 0])).toEqual(false);
        });
    });

    describe('and', () => {
        it('returns true if all elements of a given array/string is truthy', () => {
            expect(and([true, true, true])).toEqual(true);
            expect(and([true, false, true])).toEqual(false);
            expect(and([1, 2, 3])).toEqual(true);
            expect(and([0, 2, 3])).toEqual(false);
        });
    });    
    
    describe('sum', () => {
        it('adds together the elements of an array', () => {
            expect(sum([1,2,3])).toEqual(6);
        });
        
        it('returns 0 when given an empty array ', () => {
            expect(sum([])).toEqual(0);
        });
    });

    describe('product', () => {
        it('multiplies the elements of a numeric array', () => {
            expect(product([2,3,4])).toEqual(24);
        });
        
        it('returns 1 when given an empty array', () => {
            expect(product([])).toEqual(1);
        });
    });

    describe('mean', () => {
        it('returns the average of the elements of a numeric array', () => {
            expect(mean([2,3,4])).toEqual(3);
        });
        
        it('returns NaN when given an empty array ', () => {
            expect(mean([])).toBeNaN(NaN);
        });
    });

    describe('median', () => {
        it(`sorts xs and returns the element at middle index. If the length of xs is even, returns the avarage of
            the two elements at the middle index.`, () => {
            expect(median([5,1,3,2,4])).toEqual(3);
            expect(median([5,1,2,4])).toEqual(3);
        });
        
        it('returns NaN when given an empty array ', () => {
            expect(mean([])).toBeNaN(NaN);
        });
    });

    describe('sumBy', () => {
        it('adds together the elements of an array using the given function', () => {
            expect(sumBy(Math.abs)([-1,1,-2])).toEqual(4);
            expect(sumBy(obj => obj.a)([{a: 1}, {a:2}])).toEqual(3);
        });
        
        it('returns NaN when given an empty array ', () => {
            expect(sumBy(Math.abs)([])).toEqual(0);
        });
    });

    describe('meanBy', () => {
        it('returns the average of the elements of a numeric array using the given function', () => {
            expect(meanBy(Math.abs)([-1,1,-7])).toEqual(3);
            expect(meanBy(obj => obj.a)([{a: 1}, {a:3}])).toEqual(2);
        });
        
        it('returns NaN when given an empty array ', () => {
            expect(meanBy(Math.abs)([])).toBeNaN(NaN);
        });
    });

    describe('medianBy', () => {
        it('analogous to median but uses fn to sort xs.', () => {
            expect(medianBy(id)([5,1,3,2,4])).toEqual(3);
            expect(medianBy(id)([5,1,2,4])).toEqual(3);
        });
        
        it('returns NaN when given an empty array ', () => {
            expect(mean([])).toBeNaN(NaN);
        });
    });
    
    describe('maximum', () => {
        it('returns the largest element in an array/string', () => {          
            expect(maximum([1,2,3])).toEqual(3);
            expect(maximum('abc')).toEqual('c');
            expect(maximum([[1,2],[1,4],[1,3]])).toEqual([1,4]);
        });
                
        it('throws an error given an empty array/string', () => { 
            expect(maximum([])).toEqual(undefined);
            expect(maximum('')).toEqual(undefined);
        });
    });
    
    describe('minimum', () => {
        it('returns the smallest element in an array/string', () => {          
            expect(minimum([1,2,3])).toEqual(1);
            expect(minimum('abc')).toEqual('a');
            expect(minimum([[1,4],[1,2],[1,3]])).toEqual([1,2]);
        });
                
        it('throws an error given an empty array/string', () => { 
            expect(minimum([])).toEqual(undefined);
            expect(minimum('')).toEqual(undefined);
        });
    }); 

    describe('minLen', () => {
        const list1 = [[1,2,3], [1,2],[1,2,3,4]];
        const list2 = ['abc', 'ab', 'abcd'];
        it('returns the length of the shortest element array/string of the given matrix', () => {
            expect(minLen (list1)).toEqual(2);
            expect(minLen (list2)).toEqual(2);
        });
    });
    
    describe('maxLen', () => {
        const list1 = [[1,2,3], [1,2],[1,2,3,4]];
        const list2 = ['abc', 'ab', 'abcd'];
        it('returns the length of the longest element array/string of the given matrix', () => {
            expect(maxLen (list1)).toEqual(4);
            expect(maxLen (list2)).toEqual(4);
        });
    });
    
    describe('uniq', () => {
        const list1 = [1,2,5,3];
        const list2 = [1,2,5,3,5];
        const list3 = [[1,2,3], [1,2],[1,2,3,4]];
        const list4 = [[1,2,3], [1,2],[1,2,3,4], [1,2]];
        const list5 = 'abc';
        const list6 = 'abcb';
        const list7 = ['a', 'b', 'c'];
        const list8 = ['a', 'b', 'c', 'b'];
        const list9 = ['abc', 'ab', 'abcd'];
        const list10 = ['abc', 'ab', 'abcd', 'ab'];
        it('returns true if the given array/string is uniq', () => {
            expect(uniq (list1)).toEqual(true);
            expect(uniq (list2)).toEqual(false);
            expect(uniq (list3)).toEqual(true);
            expect(uniq (list4)).toEqual(false);
            expect(uniq (list5)).toEqual(true);
            expect(uniq (list6)).toEqual(false);
            expect(uniq (list7)).toEqual(true);
            expect(uniq (list8)).toEqual(false);
            expect(uniq (list9)).toEqual(true);
            expect(uniq (list10)).toEqual(false);
        });
        
        it('returns true if given an empty list', () => {
            expect(uniq ([])).toEqual(true);
            expect(uniq ('')).toEqual(true);
        });
    });

    describe('countElem', () => {
        it('counts the occurences of an element in an array/string', () => {          
            expect(countElem(1) ([1,2,3,1])).toEqual(2);
            expect(countElem('a') ('aba')).toEqual(2);
        });
    }); 

    describe('countSeq', () => {
        it('counts the occurences of a sequence of elements in an array/string', () => {          
            expect(countSeq([1,2]) ([1,2,3,1,2])).toEqual(2);
            expect(countSeq('ab') ('abcab')).toEqual(2);
        });
    }); 

    describe('toObj', () => {
        it('creates an object from the given two dimensional array', () => {          
            expect(toObj([['a', 1],['b',2]])).toEqual({a:1,b:2});
        });
    }); 
});
