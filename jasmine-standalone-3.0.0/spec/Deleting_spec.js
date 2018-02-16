//const { del, delAll, deleteSeq, deleteSeqAll, deleteAt, deleteFrom, deleteIndices, keepIndices,
//         replace, replaceAll, replaceSeq, replaceSeqAll, replaceAt, replaceFrom,
//         insertAt, insertSeqAt } = require('./halib.js');

describe('Deleting lists:', () => { 
    describe('del', () => {
        it('removes the first occurence of the given value from an array/string', () => {
            expect(del(2)([1,2,3,2])).toEqual([1,3,2]);
            expect(del('b')('abcb')).toEqual('acb');
        });
        
        it('with arrays', () => {  
            const xss1 = [[1,1],[1,2],[1,3],[1,2],[1,3]];
            const xss1del = [[1,1],[1,3],[1,2],[1,3]];
                        
            expect(del([1,2])(xss1)).toEqual(xss1del);
        });
        
        it('returns an empty array/string when given an empty array/string', () => {
            expect(del(2)([])).toEqual([]);
            expect(del('b')('')).toEqual('');
        });
    });
    
    describe('delAll', () => {
        it('removes every value given from array/string', () => {
            expect(delAll(2)([1,2,3,2])).toEqual([1,3]);
            expect(delAll('b')('abcb')).toEqual('ac');
        });
        
        it('with arrays', () => {  
            const xss1 = [[1,1],[1,2],[1,3],[1,2],[1,3]];
            const xss1del = [[1,1],[1,3],[1,3]];
                        
            expect(delAll([1,2])(xss1)).toEqual(xss1del);
        });
        
        it('returns an empty array/string when given an empty array/string', () => {
            expect(delAll(2)([])).toEqual([]);
            expect(delAll('b')('')).toEqual('');
        });
    });

    describe('deleteSeq', () => {       
        it('returns the array/string given in second arg without the array/string given in first arg', () => {
            expect(deleteSeq([1,2]) ([1,2,3,4])).toEqual([3,4]);
            expect(deleteSeq([2,3]) ([1,2,3,4])).toEqual([1,4]);
            expect(deleteSeq([3,4]) ([1,2,3,4])).toEqual([1,2]);
            expect(deleteSeq('ab') ('abcd')).toEqual('cd');
            expect(deleteSeq('bc') ('abcd')).toEqual('ad');
            expect(deleteSeq('cd') ('abcd')).toEqual('ab');
            expect(deleteSeq('de') ('abcd')).toEqual('abcd');

        });
        
        it('with arrays', () => {  
            const xss1 = [      [1,2],[1,3]      ];
            const yss1 = [[1,1],[1,2],[1,3],[1,4]];
            const res1 = [[1,1],            [1,4]];
            
            const xss2 = [[1,1],[1,2]            ];
            const yss2 = [[1,1],[1,2],[1,3],[1,4]];
            const res2 = [            [1,3],[1,4]];
            
            
            expect(deleteSeq(xss1) (yss1)).toEqual(res1);
            expect(deleteSeq(xss2) (yss2)).toEqual(res2);
        });
                
        it('returns the second array/string if no infix is found', () => {
            expect(deleteSeq ([]) ([2,3,4])).toEqual([2,3,4]);
            expect(deleteSeq([4,5]) ([1,2,3,4])).toEqual([1,2,3,4]);
            expect(deleteSeq ('') ('bcd')).toEqual('bcd');
        });
        
        it('returns an empty array/string if the second arg is empty array/string', () => {
            expect(deleteSeq([1,2]) ([])).toEqual([]);
            expect(deleteSeq('ab') ('')).toEqual('');
        });
    });

    describe('deleteSeqAll', () => {       
        it('returns the array/string given in second arg without the array/string given in first arg', () => {
            expect(deleteSeqAll([1,2]) ([1,2,3,4,1,2,5,6,1,2])).toEqual([3,4,5,6]);
            expect(deleteSeqAll([2,3]) ([1,2,3,4,2,3])).toEqual([1,4]);
            expect(deleteSeqAll([3,4]) ([1,2,3,4,3,4,1,2])).toEqual([1,2,1,2]);
            expect(deleteSeqAll('ab') ('abcdabefab')).toEqual('cdef');
            expect(deleteSeqAll('bc') ('abcdebc')).toEqual('ade');
            expect(deleteSeqAll('cd') ('abcdcdab')).toEqual('abab');

        });
        
        it('with arrays', () => {  
            const xss1 = [      [1,2],[1,3]                  ];
            const yss1 = [[1,1],[1,2],[1,3],[1,4],[1,2],[1,3]];
            const res1 = [[1,1],            [1,4]            ];
            
            const xss2 = [[1,1],[1,2]                                    ];
            const yss2 = [[1,1],[1,2],[1,3],[1,4],[1,1],[1,2],[1,1],[1,2]];
            const res2 = [            [1,3],[1,4]                        ];
            
            
            expect(deleteSeqAll(xss1) (yss1)).toEqual(res1);
            expect(deleteSeqAll(xss2) (yss2)).toEqual(res2);
        });
                
        it('returns the second array/string if no infix is found', () => {
            expect(deleteSeqAll ([]) ([2,3,4])).toEqual([2,3,4]);
            expect(deleteSeqAll([4,5]) ([1,2,3,4])).toEqual([1,2,3,4]);
            expect(deleteSeqAll ('') ('bcd')).toEqual('bcd');
        });
        
        it('returns an empty array/string if the second arg is empty array/string', () => {
            expect(deleteSeqAll([1,2]) ([])).toEqual([]);
            expect(deleteSeqAll('ab') ('')).toEqual('');
        });
    });
    
    describe('deleteAt', () => {
        it('removes value at given index from array/string', () => {
            expect(deleteAt(2)([1,2,3])).toEqual([1,2]);
            expect(deleteAt(2)('abc')).toEqual('ab');
        });

        it('negative index', () => { 
            expect(deleteAt(-1)([1,2,3])).toEqual([1,2]);
            expect(deleteAt(-1)('abc')).toEqual('ab');
        });
        
        it('returns the given array/string when index is too great or too small', () => { 
            expect(deleteAt(3)([1,2,3])).toEqual([1,2,3]);
            expect(deleteAt(0)([])).toEqual([]);
            expect(deleteAt(3)('abc')).toEqual('abc');
            expect(deleteAt(0)('')).toEqual('');
        });
    });

    describe('deleteFrom', () => {
        it('removes n values from given index from array/string', () => {
            expect(deleteFrom(2)(4)([1,2,3,4,5,6,7,8,9])).toEqual([1,2,7,8,9]);
            expect(deleteFrom(2)(4)('abcdefghjk')).toEqual('abghjk');
        });

        it('great n', () => {
            expect(deleteFrom(2)(4)([1,2,3,4,5])).toEqual([1,2]);
            expect(deleteFrom(2)(4)('abcde')).toEqual('ab');
        });

        it('negative index', () => { 
            expect(deleteFrom(-1)(1)([1,2,3])).toEqual([1,2]);
            expect(deleteFrom(-1)(1)('abc')).toEqual('ab');
        });
        
        it('returns the given array/string when index is too great or too small', () => { 
            expect(deleteFrom(3)(1)([1,2,3])).toEqual([1,2,3]);
            expect(deleteFrom(0)(1)([])).toEqual([]);
            expect(deleteFrom(3)(1)('abc')).toEqual('abc');
            expect(deleteFrom(0)(1)('')).toEqual('');
        });

        it('throws an error when a negative n is given', () => { 
            expect(deleteFrom(2)(-2)([1,2,3,4,5])).toEqual([1,2,3,4,5]);
            expect(deleteFrom(2)(-1)('abcdefghjk')).toEqual('abcdefghjk');
        });
    });

    describe('deleteIndices', () => {
        it('removes values at given indices from array/string', () => {
            expect(deleteIndices([1,3])([1,2,3,4,5])).toEqual([1,3,5]);
            expect(deleteIndices([1,3])('abcde')).toEqual('ace');
        });
    });

    describe('keepIndices', () => {
        it('removes values at indices not given in first parameter from array/string', () => {
            expect(keepIndices([1,3])([1,2,3,4,5])).toEqual([2,4]);
            expect(keepIndices([1,3])('abcde')).toEqual('bd');
        });
    });
    
    describe('replace', () => {
        it('changes the first occurence of given value to value given in second arg', () => {
            expect(replace(2)(4)([1,2,3,2])).toEqual([1,4,3,2]);
            expect(replace('b')('d')('abcb')).toEqual('adcb');
        });
        
        it('with arrays', () => {  
            const xss1 = [[1,1],[1,2],[1,3],[1,2],[1,3]];
            const xss1repl = [[1,1],[1,8],[1,3],[1,2],[1,3]];
            
            expect(replace([1,2])([1,8])(xss1)).toEqual(xss1repl);
        });
        
        it('returns an empty array/string when given an empty array/string', () => {
            expect(replace(2)(4)([])).toEqual([]);
            expect(replace('b')('d')('')).toEqual('');
        });
    });
    
    describe('replaceAll', () => {
        it('changes every value given in first arg to value given in second arg', () => {
            expect(replaceAll(2)(4)([1,2,3,2])).toEqual([1,4,3,4]);
            expect(replaceAll('b')('d')('abcb')).toEqual('adcd');
        });
        
        it('with arrays', () => {  
            const xss1 = [[1,1],[1,2],[1,3],[1,2],[1,3]];
            const xss1repl = [[1,1],[1,8],[1,3],[1,8],[1,3]];
                        
            expect(replaceAll([1,2])([1,8])(xss1)).toEqual(xss1repl);
        });
        
        it('returns an empty array/string when given an empty array/string', () => {
            expect(replaceAll(2)(4)([])).toEqual([]);
            expect(replaceAll('b')('d')('')).toEqual('');
        });
    });

    describe('replaceSeq', () => {       
        it('returns the array/string given in second arg without the array/string in first arg' +
           'and with the list in second arg', () => {
            expect(replaceSeq([1,2])([6,7]) ([1,2,3,4])).toEqual([6,7,3,4]);
            expect(replaceSeq([2,3])([7,8,9]) ([1,2,3,4])).toEqual([1,7,8,9,4]);
            expect(replaceSeq([3,4])([7,8,9]) ([1,2,3,4])).toEqual([1,2,7,8,9]);
            expect(replaceSeq('ab')('xyz') ('abcd')).toEqual('xyzcd');
            expect(replaceSeq('bc')('xyz') ('abcd')).toEqual('axyzd');
            expect(replaceSeq('cd')('xy') ('abcd')).toEqual('abxy');
            expect(replaceSeq('de')('xy') ('abcd')).toEqual('abcd');

        });

        it('with arrays', () => {  
            const xss1 = [      [1,2],[1,3]      ];
            const xsd1 = [      [6,7],[8,9]      ];
            const yss1 = [[1,1],[1,2],[1,3],[1,4]];
            const res1 = [[1,1],[6,7],[8,9],[1,4]];
            
            expect(replaceSeq(xss1) (xsd1)(yss1)).toEqual(res1);
        });

        it('returns the second array/string if no infix is found', () => {
            expect(replaceSeq ([]) ([9])([2,3,4])).toEqual([2,3,4]);
            expect(replaceSeq([4,5])([9]) ([1,2,3,4])).toEqual([1,2,3,4]);
            expect(replaceSeq ('')('x') ('bcd')).toEqual('bcd');
        });
        
        it('returns an empty array/string if the second arg is empty array/string', () => {
            expect(replaceSeq([1,2])([9]) ([])).toEqual([]);
            expect(replaceSeq('ab')('x') ('')).toEqual('');
        });
    });

    describe('replaceSeqAll', () => {       
        it('returns the array/string given in second arg without the lists given in first arg' + 
           ' and with arrays/strings in third arg', () => {
            expect(replaceSeqAll([1,2])([7,8]) ([1,2,3,4,1,2,5,6,1,2])).toEqual([7,8,3,4,7,8,5,6,7,8]);
            expect(replaceSeqAll([2,3])([7,8])  ([1,2,3,4,2,3])).toEqual([1,7,8,4,7,8]);
            expect(replaceSeqAll([3,4])([7,8]) ([1,2,3,4,3,4,1,2])).toEqual([1,2,7,8,7,8,1,2]);
            expect(replaceSeqAll('ab')('xyz') ('abcdabefab')).toEqual('xyzcdxyzefxyz');
            expect(replaceSeqAll('bc')('xyz') ('abcdebc')).toEqual('axyzdexyz');
            expect(replaceSeqAll('cd')('xyz') ('abcdcdab')).toEqual('abxyzxyzab');
        });

        it('with arrays', () => {  
            const xss1 = [      [1,2],[1,3]                  ];
            const xsd1 = [      [6,7],[7,8]                  ];
            const yss1 = [[1,1],[1,2],[1,3],[1,4],[1,2],[1,3]];
            const res1 = [[1,1],[6,7],[7,8],[1,4],[6,7],[7,8]];
           
            expect(replaceSeqAll(xss1)(xsd1) (yss1)).toEqual(res1);
        });

        it('returns the second array/string if no infix is found', () => {
            expect(replaceSeqAll([])([9]) ([2,3,4])).toEqual([2,3,4]);
            expect(replaceSeqAll([4,5])([9]) ([1,2,3,4])).toEqual([1,2,3,4]);
            expect(replaceSeqAll('')('w') ('bcd')).toEqual('bcd');
        });
        
        it('returns an empty array/string if the second arg is empty array/string', () => {
            expect(replaceSeqAll([1,2])([9]) ([])).toEqual([]);
            expect(replaceSeqAll('ab')('x') ('')).toEqual('');
        });
    });
    
    describe('replaceAt', () => {
        it('changes value at given index to value given in second arg', () => {
            expect(replaceAt(2)(4)([1,2,3,2])).toEqual([1,2,4,2]);
            expect(replaceAt(2)('d')('abcb')).toEqual('abdb');
        });

        it('negative index', () => { 
            expect(replaceAt(-1)(4)([1,2,3,2])).toEqual([1,2,3,4]);
            expect(replaceAt(-1)('d')('abcb')).toEqual('abcd');
        });
        
        it('returns the given array/string when index is too great or too small', () => { 
            expect(replaceAt(4)(4)([1,2,3,2])).toEqual([1,2,3,2]);
            expect(replaceAt(0)(4)([])).toEqual([]);
            expect(replaceAt(4)('d')('abcb')).toEqual('abcb');
            expect(replaceAt(0)('d')('')).toEqual('');
        });
    });

    describe('replaceFrom', () => {
        it('changes n values from given index to values given in second arg', () => {
            expect(replaceFrom(2)(4)([9,9])([1,2,3,4,5,6,7,8,9])).toEqual([1,2,9,9,7,8,9]);
            expect(replaceFrom(2)(4)('xx')('abcdefgh')).toEqual('abxxgh');
        });

        it('great n', () => {
            expect(replaceFrom(-2)(4)([1,2,3,4]) ([1,2,3,4,5])).toEqual([1,2,3,1,2,3,4]);
            expect(replaceFrom(-2)(4)('xxx') ('abcde')).toEqual('abcxxx');
        });

        it('negative index', () => { 
            expect(replaceFrom(-5)(4)([9,9])([1,2,3,4,5,6,7,8,9])).toEqual([1,2,3,4,9,9,9]);
            expect(replaceFrom(-5)(4)('xx')('abcdefgh')).toEqual('abcxxh');
        });
        
        it('returns the given array/string when index is too great or too small', () => { 
            expect(replaceFrom(4)(4)([4])([1,2,3,2])).toEqual([1,2,3,2]);
            expect(replaceFrom(0)(4)([4])([])).toEqual([]);
            expect(replaceFrom(4)(4)('d')('abcb')).toEqual('abcb');
            expect(replaceFrom(0)(4)('d')('')).toEqual('');
        });

        it('throws an error when a negative n is given', () => { 
            expect(replaceFrom(2)(-2)([5])([1,2,3,4,5])).toEqual([1,2,5,3,4,5]);
            expect(replaceFrom(2)(-1)('x')('abcdefghjk')).toEqual('abxcdefghjk');
        });
    });

    describe('insertAt', () => {
        it('places value into array/string at given index', () => {
            expect(insertAt(2)(5)([1,2,3])).toEqual([1,2,5,3]);
            expect(insertAt(4)(4)([1,2,3,2])).toEqual([1,2,3,2,4]);
            expect(insertAt(0)(4)([])).toEqual([4]);
            expect(insertAt(2)('e')('abc')).toEqual('abec');
            expect(insertAt(4)('d')('abcb')).toEqual('abcbd');
            expect(insertAt(0)('d')('')).toEqual('d');
        });

        it('negative index', () => { 
            expect(insertAt(-1)(4)([1,2,3,2])).toEqual([1,2,3,4,2]);
            expect(insertAt(-1)('d')('abcb')).toEqual('abcdb');
        });
        
        it('returns the given array/string when index is too great or too small', () => { 
            expect(insertAt(5)(4)([1,2,3,2])).toEqual([1,2,3,2]);
            expect(insertAt(1)(4)([])).toEqual([]);
            expect(insertAt(5)('d')('abcb')).toEqual('abcb');
            expect(insertAt(1)('d')('')).toEqual('');
        });
    });

    describe('insertSeqAt', () => {
        it('places values into array/string at given index', () => {
            expect(insertSeqAt(2)([9,9,9])([1,2,3,4])).toEqual([1,2,9,9,9,3,4]);
            expect(insertSeqAt(0)([9,9,9])([])).toEqual([9,9,9]);
            expect(insertSeqAt(2)('xxx')('abc')).toEqual('abxxxc');
            expect(insertSeqAt(0)('xxx')('')).toEqual('xxx');
        });

        it('negative index', () => { 
            expect(insertSeqAt(-1)([9,9,9])([1,2,3,2])).toEqual([1,2,3,9,9,9,2]);
            expect(insertSeqAt(-1)('xxx')('abcb')).toEqual('abcxxxb');
        });
        
        it('returns the given array/string when index is too great or too small', () => { 
            expect(insertSeqAt(5)([9,9,9])([1,2,3,2])).toEqual([1,2,3,2]);
            expect(insertSeqAt(1)([9,9,9])([])).toEqual([]);
            expect(insertSeqAt(5)('xxx')('abcb')).toEqual('abcb');
            expect(insertSeqAt(1)('xxx')('')).toEqual('');
        });
    });
});
