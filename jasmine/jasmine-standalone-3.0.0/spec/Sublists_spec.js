//const { take, drop, takeLast, dropLast, takeFrom, splitAt, takeWhile, dropWhile, span,
//        takeLastWhile, dropLastWhile, spanLast, nths, inits, tails } = require('./halib.js');



describe('Sublists:', () => { 
    describe('take', () => {
        it('returns the first N elements from an array/string', () => { 
            expect(take(1) ([1,2,3])).toEqual([1]);
            expect(take(2) ([1,2,3])).toEqual([1,2]);
            expect(take(3) ([1,2,3])).toEqual([1,2,3]);
            expect(take(1) ('abc')).toEqual('a');
            expect(take(2) ('abc')).toEqual('ab');
            expect(take(3) ('abc')).toEqual('abc');
        });
        
        it('returns the array/string list when given an N greater than length of supplied array/string', () => {
            expect(take(4) ([1,2,3])).toEqual([1,2,3]);
            expect(take(4) ('abc')).toEqual('abc');
        });
        
        it('returns the empty array/string when asked for less than 1 elements', () => {            
            expect(take(0) ([1,2,3])).toEqual([]);
            expect(take(-1) ([1,2,3])).toEqual([]);
            expect(take(0) ('abc')).toEqual('');
            expect(take(-1) ('abc')).toEqual('');
        });
        
        it('returns the empty array/string when given an empty array/string', () => {            
            expect(take(1) ([])).toEqual([]);
            expect(take(1) ('')).toEqual('');
        });
    });

    describe('drop', () => {
        it('returns all but the first N elements from an array/string', () => { 
            expect(drop(1) ([1,2,3])).toEqual([2,3]);
            expect(drop(2) ([1,2,3])).toEqual([3]);
            expect(drop(3) ([1,2,3])).toEqual([]);
            expect(drop(1) ('abc')).toEqual('bc');
            expect(drop(2) ('abc')).toEqual('c');
            expect(drop(3) ('abc')).toEqual('');
        });
        
        it('returns the empty array/string when given an N greater than length of supplied array/string', () => {
            expect(drop(4) ([1,2,3])).toEqual([]);
            expect(drop(4) ('abc')).toEqual('');
        });
        
        it('returns the entire array/string when first arg is less than 1', () => {            
            expect(drop(0) ([1,2,3])).toEqual([1,2,3]);
            expect(drop(-1) ([1,2,3])).toEqual([1,2,3]);
            expect(drop(0) ('abc')).toEqual('abc');
            expect(drop(-1) ('abc')).toEqual('abc');
        });
        
        it('returns the empty array/string when given an empty array/string', () => {            
            expect(drop(1) ([])).toEqual([]);
            expect(drop(1) ('')).toEqual('');
        });
    });
    
    describe('takeLast', () => {
        it('returns the last N elements from an array/string', () => { 
            expect(takeLast(1) ([1,2,3])).toEqual([3]);
            expect(takeLast(2) ([1,2,3])).toEqual([2,3]);
            expect(takeLast(3) ([1,2,3])).toEqual([1,2,3]);
            expect(takeLast(1) ('abc')).toEqual('c');
            expect(takeLast(2) ('abc')).toEqual('bc');
            expect(takeLast(3) ('abc')).toEqual('abc');
        });
        
        it('returns the entire array/string when given an N greater than length of supplied array/string', () => {
            expect(takeLast(4) ([1,2,3])).toEqual([1,2,3]);
            expect(takeLast(4) ('abc')).toEqual('abc');
        });
        
        it('returns the empty array/string when asked for less than 1 elements', () => {            
            expect(takeLast(0) ([1,2,3])).toEqual([]);
            expect(takeLast(-1) ([1,2,3])).toEqual([]);
            expect(takeLast(0) ('abc')).toEqual('');
            expect(takeLast(-1) ('abc')).toEqual('');
        });
        
        it('returns the empty array/string when given an empty array/string', () => {            
            expect(takeLast(1) ([])).toEqual([]);
            expect(takeLast(1) ('')).toEqual('');
        });
    });

    describe('dropLast', () => {
        it('returns all but the last N elements from an array/string', () => { 
            expect(dropLast(1) ([1,2,3])).toEqual([1,2]);
            expect(dropLast(2) ([1,2,3])).toEqual([1]);
            expect(dropLast(3) ([1,2,3])).toEqual([]);
            expect(dropLast(1) ('abc')).toEqual('ab');
            expect(dropLast(2) ('abc')).toEqual('a');
            expect(dropLast(3) ('abc')).toEqual('');
        });
        
        it('returns an empty array/string when given an N greater than length of supplied array/string', () => {
            expect(dropLast(4) ([1,2,3])).toEqual([]);
            expect(dropLast(4) ('abc')).toEqual('');
        });
                
        it('returns the empty array/string when given an empty array/string', () => {            
            expect(dropLast(1) ([])).toEqual([]);
            expect(dropLast(1) ('')).toEqual('');
        });
    });

    describe('takeFrom', () => {
        it('returns from the given index N elements from an array/string', () => { 
            expect(takeFrom(1)(2) ([1,2,3,4,5])).toEqual([2,3]);
            expect(takeFrom(2)(3) ('abcdefgh')).toEqual('cde');
            expect(takeFrom(0)(2) ([1,2,3])).toEqual([1,2]);
            expect(takeFrom(0)(2) ('abc')).toEqual('ab');
        });
        
        it('returns an empty array/string when index is larger than length of supplied array/string', () => {
            expect(takeFrom(4)(2) ([1,2,3])).toEqual([]);
            expect(takeFrom(4)(2) ('abc')).toEqual('');
        });
        
        it('index can be negative', () => {            
            expect(takeFrom(-2)(2) ([1,2,3])).toEqual([2,3]);
            expect(takeFrom(-1)(2) ('abc')).toEqual('c');
        });
        
        it('returns the empty array/string when given an empty array/string', () => {            
            expect(takeFrom(1)(2) ([])).toEqual([]);
            expect(takeFrom(1)(2) ('')).toEqual('');
        });
    });
        
    describe('splitAt', () => {
        it('returns a two element array resulting from take and drop', () => {           
            expect(splitAt(3) ([1,2,3,4,5,6])).toEqual([[1,2,3], [4,5,6]]);
            expect(splitAt(3) ('abcdef')).toEqual(['abc', 'def']);
        });
        
        it('returns two empty array/string in an array when given an empty array/string', () => {            
            expect(splitAt(1) ([])).toEqual([[],[]]);
            expect(splitAt(1) ('')).toEqual(['','']);
        });
    });
    
    const lt3 = x => x < 3;
    const ltc = x => x < 'c';
    describe('takeWhile', () => {
        it('returns the first N elements from an array/string that satisfy a supplied pred', () => {
            expect(takeWhile(lt3) ([1,2,3])).toEqual([1,2]);
            expect(takeWhile(ltc) ('abc')).toEqual('ab');
        });
        
        it('returns the empty array/string if the first element does not satisfy supplied pred', () => {
            expect(takeWhile(lt3)([3,4,5])).toEqual([]);
            expect(takeWhile(ltc) ('cde')).toEqual('');
        });
        
        it('returns the empty array/string when given an empty array/string', () => {            
            expect(takeWhile(lt3) ([])).toEqual([]);
            expect(takeWhile(ltc) ('')).toEqual('');
        });
    });
    
    describe('dropWhile', () => {
        it('removes the first N elements from an array/string that satisfy a given pred', () => {
            expect(dropWhile(lt3)([1,2,3])).toEqual([3]);
            expect(dropWhile(ltc)('abc')).toEqual('c');
        });
        
        it('returns the entire array/string when the first element does not satisfy predicate', () => {
            expect(dropWhile(lt3)([3,4,5])).toEqual([3,4,5]);
            expect(dropWhile(ltc)('cde')).toEqual('cde');
        });
        
        it('returns the empty array/string when given an empty array/string', () => {            
            expect(dropWhile(lt3) ([])).toEqual([]);
            expect(dropWhile(ltc) ('')).toEqual('');
        });
    });
    
    describe('span', () => {
        it('should be equivalent to [takeWhile..., dropWhile...]', () => {           
            expect(span(lt3) ([1,2,3,4,1,2])).toEqual([[1,2], [3,4,1,2]]);
            expect(span(ltc) ('abcdab')).toEqual(['ab', 'cdab']);
        });
        
        it('returns two empty arrays/strings in an array when given an empty array/string', () => {            
            expect(span(lt3) ([])).toEqual([[],[]]);
            expect(span(ltc) ('')).toEqual(['','']);
        });
    });

    describe('takeLastWhile', () => {
        it('returns the last N elements from an array/string that satisfy a supplied pred', () => {
            expect(takeLastWhile(lt3) ([3,2,1])).toEqual([2,1]);
            expect(takeLastWhile(ltc) ('cba')).toEqual('ba');
        });
        
        it('returns the empty array/string if the last element does not satisfy supplied pred', () => {
            expect(takeLastWhile(lt3)([5,4,3])).toEqual([]);
            expect(takeLastWhile(ltc) ('edc')).toEqual('');
        });
        
        it('returns the empty array/string when given an empty array/string', () => {            
            expect(takeLastWhile(lt3) ([])).toEqual([]);
            expect(takeLastWhile(ltc) ('')).toEqual('');
        });
    });
    
    describe('dropLastWhile', () => {
        it('removes the last N elements from an array/string that satisfy a given pred', () => {
            expect(dropLastWhile(lt3)([3,2,1])).toEqual([3]);
            expect(dropLastWhile(ltc)('cba')).toEqual('c');
        });
        
        it('returns the entire array/string when the last element does not satisfy predicate', () => {
            expect(dropLastWhile(lt3)([5,4,3])).toEqual([5,4,3]);
            expect(dropLastWhile(ltc)('edc')).toEqual('edc');
        });
        
        it('returns the empty array/string when given an empty array/string', () => {            
            expect(dropLastWhile(lt3) ([])).toEqual([]);
            expect(dropLastWhile(ltc) ('')).toEqual('');
        });
    });
    
    describe('spanLast', () => {
        it('should be equivalent to [dropLastWhile..., takeLastWhile...]', () => {           
            expect(spanLast(lt3) ([2,1,4,3,2,1])).toEqual([[2,1,4,3],[2,1]]);
            expect(spanLast(ltc) ('badcba')).toEqual(['badc', 'ba']);
        });
        
        it('returns two empty arrays/strings in an array when given an empty array/string', () => {            
            expect(spanLast(lt3) ([])).toEqual([[],[]]);
            expect(spanLast(ltc) ('')).toEqual(['','']);
        });
    });

    describe('nths', () => {
        it('returns every nth element.', () => {           
            expect(nths(3) ([1,2,3,4,1,2,5])).toEqual([1,4,5]);
            expect(nths(2) ('abcdab')).toEqual('aca');
            expect(nths(3,1) ([1,2,3,4,1,2,5])).toEqual([2,1]);
            expect(nths(2,1) ('abcdab')).toEqual('bdb');
        });
    });    
    
    describe('inits', () => {
        it('returns an array of array/string containing all inits from a supplied array/string', () => { 
            const a = [1, 2, 3],
                  b = 'abcd';
            
            expect(inits(a)).toEqual([[], [1], [1,2], [1,2,3]]);
            expect(inits(b)).toEqual(['', 'a', 'ab' , 'abc', 'abcd'] );
        });
        
        it('returns an array with an empty array/string when given an empty array/string', () => {
            expect(inits([])).toEqual([[]]);
            expect(inits('')).toEqual([''] );
        });
    });
    
    describe('tails', () => {
        it('returns an array of array/string containing all tails from a supplied array/string', () => {
            const a = [1, 2, 3],
                  b = 'abcd';
            
            expect(tails(a)).toEqual([[1,2,3], [2,3], [3], []]);
            expect(tails(b)).toEqual(['abcd', 'bcd', 'cd', 'd',''] );
        });
        
        it('returns an array with an empty array/string when given an empty array/string', () => {
            expect(tails([])).toEqual([[]]);
            expect(tails('')).toEqual([''] );
        });
    });
});