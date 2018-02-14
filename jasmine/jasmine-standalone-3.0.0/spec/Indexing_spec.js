//const { elemIndex, elemIndices, elemIndexLast, findIndex, findIndices, findIndexLast,
//         elemIndexSorted, elemIndexLastSorted, seqIndex, seqIndices } = require('./halib.js');



describe('Indexing lists:', () => { 
    describe('elemIndex', () => {
        it('returns the index of the first element in an array/string that is equal to supplied element', () => {
            expect(elemIndex(2)([1,2,3,2])).toEqual(1);
            expect(elemIndex('b')('abcb')).toEqual(1);
        });
        
        it('with arrays', () => {  
            const xss1 = [1,2];
            const yss1 = [[1,1],[1,2],[1,3],[1,2]];
            
            const xss2 = [1,2];
            const yss2 = [[1,1],1,2,[1,2],3];
            
            const xss3 = [1,9];
            const yss3 = [[1,1],[1,2],1,2,3];
            
            expect(elemIndex(xss1) (yss1)).toEqual(1);
            expect(elemIndex(xss2) (yss2)).toEqual(3);
            expect(elemIndex(xss3) (yss3)).toEqual(-1);
        });
        
        it('returns -1 if there is no element in an array/string equal to supplied value', () => { 
            expect(elemIndex(4)([1,2,3])).toEqual(-1);
            expect(elemIndex('d')('abc')).toEqual(-1);
        });
    });

    describe('elemIndices', () => {
        it('returns an array of indices of those elements that are equal to the supplied value', () => {
            expect(elemIndices(2)([1,2,3,2])).toEqual([1,3]);
            expect(elemIndices('b')('abcb')).toEqual([1,3]);
        });
        
        it('with arrays', () => {  
            const xss1 = [1,2];
            const yss1 = [[1,1],[1,2],[1,3],[1,2]];
            
            const xss2 = [1,2];
            const yss2 = [[1,1],1,2,[1,2],3];
            
            const xss3 = [1,9];
            const yss3 = [[1,1],[1,2],1,2,3];
            
            expect(elemIndices(xss1) (yss1)).toEqual([1,3]);
            expect(elemIndices(xss2) (yss2)).toEqual([3]);
            expect(elemIndices(xss3) (yss3)).toEqual([]);
        });
        
        it('returns empty array if there is no element in the given array/string equal to supplied element', () => { 
            expect(elemIndices(4)([1,2,3])).toEqual([]);
            expect(elemIndices('d')('abc')).toEqual([]);
        });
    });
        
    describe('elemIndexLast', () => {
        it('returns the index of the last element in an array or string that is equal to the supplied element', () => { 
            expect(elemIndexLast(2)([1,2,3,2])).toEqual(3);
            expect(elemIndexLast('b')('abcb')).toEqual(3);
        });
        
        it('with arrays', () => {  
            const xss1 = [1,2];
            const yss1 = [[1,1],[1,2],[1,3],[1,2],[1,3]];
            
            const xss2 = [1,2];
            const yss2 = [[1,1],1,2,[1,2],3];
            
            const xss3 = [1,9];
            const yss3 = [[1,1],[1,2],1,2,3];
            
            expect(elemIndexLast(xss1) (yss1)).toEqual(3);
            expect(elemIndexLast(xss2) (yss2)).toEqual(3);
            expect(elemIndexLast(xss3) (yss3)).toEqual(-1);
        });
        
        it('returns -1 if there is no element in an array/string equal to supplied value', () => { 
            expect(elemIndexLast(4)([1,2,3])).toEqual(-1);
            expect(elemIndexLast('d')('abc')).toEqual(-1);
        });
    });
    
    
    
    const even = x => x % 2 === 0;
    const gtb = x => x > 'b';
    const a10 = { name: 'alpha', age: 10};
    const b20 = { name: 'beta', age: 20};
    const g30 = { name: 'gamma', age: 30};
    const d20 = { name: 'delta', age: 20};
    const age20 = person => person.age === 20;
    describe('findIndex', () => {
        it('returns the index of the first element in an array/string that satisfies the predicate', () => { 
            expect(findIndex(even)([1,2,3,4])).toEqual(1);
            expect(findIndex(gtb)('abcd')).toEqual(2);
        });
        
        it('with objects', () => {
            expect(findIndex(age20)([a10,b20,g30,d20])).toEqual(1);
        });
        
        it('returns -1 if there is no element in an array/string that satisfies a given predicate', () => { 
            expect(findIndex(even)([1,3,5])).toEqual(-1);
            expect(findIndex(gtb)('aba')).toEqual(-1);
        });
    }); 
    
    describe('findIndices', () => {
        it('returns the array of the indices of those elements that satisfy the given predicate', () => { 
            expect(findIndices(even)([1,2,3,4])).toEqual([1,3]);
            expect(findIndices(gtb)('abcd')).toEqual([2,3]);
        });
        
        it('with objects', () => {
            expect(findIndices(age20)([a10,b20,g30,d20])).toEqual([1,3]);
        });
        
        it('returns empty array if no element in an array/string satisfies a given predicate', () => { 
            expect(findIndices(even)([1,3,5])).toEqual([]);
            expect(findIndices(gtb)('aba')).toEqual([]);
        });
    }); 
    
    describe('findIndexLast', () => {
        it('returns the index of the last element in an array/string that satisfies the given predicate', () => { 
            expect(findIndexLast(even)([1,2,3,4])).toEqual(3);
            expect(findIndexLast(gtb)('abcd')).toEqual(3);
        });
        
        it('with objects', () => {
            expect(findIndexLast(age20)([a10,b20,g30,d20])).toEqual(3);
        });
        
        it('returns -1 if there is no element in the array/string that satisfies a given predicate', () => { 
            expect(findIndexLast(even)([1,3,5])).toEqual(-1);
            expect(findIndexLast(gtb)('aba')).toEqual(-1);
        });
    });

    describe('elemIndexSorted', () => {
        it('returns the index of the first element in a sorted array/string that is equal to supplied element' + 
            'also known as binary search, works only with simple types', () => {
            expect(elemIndexSorted(4)([1,2,4,8,9])).toEqual(2);
            expect(elemIndexSorted('c')('abcd')).toEqual(2);
        });
                
        it('returns -1 if there is no element in an array/string equal to the supplied element', () => { 
            expect(elemIndexSorted(4)([1,2,3])).toEqual(-1);
            expect(elemIndexSorted('d')('abc')).toEqual(-1);
        });
    });

    describe('seqIndex', () => {
        it('returns the index of the first element of the sublist that is equal to supplied list', () => {
            expect(seqIndex ([3,4]) ([1,2,3,4,5,6])).toEqual(2);
            expect(seqIndex ('bc') ('abcdef')).toEqual(1);
        });
        
        it('returns -1 if no infix is found', () => {
            expect(seqIndex ([7,8]) ([1,2,3,4,5,6])).toEqual(-1);
            expect(seqIndex ('xy') ('abcdef')).toEqual(-1);
        });
        
        it('with arrays', () => {  
            const xss1 = [      [1,2],[1,3]      ];
            const yss1 = [[1,1],[1,2],[1,3],[1,4]];
            
            const xss2 = [[1,1],[1,2]            ];
            const yss2 = [[1,1],[1,2],[1,3],[1,4]];
            
            const xss3 = [            [1,3],[1,4]];
            const yss3 = [[1,1],[1,2],[1,3],[1,4]];

            const xss4 = [      [1,2],1,2  ];
            const yss4 = [[1,1],[1,2],1,2,3];
            
            const xss5 = [      [1,9],1,2,3];
            const yss5 = [[1,1],[1,2],1,2,3];
            
            expect(seqIndex(xss1) (yss1)).toEqual(1);
            expect(seqIndex(xss2) (yss2)).toEqual(0);
            expect(seqIndex(xss3) (yss3)).toEqual(2);
            expect(seqIndex(xss4) (yss4)).toEqual(1);
            expect(seqIndex(xss5) (yss5)).toEqual(-1);
        });
        
        it('returns -1 if first list is longer than second', () => {
            expect(seqIndex([1,2,3]) ([1,2])).toEqual(-1);
            expect(seqIndex('abc') ('ab')).toEqual(-1);
        });
        
        it('returns -1 when given an empty list as first arg', () => {
            expect(seqIndex ([]) ([1,2,3,4,5,6])).toEqual(-1);
            expect(seqIndex ('') ('abcdef')).toEqual(-1);
        });
    });

    describe('seqIndices', () => {
        it('returns indices of first elem of sublists that is equal to supplied list', () => {
            expect(seqIndices ([3,4]) ([1,2,3,4,5,6,3,4,7,8,9])).toEqual([2,6]);
            expect(seqIndices ('bc') ('abcdefbcxyzbc')).toEqual([1,6,11]);
        });
                
        it('returns an empty array if no infix is found', () => {
            expect(seqIndices ([7,8]) ([1,2,3,4,5,6])).toEqual([]);
            expect(seqIndices ('xy') ('abcdef')).toEqual([]);
        });
        
        it('with arrays', () => {  
            const xss1 = [      [1,2],[1,3]                              ];
            const yss1 = [[1,1],[1,2],[1,3],[1,4],[1,1],[1,2],[1,3],[1,4]];
                        
            expect(seqIndices(xss1) (yss1)).toEqual([1,5]);
        });
        
        it('returns an empty array if given an empty list as first arg', () => {
            expect(seqIndices ([]) ([1,2,3,4,5,6])).toEqual([]);
            expect(seqIndices ('') ('abcdef')).toEqual([]);
        });
        
        it('returns an empty array if first list is longer than second', () => {
            expect(seqIndices ([1,2,3,4]) ([1,2,3])).toEqual([]);
            expect(seqIndices ('abcd') ('abc')).toEqual([]);
        });
    });  
});
