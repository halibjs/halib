//const { asc, desc, cmp, sort, sortDesc, sortBy, sortDescBy, sortN, sortNDesc, sortNBy, sortNDescBy,
//        merge, insert, mergeBy, insertBy, maxBy, minBy, maximumBy, minimumBy, ordered, orderedBy } = require('./halib.js');
//const { id, len } = require('./halib.js');


const compare = (x, y) => x < y ? -1 : (x === y ? 0 : 1);

describe('Sorting:', () => {
    describe('asc', () => {
        const age = p => p.age;
        it('returns a comparator function (ascending) using fn.', () => {
            expect(asc(age)({age:1}, {age:2})).toEqual(-1);
        });
    });

    describe('desc', () => {
        const age = p => p.age;
        it('returns a comparator function (descending) using fn.', () => {
            expect(desc(age)({age:1}, {age:2})).toEqual(1);
        });
    });

    describe('cmp', () => {
        const age = p => p.age;
        const id = p => p.id;
        it('makes a comparator function out of other comparator functions.', () => {
            expect(cmp(asc(age), desc(id))({age:1, id:1}, {age:1,id:2})).toEqual(1);
        });
    });
    
    describe('sort', () => {
        it('returns a list with elements ranked in ascending order', () => {
            expect(sort([4,1,3,2])).toEqual([1,2,3,4]);
            expect(sort([15,2,1])).toEqual([1,2,15]);
            expect(sort('dacb')).toEqual('abcd');
        });
                                
        it('returns an empty list when given an empty list', () => {
            expect(sort([])).toEqual([]);
            expect(sort('')).toEqual('');
        });
    });

    describe('sortDesc', () => {
        it('returns a list with elements ranked in descending order', () => {
            expect(sortDesc([4,1,3,2])).toEqual([4,3,2,1]);
            expect(sortDesc([15,2,1])).toEqual([15,2,1]);
            expect(sortDesc('dacb')).toEqual('dcba');
        });
                
        it('returns an empty list when given an empty list', () => {
            expect(sortDesc([])).toEqual([]);
            expect(sortDesc('')).toEqual('');
        });
    });
    
    describe('sortBy', () => {
        it('analogous to sort, with user supplied comparison', () => {
            expect(sortBy(id)([4,1,3,2])).toEqual([1,2,3,4]);
            expect(sortBy(id)([15,2,1])).toEqual([1,2,15]);
            expect(sortBy(id)('dacb')).toEqual('abcd');
            expect(sortBy(compare)([4,1,3,2])).toEqual([1,2,3,4]);
            expect(sortBy(compare)([15,2,1])).toEqual([1,2,15]);
            expect(sortBy(compare)('dacb')).toEqual('abcd');
        });
        
        it('with objects', () => {
            const age = p => p.age;
            expect(sortBy(age)([{age:4},{age:1},{age:3},{age:2}])).toEqual([{age:1},{age:2},{age:3},{age:4}]);
        });
        
        it('returns an empty list when given an empty list', () => {
            expect(sortBy(id)([])).toEqual([]);
            expect(sortBy(id)('')).toEqual('');
        });
    });
    
    describe('sortDescBy', () => {
        it('analogous to sort, with user supplied comparison', () => {
            expect(sortDescBy(id)([4,1,3,2])).toEqual([4,3,2,1]);
            expect(sortDescBy(id)([15,2,1])).toEqual([15,2,1]);
            expect(sortDescBy(id)('dacb')).toEqual('dcba');
            expect(sortDescBy(compare)([4,1,3,2])).toEqual([4,3,2,1]);
            expect(sortDescBy(compare)([15,2,1])).toEqual([15,2,1]);
            expect(sortDescBy(compare)('dacb')).toEqual('dcba');
        });
        
        it('with objects', () => {
            const age = p => p.age;
            expect(sortDescBy(age)([{age:4},{age:1},{age:3},{age:2}])).toEqual([{age:4},{age:3},{age:2},{age:1}]);
        });
        
        it('returns an empty list when given an empty list', () => {
            expect(sortDescBy(id)([])).toEqual([]);
            expect(sortDescBy(id)('')).toEqual('');
        });
    });

    describe('sortN', () => {
        it('returns a list with elements ranked in ascending order', () => {
            expect(sortN(3) ([4,1,3,2])).toEqual([1,2,3]);
            expect(sortN(3) ('dacb')).toEqual('abc');
            expect(sortN(5) ([4,1,3,2])).toEqual([1,2,3,4]);
            expect(sortN(5) ('dacb')).toEqual('abcd');
        });

        it('n => 0', () => {
            expect(sortN(0) ([4,1,3,2])).toEqual([]);
            expect(sortN(0) ('dacb')).toEqual('');
        });

        it('n => 5', () => {
            expect(sortN(5) ([4,1,3,2])).toEqual([1,2,3,4]);
            expect(sortN(5) ('dacb')).toEqual('abcd');
        });
                                
        it('returns an empty list when given an empty list', () => {
            expect(sortN(3)([])).toEqual([]);
            expect(sortN(3)('')).toEqual('');
        });
    });

    describe('sortNDesc', () => {
        it('returns a list with elements ranked in descending order', () => {
            expect(sortNDesc(3) ([4,1,3,2])).toEqual([4,3,2]);
            expect(sortNDesc(3) ('dacb')).toEqual('dcb');
        });

        it('n => 0', () => {
            expect(sortNDesc(0) ([4,1,3,2])).toEqual([]);
            expect(sortNDesc(0) ('dacb')).toEqual('');
        });

        it('n => 5', () => {
            expect(sortNDesc(5) ([4,1,3,2])).toEqual([4,3,2,1]);
            expect(sortNDesc(5) ('dacb')).toEqual('dcba');
        });
                
        it('returns an empty list when given an empty list', () => {
            expect(sortNDesc(3)([])).toEqual([]);
            expect(sortNDesc(3)('')).toEqual('');
        });
    });
    
    describe('sortNBy', () => {
        it('analogous to sort, with user supplied comparison', () => {
            expect(sortNBy(3)(id)([4,1,3,2])).toEqual([1,2,3]);
            expect(sortNBy(3)(id)('dacb')).toEqual('abc');
            expect(sortNBy(3)(compare)([4,1,3,2])).toEqual([1,2,3]);
            expect(sortNBy(3)(compare)('dacb')).toEqual('abc');
        });

        it('n => 0', () => {
            expect(sortNBy(0)(id)([4,1,3,2])).toEqual([]);
            expect(sortNBy(0)(id)('dacb')).toEqual('');
            expect(sortNBy(0)(compare)([4,1,3,2])).toEqual([]);
            expect(sortNBy(0)(compare)('dacb')).toEqual('');
        });

        it('n => 5', () => {
            expect(sortNBy(5)(id)([4,1,3,2])).toEqual([1,2,3,4]);
            expect(sortNBy(5)(id)('dacb')).toEqual('abcd');
            expect(sortNBy(5)(compare)([4,1,3,2])).toEqual([1,2,3,4]);
            expect(sortNBy(5)(compare)('dacb')).toEqual('abcd');
        });
        
        it('with objects', () => {
            const age = p => p.age;
            expect(sortNBy(3)(age)([{age:4},{age:1},{age:3},{age:2}])).toEqual([{age:1},{age:2},{age:3}]);
        });
        
        it('returns an empty list when given an empty list', () => {
            expect(sortNBy(3)(id)([])).toEqual([]);
            expect(sortNBy(3)(id)('')).toEqual('');
        });
    });
    
    describe('sortNDescBy', () => {
        it('analogous to sort, with user supplied comparison', () => {
            expect(sortNDescBy(3)(id)([4,1,3,2])).toEqual([4,3,2]);
            expect(sortNDescBy(3)(id)('dacb')).toEqual('dcb');
            expect(sortNDescBy(3)(compare)([4,1,3,2])).toEqual([4,3,2]);
            expect(sortNDescBy(3)(compare)('dacb')).toEqual('dcb');
        });

        it('n => 0', () => {
            expect(sortNDescBy(0)(id)([4,1,3,2])).toEqual([]);
            expect(sortNDescBy(0)(id)('dacb')).toEqual('');
            expect(sortNDescBy(0)(compare)([4,1,3,2])).toEqual([]);
            expect(sortNDescBy(0)(compare)('dacb')).toEqual('');
        });

        it('n => 5', () => {
            expect(sortNDescBy(5)(id)([4,1,3,2])).toEqual([4,3,2,1]);
            expect(sortNDescBy(5)(id)('dacb')).toEqual('dcba');
            expect(sortNDescBy(5)(compare)([4,1,3,2])).toEqual([4,3,2,1]);
            expect(sortNDescBy(5)(compare)('dacb')).toEqual('dcba');
        });
        
        it('with objects', () => {
            const age = p => p.age;
            expect(sortNDescBy(3)(age)([{age:4},{age:1},{age:3},{age:2}])).toEqual([{age:4},{age:3},{age:2}]);
        });
        
        it('returns an empty list when given an empty list', () => {
            expect(sortNDescBy(3)(id)([])).toEqual([]);
            expect(sortNDescBy(3)(id)('')).toEqual('');
        });
    });

    describe('merge', () => {
        it('combines the elements of the two lists, without removing duplicate elements' +
            'works only with simple types, both args must be sorted list', () => {
            expect(merge([1,1,2,2,3,3]) ([2,3,4])).toEqual([1,1,2,2,2,3,3,3,4]);
            expect(merge('aabbcc') ('bcd')).toEqual('aabbbcccd');
        });
    });

    describe('insert', () => {
        it('places the given element into the given sorted list, works only with simple types', () => {
            expect(insert(4) ([2,3,5])).toEqual([2,3,4,5]);
            expect(insert('a') ('bcd')).toEqual('abcd');
        });
    });

    describe('mergeBy', () => {
        it('combines the elements of the two lists, without removing duplicate elements' +
            'works only with simple types, both args must be sorted list', () => {
            const age = p => p.age;
            const persons1 = [{age:1},{age:2,id:1},{age:3,id:1}];
            const persons2 = [{age:2,id:2},{age:3,id:2},{age:4}];
            const res = [{age:1},{age:2,id:1},{age:2,id:2},{age:3,id:1},{age:3,id:2},{age:4}];
            expect(mergeBy(age)(persons1) (persons2)).toEqual(res);
            expect(mergeBy(id)([1,1,2,2,3,3]) ([2,3,4])).toEqual([1,1,2,2,2,3,3,3,4]);
            expect(mergeBy(compare)('aabbcc') ('bcd')).toEqual('aabbbcccd');
        });
    });

    describe('insertBy', () => {
        it('places the given element into the given sorted list', () => {
            const age = p => p.age;
            const persons = [{age:1},{age:2,id:1},{age:3}];
            const res = [{age:1},{age:2,id:0},{age:2,id:1},{age:3}];
            
            expect(insertBy(age)({age:2,id:0}) (persons)).toEqual(res);
            expect(insertBy(id)(4) ([2,3,5])).toEqual([2,3,4,5]);
            expect(insertBy(id)('a') ('bcd')).toEqual('abcd');
            expect(insertBy(compare)(4) ([2,3,5])).toEqual([2,3,4,5]);
            expect(insertBy(compare)('a') ('bcd')).toEqual('abcd');
        });        
    });  

    const compare = (x, y) => x < y ? -1 : (x > y ? 1 : 0);
    const age = p => p.age;    
    const compAge = asc(age);
    const num = p => p.num;
    const cmpAgeNum = cmp(asc(age), asc(num));
    
    describe('maxBy', () => {
            const xs = [1,2,3,4];
            const ys = [1,2,3];
            const zs = [1,2,3,4];
            it('Returns the larger parameter using the given function', () => {            
            expect(maxBy(Math.abs)(-2, 1)).toEqual(-2);
            expect(maxBy(len)(xs, ys)).toEqual(xs);
            expect(maxBy(len)(xs, ys)).toBe(xs);
            expect(maxBy(compare)(2, 3)).toEqual(3);
        });
        
        it('with objects', () => {
            const first = {age:1,num:1};
            const second = {age:2,num:2};
            const third = {age:1,num:2};
            expect(maxBy(age)(first, second)).toBe(second);
            expect(maxBy(compAge)(first, second)).toBe(second);
            expect(maxBy(cmpAgeNum)(first, third)).toBe(third);
        });
        
        it('if the given args are equal, returns the first arg', () => {   
            expect(maxBy(len)(xs, zs)).toEqual(xs);
            expect(maxBy(len)(xs, zs)).toBe(xs);
        });

        it('equal with objects, returns the first arg', () => {
            const first = {age:1,num:1};
            const second = {age:1,num:1};
            expect(maxBy(age)(first, second)).toBe(first);
            expect(maxBy(compAge)(first, second)).toBe(first);
            expect(maxBy(cmpAgeNum)(first, second)).toBe(first);
        });
    });
    
    
    describe('minBy', () => {
            const xs = [1,2,3,4];
            const ys = [1,2,3];
            const zs = [1,2,3,4];
        it('Returns the smaller parameter using the given function', () => {            
            expect(minBy(Math.abs)(-2, 1)).toEqual(1);
            expect(minBy(len)(xs, ys)).toEqual(ys);
            expect(minBy(len)(xs, ys)).toBe(ys);
            expect(minBy(compare)(2, 3)).toEqual(2);
        });
        
        it('with objects', () => {
            const first = {age:1,num:1};
            const second = {age:2,num:2};
            const third = {age:1,num:2};
            expect(minBy(age)(first, second)).toBe(first);
            expect(minBy(compAge)(first, second)).toBe(first);
            expect(minBy(cmpAgeNum)(first, third)).toBe(first);
        });
        
        it('if the given args are equal, returns the first arg', () => {   
            expect(minBy(len)(xs, zs)).toEqual(xs);
            expect(minBy(len)(xs, zs)).toBe(xs);
        });

        it('equal with objects, returns the first arg', () => {
            const first = {age:1,num:1};
            const second = {age:1,num:1};
            expect(minBy(age)(first, second)).toBe(first);
            expect(minBy(compAge)(first, second)).toBe(first);
            expect(minBy(cmpAgeNum)(first, second)).toBe(first);
        });
    });
     
    describe('maximumBy', () => {
        it('returns the largest element in a list', () => {          
            expect(maximumBy(id)([1,2,3])).toEqual(3);
            expect(maximumBy(id)('abc')).toEqual('c');
            expect(maximumBy(compare)([1,2,3])).toEqual(3);
            expect(maximumBy(compare)('abc')).toEqual('c');
        });
        
        it('with objects', () => {
            const persons = [{age:1},{age:3},{age:2}]
            expect(maximumBy(age)(persons)).toEqual({age:3});
            expect(maximumBy(compAge)(persons)).toEqual({age:3});

            const persons2 = [{age:1},{age:3,num:1},{age:3,num:2},{age:2}];
            expect(maximumBy(cmpAgeNum)(persons2)).toEqual({age:3,num:2});
        });
        
        it('throws an error given an empty list', () => {
            expect(maximumBy(compare)([])).toEqual(undefined);
            expect(maximumBy(compare)('')).toEqual(undefined);
            expect(maximumBy(id)([])).toEqual(undefined);
            expect(maximumBy(id)('')).toEqual(undefined);
        });
    });
    
    describe('minimumBy', () => {
        it('returns the smallest element in a list', () => {          
            expect(minimumBy(id)([1,2,3])).toEqual(1);
            expect(minimumBy(id)('abc')).toEqual('a');
            expect(minimumBy(compare)([1,2,3])).toEqual(1);
            expect(minimumBy(compare)('abc')).toEqual('a');
        });
        
        it('with objects', () => {
            const persons = [{age:1},{age:3},{age:2}]
            expect(minimumBy(age)(persons)).toEqual({age:1});
            expect(minimumBy(compAge)(persons)).toEqual({age:1});

            const persons2 = [{age:1,num:2},{age:1,num:1},{age:3},{age:2}];
            expect(minimumBy(cmpAgeNum)(persons2)).toEqual({age:1,num:1});
        });
        
        it('throws an error given an empty list', () => { 
            expect(minimumBy(compare)([])).toEqual(undefined);
            expect(minimumBy(compare)('')).toEqual(undefined);
            expect(minimumBy(id)([])).toEqual(undefined);
            expect(minimumBy(id)('')).toEqual(undefined);
        });
    });

    describe('ordered', () => {
        it('returns true when a list is in ascending order', () => {
            expect(ordered([4,1,3,2])).toEqual(false);
            expect(ordered([15,2,1])).toEqual(false);
            expect(ordered('dacb')).toEqual(false);

            expect(ordered(sort([4,1,3,2]))).toEqual(true);
            expect(ordered(sort([15,2,1]))).toEqual(true);
            expect(ordered(sort('dacb'))).toEqual(true);
        });
                                
        it('returns true when given an empty or one-item list', () => {
            expect(ordered([])).toEqual(true);
            expect(ordered('')).toEqual(true);
            expect(ordered([1])).toEqual(true);
            expect(ordered('1')).toEqual(true);
        });
    });
    
    describe('orderedBy', () => {
        it('analogous to ordered, with user supplied comparison', () => {
            expect(orderedBy(id)([4,1,3,2])).toEqual(false);
            expect(orderedBy(id)([15,2,1])).toEqual(false);
            expect(orderedBy(id)('dacb')).toEqual(false);
            expect(orderedBy(compare)([4,1,3,2])).toEqual(false);
            expect(orderedBy(compare)([15,2,1])).toEqual(false);
            expect(orderedBy(compare)('dacb')).toEqual(false);

            expect(orderedBy(id)(sortBy(id)([4,1,3,2]))).toEqual(true);
            expect(orderedBy(id)(sortBy(id)([15,2,1]))).toEqual(true);
            expect(orderedBy(id)(sortBy(id)('dacb'))).toEqual(true);
            expect(orderedBy(compare)(sortBy(compare)([4,1,3,2]))).toEqual(true);
            expect(orderedBy(compare)(sortBy(compare)([15,2,1]))).toEqual(true);
            expect(orderedBy(compare)(sortBy(compare)('dacb'))).toEqual(true);
        });
        
        it('with objects', () => {
            const age = p => p.age;
            expect(orderedBy(age)([{age:4},{age:1},{age:3},{age:2}])).toEqual(false);
            expect(orderedBy(age)(sortBy(age)([{age:4},{age:1},{age:3},{age:2}]))).toEqual(true);
        });
        
        it('returns true when given an empty or one-item list', () => {
            expect(orderedBy(id)([])).toEqual(true);
            expect(orderedBy(id)('')).toEqual(true);
            expect(orderedBy(id)([1])).toEqual(true);
            expect(orderedBy(id)('1')).toEqual(true);
        });
    });



});
