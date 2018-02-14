//const { elem, notElem, elemSorted, startsWith, endsWith, seq, find, filter, reject, findLast,
//        partition } = require('./halib.js');


describe('Searching lists:', () => { 
    describe('elem', () => {
        it('returns true when an element is present in an array/string', () => {
            expect(elem(2) ([1,2,3])).toEqual(true);
            expect(elem('b') ('abc')).toEqual(true);
        });
        
        it('returns false when an element is not present in an array/string', () => {
            expect(elem(4) ([1,2,3])).toEqual(false);
            expect(elem('d') ('abc')).toEqual(false);
        });
        
        it('with arrays', () => {  
            const xss1 =        [1,2];
            const yss1 = [[1,1],[1,2],[1,3]];
            
            const xss2 =        [1,2];
            const yss2 = [[1,1],[1,2],1,2,3];
            
            const xss3 = [1,9];
            const yss3 = [[1,1],[1,2],1,2,3];
            
            expect(elem(xss1) (yss1)).toEqual(true);
            expect(elem(xss2) (yss2)).toEqual(true);
            expect(elem(xss3) (yss3)).toEqual(false);
        });
        
        it('returns false when given an empty array/string', () => {
            expect(elem(1) ([])).toEqual(false);
            expect(elem('a') ('')).toEqual(false);
        });
    });

    describe('elemSorted', () => {
        it('returns true when an element is present in an array/string', () => {
            expect(elemSorted(2) ([1,2,3])).toEqual(true);
            expect(elemSorted('b') ('abc')).toEqual(true);
        });
        
        it('returns false when an element is not present in an array/string', () => {
            expect(elemSorted(4) ([1,2,3])).toEqual(false);
            expect(elemSorted('d') ('abc')).toEqual(false);
        });
                
        it('returns false when given an empty array/string', () => {
            expect(elemSorted(1) ([])).toEqual(false);
            expect(elemSorted('a') ('')).toEqual(false);
        });
    });
    
    describe('notElem', () => {
        it('returns true when an element is not present in an array/string', () => {
            expect(notElem(4) ([1,2,3])).toEqual(true);
            expect(notElem('d') ('abc')).toEqual(true);
        });
        
        it('returns false when an element is present in an array/string', () => {
            expect(notElem(2) ([1,2,3])).toEqual(false);
            expect(notElem('b') ('abc')).toEqual(false);
        });
        
        it('with arrays', () => {  
            const xss1 =        [1,2];
            const yss1 = [[1,1],[1,2],[1,3]];
            
            const xss2 =        [1,2];
            const yss2 = [[1,1],[1,2],1,2,3];
            
            const xss3 = [1,9];
            const yss3 = [[1,1],[1,2],1,2,3];
            
            expect(notElem(xss1) (yss1)).toEqual(false);
            expect(notElem(xss2) (yss2)).toEqual(false);
            expect(notElem(xss3) (yss3)).toEqual(true);
        });
        
        it('returns true when given an empty array/string', () => {
            expect(notElem(1) ([])).toEqual(true);
            expect(notElem('a') ('')).toEqual(true);
        });
    });

    describe('startsWith', () => {
        it('returns true if second array/string starts with first', () => {
            expect(startsWith([2,3]) ([2,3,4,5])).toEqual(true);
            expect(startsWith([1,2]) ([2,3,4,5])).toEqual(false);
            expect(startsWith([3,4]) ([2,3,4,5])).toEqual(false);
            expect(startsWith([2,3,5]) ([2,3,4,5])).toEqual(false);
            expect(startsWith('bc') ('bcde')).toEqual(true);
            expect(startsWith('ab') ('bcde')).toEqual(false);
            expect(startsWith('cd') ('bcde')).toEqual(false);
            expect(startsWith('bce') ('bcde')).toEqual(false);
        });
        
        it('with arrays', () => {  
            const xss1 = [[1,1],[1,2]      ];
            const yss1 = [[1,1],[1,2],[1,3]];
            
            const xss2 = [[1,1],[1,2],1,2  ];
            const yss2 = [[1,1],[1,2],1,2,3];
            
            const xss3 = [[1,1],[1,9],1,2  ];
            const yss3 = [[1,1],[1,2],1,2,3];
            
            expect(startsWith(xss1) (yss1)).toEqual(true);
            expect(startsWith(xss2) (yss2)).toEqual(true);
            expect(startsWith(xss3) (yss3)).toEqual(false);
        });
        
        it('returns false when given an empty array/string as first arg', () => {
            expect(startsWith ([]) ([2,3,4])).toEqual(false);
            expect(startsWith ('') ('bcd')).toEqual(false);
        });
        
        it('returns false if second array/string empty, first array/string not', () => {
            expect(startsWith([1,2]) ([])).toEqual(false);
            expect(startsWith('ab') ('')).toEqual(false);
        });
                
        it('returns false if first array/string is longer than second', () => {
            expect(startsWith([1,2,3]) ([1,2])).toEqual(false);
            expect(startsWith('abc') ('ab')).toEqual(false);
        });
        
        it('returns true if the two arrays/strings are equal', () => {
            expect(startsWith([1,2,3]) ([1,2,3])).toEqual(true);
            expect(startsWith('abc') ('abc')).toEqual(true);
        });
    });
    
    describe('endsWith', () => {
        it('returns true if second array/string ends with first', () => {
            expect(endsWith([2,3]) ([1,2,3])).toEqual(true);
            expect(endsWith([3,4]) ([1,2,3])).toEqual(false);
            expect(endsWith([1,2]) ([1,2,3])).toEqual(false);
            expect(endsWith('bc') ('abc')).toEqual(true);
            expect(endsWith('bcd') ('abc')).toEqual(false);
            expect(endsWith('ab') ('abc')).toEqual(false);
        });
        
        it('with arrays', () => {  
            const xss1 = [      [1,2],[1,3]];
            const yss1 = [[1,1],[1,2],[1,3]];
            
            const xss2 = [      [1,2],1,2,3];
            const yss2 = [[1,1],[1,2],1,2,3];
            
            const xss3 = [      [1,9],1,2,3];
            const yss3 = [[1,1],[1,2],1,2,3];
            
            expect(endsWith(xss1) (yss1)).toEqual(true);
            expect(endsWith(xss2) (yss2)).toEqual(true);
            expect(endsWith(xss3) (yss3)).toEqual(false);
        });
                
        it('returns false when given an empty array/string as first arg', () => {
            expect(endsWith ([]) ([2,3,4])).toEqual(false);
            expect(endsWith ('') ('bcd')).toEqual(false);
        });
        
        it('returns false if second array/string empty, first array/string not', () => {
            expect(endsWith([1,2]) ([])).toEqual(false);
            expect(endsWith('ab') ('')).toEqual(false);
        });
                
        it('returns false if first array/string is longer than second', () => {
            expect(endsWith([1,2,3]) ([1,2])).toEqual(false);
            expect(endsWith('abc') ('ab')).toEqual(false);
        });
        
        it('returns true if the two arrays/strings are equal', () => {
            expect(endsWith([1,2,3]) ([1,2,3])).toEqual(true);
            expect(endsWith('abc') ('abc')).toEqual(true);
        });
    });
    
    describe('seq', () => {       
        it('returns true if second array/string contains first', () => {
            expect(seq([1,2]) ([1,2,3,4])).toEqual(true);
            expect(seq([2,3]) ([1,2,3,4])).toEqual(true);
            expect(seq([3,4]) ([1,2,3,4])).toEqual(true);
            expect(seq([4,5]) ([1,2,3,4])).toEqual(false);
            expect(seq('ab') ('abcd')).toEqual(true);
            expect(seq('bc') ('abcd')).toEqual(true);
            expect(seq('cd') ('abcd')).toEqual(true);
            expect(seq('de') ('abcd')).toEqual(false);

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
            
            expect(seq(xss1) (yss1)).toEqual(true);
            expect(seq(xss2) (yss2)).toEqual(true);
            expect(seq(xss3) (yss3)).toEqual(true);
            expect(seq(xss4) (yss4)).toEqual(true);
            expect(seq(xss5) (yss5)).toEqual(false);
        });
                
        it('returns false when given an empty array/string as first arg', () => {
            expect(seq ([]) ([2,3,4])).toEqual(false);
            expect(seq ('') ('bcd')).toEqual(false);
        });
        
        it('returns false if second array/string empty, first array/string not', () => {
            expect(seq([1,2]) ([])).toEqual(false);
            expect(seq('ab') ('')).toEqual(false);
        });
                
        it('returns false if first array/string is longer than second', () => {
            expect(seq([1,2,3]) ([1,2])).toEqual(false);
            expect(seq('abc') ('ab')).toEqual(false);
        });
        
        it('returns true if the two array/string are equal', () => {
            expect(seq([1,2,3]) ([1,2,3])).toEqual(true);
            expect(seq('abc') ('abc')).toEqual(true);
        });
    });
    
    
    const even = x => x % 2 === 0;
    const gtb = x => x > 'b';
    const a10 = { name: 'alpha', age: 10};
    const b20 = { name: 'beta', age: 20};
    const g30 = { name: 'gamma', age: 30};
    const d20 = { name: 'delta', age: 20};
    const age20 = person => person.age === 20;
    describe('find', () => {
        it('returns the first element of an array/string that satisfies a given predicate', () => { 
            expect(find(even)([1,2,3,4])).toEqual(2);
            expect(find(gtb)('abcd')).toEqual('c');
        });
        
        it('with objects', () => {
            expect(find(age20)([a10,b20,g30,d20])).toBe(b20);
        });
        
        it('returns undefined if no element in an array/string satisfies a given predicate', () => { 
            expect(find(even)([1,3,5])).toEqual(undefined);
            expect(find(gtb)('abab')).toEqual(undefined);
            expect(find(even)([])).toEqual(undefined);
            expect(find(gtb)('')).toEqual(undefined);
        });
    });
    
    describe('filter', () => {
        it('returns the array/string of those elements that satisfy the given predicate', () => {
            expect(filter(even)([1,2,3,4])).toEqual([2,4]);
            expect(filter(gtb)('abcdabcd')).toEqual('cdcd');
        });
        
        it('with objects', () => {
            expect(filter(age20)([a10,b20,g30,d20])).toEqual([b20,d20]);
        });
        
        it('returns empty array/string if no element in an array/string satisfies a given predicate', () => { 
            expect(filter(even)([1,3,5])).toEqual([]);
            expect(filter(gtb)('abab')).toEqual('');
            expect(filter(even)([])).toEqual([]);
            expect(filter(gtb)('')).toEqual('');
        });
    });
    
    describe('reject', () => {
        it('returns the array/string of those elements that do not satisfy predicate', () => {
            expect(reject(even)([1,2,3,4])).toEqual([1,3]);
            expect(reject(gtb)('abcdabcd')).toEqual('abab');
        });
        
        it('with objects', () => {
            expect(reject(age20)([a10,b20,g30,d20])).toEqual([a10,g30]);
        });
        
        it('returns empty list if all elements in a list satisfy a given predicate', () => { 
            expect(reject(even)([2,4])).toEqual([]);
            expect(reject(gtb)('cdcd')).toEqual('');
            expect(reject(even)([])).toEqual([]);
            expect(reject(gtb)('')).toEqual('');
        });
    });
    
    describe('findLast', () => {
        it('returns the last element of an array/string that satisfies a given predicate', () => { 
            expect(findLast(even)([1,2,3,4])).toEqual(4);
            expect(findLast(gtb)('abcd')).toEqual('d');
        });
        
        it('with objects', () => {
            expect(findLast(age20)([a10,b20,g30,d20])).toBe(d20);
        });
        
        it('returns undefined if no element in an array/string satisfies a given predicate', () => { 
            expect(findLast(even)([1,3,5])).toEqual(undefined);
            expect(findLast(gtb)('abab')).toEqual(undefined);
            expect(findLast(even)([])).toEqual(undefined);
            expect(findLast(gtb)('')).toEqual(undefined);
        });
    });
    
    describe('partition', () => {
        it(`returns an array of two members (array or string), 
            the first contains those elements from the supplied array/string
            that satisfy the supplied predicate, the second list contains those that do not.`, () => {
            expect(partition(even) ([1,2,3,4])).toEqual([[2,4], [1,3]]);
            expect(partition(gtb) ('abcd')).toEqual(['cd', 'ab']);
        });
        
        it('with objects', () => {
            expect(partition(age20)([a10,b20,g30,d20])).toEqual([[b20,d20],[a10,g30]]);
        });
        
        it('returns an empty first array/string if no element satisfies the given predicate', () => { 
            expect(partition(even) ([1,3,5])).toEqual([[], [1,3,5]]);
            expect(partition(gtb) ('abab')).toEqual(['', 'abab']);
        });
        
        it('returns an empty second array/string if every element satisfies the given predicate', () => {
            expect(partition(even) ([2,4,6])).toEqual([[2,4,6], []]); 
            expect(partition(gtb) ('cdcd')).toEqual(['cdcd', '']);
        });
        
        it('returns a pair of empty array/string in an array if supplied with an empty array', () => {
            expect(partition(even) ([])).toEqual([[], []]);
            expect(partition(even) ('')).toEqual(['', '']);
        });
    });
});
