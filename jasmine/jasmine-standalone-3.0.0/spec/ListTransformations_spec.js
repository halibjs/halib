//const { map, concat, concatMap, reverse, rotate, intersperse, group, count, section, sectionH,
//         sectionBy, sectionHBy, splitBy, shuffle, flatten, prod, diags1, diags2 } = require('./halib.js');
//const { toUpper, inc, id, elem, len, equal } = require('./halib.js');


describe('List transformations:', () => { 
    describe('map', () => {
        it('returns an array obtained by applying a function to each element of an array/string', () => {
            expect(map(inc)([1,2,3])).toEqual([2,3,4]);
            expect(map(toUpper)('abc')).toEqual(['A','B','C']);
            expect(map(toUpper)(['abc', 'def', 'ghj'])).toEqual(['ABC','DEF','GHJ']);
        });
        
        it('second arg can be a one-element array/string or an empty array/string', () => { 
            expect(map(inc)([4])).toEqual([5]);
            expect(map(toUpper)('a')).toEqual(['A']);
            expect(map(inc)([])).toEqual([]);
            expect(map(toUpper)('')).toEqual([]);
        });
    });

    describe('concat', () => {
        it('combines the element arrays/strings of an array', () => {
            const xss1 = [[1,2],[3,4],[5,6]],
                  concat1 = [1,2,3,4,5,6];
                
            const xss2 = [[1,2,[3,4]],[[5,6],7,8],[9,10,[11,12]]],
                  concat2 = [1,2,[3,4],[5,6],7,8,9,10,[11,12]];
                
            const xss3 = ['abc','def','ghj'],
                  concat3 = 'abcdefghj';
                
            const xss4 = ['abc', [4,5,6]],
                  concat4 = ['a','b','c',4,5,6];
            
            expect(concat(xss1)).toEqual(concat1);
            expect(concat(xss2)).toEqual(concat2);
            expect(concat(xss3)).toEqual(concat3);
            expect(concat(xss4)).toEqual(concat4);
        });
        
        it('returns empty arrays/strings if the supplied array has one or more empty arrays/strings element', () => {
            expect(concat([[]])).toEqual([]);
            expect(concat([''])).toEqual('');
            expect(concat([[],[],[]])).toEqual([]);
            expect(concat(['','',''])).toEqual('');
            expect(concat([[],''])).toEqual([]);
            expect(concat(['',[]])).toEqual([]);
        });
        
        it('returns empty array if the supplied array is empty', () => {
            expect(concat([])).toEqual([]);
        });
    });

    describe('concatMap', () => {
            const pair = x => [x, x];
            
        it('maps a function over the elements of an array/string and concats the resulting array', () => {      
            expect(concatMap(pair)([1,2,3])).toEqual([1,1,2,2,3,3]);
            expect(concatMap(toUpper)(['abc', 'def', 'ghj'])).toEqual('ABCDEFGHJ');
            expect(concatMap(toUpper)('abc')).toEqual('ABC');
        });
        
        it('second arg can be a one-element array/string or an empty array/string', () => {      
            expect(concatMap(pair)([1])).toEqual([1,1]);
            expect(concatMap(toUpper)('a')).toEqual('A');
            expect(concatMap(id)([[]])).toEqual([]);
            expect(concatMap(id)([''])).toEqual('');
            expect(concatMap(pair)([])).toEqual([]);
            expect(concatMap(toUpper)('')).toEqual([]);
        });
    });
        
    describe('reverse', () => {
        it('returns the elements of an array/string in opposite order', () => {            
            expect(reverse([1,2,3])).toEqual([3,2,1]);
            expect(reverse('abc')).toEqual('cba');
        });
        
        it('arg can be a one-element array/string or an empty list', () => { 
            expect(reverse([4])).toEqual([4]);
            expect(reverse('d')).toEqual('d');
            expect(reverse([])).toEqual([]);
            expect(reverse('')).toEqual('');
        });
    });

    describe('rotate', () => {
        it('moves the elements of an array/string to left or right according to the given parameter' , () => {            
            expect(rotate(-1)([1,2,3])).toEqual([2,3,1]);
            expect(rotate(1)('abc')).toEqual('cab');
        });
    });
    
    describe('intersperse', () => {
        it('places an element between the elements of an array/string', () => {
            expect(intersperse(0)([1,2,3])).toEqual([1,0,2,0,3]);
            expect(intersperse(':')('abc')).toEqual('a:b:c');
        });
        
        it('first arg can be an array/string ', () => { 
            expect(intersperse([1])([2,3,4])).toEqual([2,[1],3,[1],4]);
            expect(intersperse('ab')('bcd')).toEqual('babcabd');
        });
        
        it('second arg can be a two-element array/string', () => { 
            expect(intersperse(0)([1,2])).toEqual([1,0,2]);
            expect(intersperse('a')('bc')).toEqual('bac');
        });
        
        it('second arg can be a one-element array/string or empty array/string - without placement', () => { 
            expect(intersperse(1)([4])).toEqual([4]);
            expect(intersperse('a')('b')).toEqual('b');
            expect(intersperse(1)([])).toEqual([]);
            expect(intersperse('a')('')).toEqual('');
        });
        
        it('mixed args are possible', () => { 
            expect(intersperse(0)('abc')).toEqual('a0b0c');
            expect(intersperse('a')([1,2,3])).toEqual([1,'a',2,'a',3]);
            expect(intersperse(0)('a')).toEqual('a');
            expect(intersperse('a')([1])).toEqual([1]);
            expect(intersperse(0)('')).toEqual('');
            expect(intersperse('a')([])).toEqual([]);
        });
    });

    describe('group', () => {
        it('groups the elements of the given array/string' , () => {
            expect(group ([1,2,2,3,2])).toEqual([[1],[2,2,2],[3]]);
            expect(group ('abbcb')).toEqual(['a','bbb','c']);
        });

        it('returns an empty array given an empty list', () => {
            expect(group ([])).toEqual([]);
            expect(group ('')).toEqual([]);
        });
    });

    describe('count', () => {
        it('returns the elements and the number of occurences belonging to it wrapped in an array', () => {
            expect(count ([-1,2,1,1,-2,2])).toEqual([[-1,1],[2,2],[1,2],[-2,1]]);
            expect(count ('aAaBbbccCaA')).toEqual([['a',3],['A',2],['B',1],['b',2],['c',2],['C',1]]);
        });

        it('returns an empty array given an empty list', () => {
            expect(count ([])).toEqual([]);
            expect(count ('')).toEqual([]);
        });
    });

    describe('section', () => {
        it('each sublist in result contains only equal elements', () => {         
            expect(section([1,2,2,1,1,2,2])).toEqual([[1], [2,2], [1,1], [2,2]]);
            expect(section('abbaabb')).toEqual(['a','bb','aa','bb']);
        });
        
        it('returns an empty array when given an empty array/string', () => {
            expect(section([])).toEqual([]);
            expect(section('')).toEqual([]);
        });
    });

    describe('sectionH', () => {
        it('each sublist in result contains only equal elements', () => {         
            expect(sectionH([1,2,2,1,1,2,2])).toEqual([1,2,1,2]);
            expect(sectionH('abbaabb')).toEqual('abab');
        });
        
        it('returns an empty array when given an empty array/string', () => {
            expect(sectionH([])).toEqual([]);
            expect(sectionH('')).toEqual('');
        });
    });

    describe('sectionBy', () => {
        it('analogous to section, with user supplied equality', () => {         
            expect(sectionBy(id)([1,1,2,2,1,1])).toEqual([[1,1], [2,2],[1,1]]);
            expect(sectionBy(id)('aabbaa')).toEqual(['aa','bb','aa']);
            expect(sectionBy(equal)([1,1,2,2,1,1])).toEqual([[1,1], [2,2],[1,1]]);
            expect(sectionBy(equal)('aabbaa')).toEqual(['aa','bb','aa']);
        });
        
        it('with objects', () => {
            const persons = [{age:1},{age:1},{age:2},{age:2},{age:1},{age:1}];
            const age = p => p.age;
            const eqAge = (p1, p2) => p1.age === p2.age;
            expect(sectionBy(age)(persons)).toEqual([[{age:1},{age:1}],[{age:2},{age:2}],[{age:1},{age:1}]]);
            expect(sectionBy(eqAge)(persons)).toEqual([[{age:1},{age:1}],[{age:2},{age:2}],[{age:1},{age:1}]]);
        });

        it('same with arrays', () => {
            const xss1 = [[1,1],[1,2],[1,2]];
            const yss1 = [[[1,1]], [[1,2],[1,2]]];
            
            const xss2 = [[1,1],[1,2],[1,2],1,1];
            const yss2 = [[[1,1]], [[1,2],[1,2]],[1,1]];
              
            expect(sectionBy(equal) (xss1)).toEqual(yss1);
            expect(sectionBy(equal) (xss2)).toEqual(yss2);
        });
        
        it('returns an empty array when given an empty list', () => {
            expect(sectionBy(id)([])).toEqual([]);
            expect(sectionBy(id)('')).toEqual([]);
        });
    });

    describe('sectionHBy', () => {
        it('analogous to section, with user supplied equality', () => {         
            expect(sectionHBy(id)([1,1,2,2,1,1])).toEqual([1,2,1]);
            expect(sectionHBy(id)('aabbaa')).toEqual('aba');
            expect(sectionHBy(equal)([1,1,2,2,1,1])).toEqual([1,2,1]);
            expect(sectionHBy(equal)('aabbaa')).toEqual('aba');
        });
        
        it('with objects', () => {
            const persons = [{age:1},{age:1},{age:2},{age:2},{age:1},{age:1}];
            const age = p => p.age;
            const eqAge = (p1, p2) => p1.age === p2.age;
            expect(sectionHBy(age)(persons)).toEqual([{age:1},{age:2},{age:1}]);
            expect(sectionHBy(eqAge)(persons)).toEqual([{age:1},{age:2},{age:1}]);
        });

        it('returns an empty array when given an empty list', () => {
            expect(sectionHBy(id)([])).toEqual([]);
            expect(sectionHBy(id)('')).toEqual('');
        });
    });

    describe('splitBy', () => {
        it('breaks up an array/string into chunks, length of a chunk given in first parameter', () => {          
            expect(splitBy(2)([1,2,3,4,5,6])).toEqual([[1,2],[3,4],[5,6]]);
            expect(splitBy(2)('abcdef')).toEqual(['ab','cd','ef']);
            expect(splitBy(3)([1,2,3,4,5,6])).toEqual([[1,2,3],[4,5,6]]);
            expect(splitBy(3)('abcdef')).toEqual(['abc','def']);
        });
        
        it('if the array/string can not be broken up evenly, last chunk will contain rest', () => { 
            expect(splitBy(2)([1,2,3,4,5,6,7])).toEqual([[1,2],[3,4],[5,6],[7]]);
            expect(splitBy(2)('abcdefg')).toEqual(['ab','cd','ef','g']);
            expect(splitBy(3)([1,2,3,4,5,6,7])).toEqual([[1,2,3],[4,5,6],[7]]);
            expect(splitBy(3)('abcdefg')).toEqual(['abc','def','g']);
        });
        
        it('returns empty array when given an empty array/string', () => { 
            expect(splitBy(2)([])).toEqual([]);
            expect(splitBy(2)('')).toEqual([]);
        });
        
        it('returns an empty array given less than 1 value as length of chunks', () => { 
            expect(splitBy(0)([1,2,3])).toEqual([]);
            expect(splitBy(0)('abc')).toEqual([]);
            expect(splitBy(-1)([1,2,3])).toEqual([]);
            expect(splitBy(-1)('abc')).toEqual([]);
        });
    });

    describe('shuffle', () => {
        it('creates a random permutation from the given array/string', () => {
            expect(elem (shuffle ([1,2,3])) ([[1,2,3], [1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]])).toEqual(true);
            expect(elem (shuffle ('abc')) (['abc', 'acb', 'bac', 'bca', 'cab', 'cba'])).toEqual(true);
        });
    });

    describe('flatten', () => {
        it('returns an unnested array whose elements are taken from supplied nested array', () => {          
            expect(flatten([[[1,2],3,4,[[[5,6]]]]])).toEqual([1,2,3,4,5,6]);
        });
        
        it('returns empty array when given an empty array', () => { 
            expect(flatten([])).toEqual([]);
            expect(flatten('')).toEqual([]);
        });
    });

    describe('prod', () => {
        const nums = [1,2,3];
        const res = [[1,1],[1,2],[1,3], [2,1],[2,2],[2,3],[3,1],[3,2],[3,3]];
        it('returns all the combinations of the given array/string members', () => {  
            expect(prod(nums)(nums)).toEqual(res);
        });
    });

    describe('diags1', () => {
        it('returns the south-east to north-west diagonals of the given array', () => {  
            expect(diags1([[1,2,3],[4,5,6]])).toEqual([[1],[4,2],[5,3],[6]]);
            expect(diags1(['abc','def'])).toEqual(['a','db','ec','f']);
        });
    });

    describe('diags2', () => {
        it('returns the north-east to south-west diagonals of the given array', () => {  
            expect(diags2([[1,2,3],[4,5,6]])).toEqual([[4],[1,5],[2,6],[3]]);
            expect(diags2(['abc','def'])).toEqual(['d','ae','bf','c']);
        });
    });
});




















