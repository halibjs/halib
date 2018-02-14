const { zip, zipWith, unzip, transpose, tpLongest, rotateL, rotateR } = require('./halib.js');
const { toUpper } = require('./halib.js');



describe('Zipping lists:', () => {
    describe('zip', () => {
        it('creates an array by pairing elements at same position from the given arrays/strings', () => {
            expect(zip([1,2,3])([4,5,6])).toEqual([[1,4], [2,5], [3,6]]);
            expect(zip('abc')('def')).toEqual(['ad', 'be', 'cf']);
        });
        
        it('returns an array the same length as its shortest argument', () => {
            expect(zip([1])([2,3])).toEqual([[1,2]]);
            expect(zip('a')('bc')).toEqual(['ab']);
        });
        
        it('returns an empty array if one or both args are empty arrays/strings', () => {
            expect(zip([])([2,3])).toEqual([]);
            expect(zip('')('bc')).toEqual([]);
            expect(zip([1])([])).toEqual([]);
            expect(zip('a')('')).toEqual([]);
            expect(zip([])([])).toEqual([]);
            expect(zip('')('')).toEqual([]);
        });
    });
        
    describe('zipWith', () => {
            const add = (a, b) => a + b;
            const toUC = (a, b) => toUpper (a) + toUpper (b);
            
        it(`creates an array applying the given function to the elements at the same position 
            from the given arrays/strings`, () => {              
            expect(zipWith(add) ([1,2,3]) ([4,5,6])).toEqual([5,7,9]);  
            expect(zipWith(toUC) ('abc') ('def')).toEqual(['AD','BE','CF']);  
        });
        
        it('produces the same output as `zip` when given a pairing function', () => {
            const pair = (a, b) => [a, b];
            const pairc = (a, b) => a + b;
            
            expect(zipWith(pair) ([1,2,3]) ([4,5,6])).toEqual(zip([1,2,3]) ([4,5,6])); 
            expect(zipWith(pairc) ('abc') ('def')).toEqual(zip('abc') ('def')); 
        });
        
        it('returns an empty array if any args are empty array/string', () => {
            expect(zipWith(add)([])([4,5,6])).toEqual([]);
            expect(zipWith(toUC)('')('def')).toEqual([]);
            expect(zipWith(add)([1])([])).toEqual([]);
            expect(zipWith(toUC)('a')('')).toEqual([]);
        });
    });
            
    describe('unzip', () => {
        it('interchanges rows and columns of a 2D array', () => {});
    });
    
    describe('transpose', () => {
        it('same as unzip, only their names are different', () => {
            const xss1 = [[1,2,3],[4,5,6],[7,8,9],[10,11,12]];
            const transposed1 = [[1,4,7,10],[2,5,8,11],[3,6,9,12]];
              
            const xss2 = [[1,2,3],[4,5,6],[7,8,9]];
            const transposed2 = [[1,4,7],[2,5,8],[3,6,9]];
            
            const xss3 = ['abc', 'def', 'ghj', 'klm'];
            const transposed3 = ['adgk','behl','cfjm'];
            
            const xss4 = ['abc', 'def', 'ghj'];
            const transposed4 = ['adg','beh','cfj'];
                      
            expect(transpose(xss1)).toEqual(transposed1);
            expect(transpose(xss2)).toEqual(transposed2);          
            expect(transpose(xss3)).toEqual(transposed3);
            expect(transpose(xss4)).toEqual(transposed4);
        });
        
        it('the length of result is the length of the shortest element in supplied array', () => { 
            expect(transpose([[1], [4,5], [7,8,9]])).toEqual([[1,4,7]]);
            expect(transpose(['a', 'bc', 'def'])).toEqual(['abd']);
            expect(transpose([[1, 2, 3]])).toEqual([[1], [2], [3]]);           
            expect(transpose([[4]])).toEqual([[4]]);
            expect(transpose(['abc'])).toEqual(['a','b','c']);           
            expect(transpose(['a'])).toEqual(['a']);
        });
        
        it('returns empty array if there is an empty array/string in supplied array ', () => {
            expect(transpose([[],[1,2,3]])).toEqual([]);
            expect(transpose(['','abc'])).toEqual([]);
            expect(transpose([[]])).toEqual([]);
            expect(transpose([''])).toEqual([]);
        });
        
        it('returns empty array if the supplied array is empty', () => { 
            expect(transpose([])).toEqual([]);
        });
    });

    describe('tpLongest', () => {
        it(`Same as transpose, but the length of the result array is that of the
            longest member of the given matrix.`, () => {
            const xss1 = [[1,2,3],[4,5,6],[7,8,9],[10,11,12]];
            const transposed1 = [[1,4,7,10],[2,5,8,11],[3,6,9,12]];
              
            const xss2 = [[1,2,3],[4,5,6],[7,8,9]];
            const transposed2 = [[1,4,7],[2,5,8],[3,6,9]];
            
            const xss3 = ['abc', 'def', 'ghj', 'klm'];
            const transposed3 = ['adgk','behl','cfjm'];
            
            const xss4 = ['abc', 'def', 'ghj'];
            const transposed4 = ['adg','beh','cfj'];
                      
            expect(tpLongest(xss1)).toEqual(transposed1);
            expect(tpLongest(xss2)).toEqual(transposed2);          
            expect(tpLongest(xss3)).toEqual(transposed3);
            expect(tpLongest(xss4)).toEqual(transposed4);
        });
        
        it('the length of result is the length of the longest element in supplied array', () => { 
            expect(tpLongest([[1], [4,5], [7,8,9]])).toEqual([[1,4,7],[5,8],[9]]);
            expect(tpLongest(['a', 'bc', 'def'])).toEqual(['abd','ce','f']);
            expect(tpLongest([[1, 2, 3]])).toEqual([[1], [2], [3]]);           
            expect(tpLongest([[4]])).toEqual([[4]]);
            expect(tpLongest(['abc'])).toEqual(['a','b','c']);           
            expect(tpLongest(['a'])).toEqual(['a']);
        });
                
        it('returns empty array if the supplied array is empty', () => { 
            expect(tpLongest([])).toEqual([]);
        });
    });

    describe('rotateL', () => {
        it('rotates the given array to the left', () => {
            const xss1 = [[1,2,3],[4,5,6],[7,8,9],[10,11,12]];
            const res1 = [[3,6,9,12],[2,5,8,11],[1,4,7,10]];
              
            const xss2 = [[1,2,3],[4,5,6],[7,8,9]];
            const res2 = [[3,6,9],[2,5,8],[1,4,7]];
            
            const xss3 = ['abc', 'def', 'ghj', 'klm'];
            const res3 = ['cfjm','behl','adgk'];
            
            const xss4 = ['abc', 'def', 'ghj'];
            const res4 = ['cfj','beh','adg'];
                      
            expect(rotateL(xss1)).toEqual(res1);
            expect(rotateL(xss2)).toEqual(res2);          
            expect(rotateL(xss3)).toEqual(res3);
            expect(rotateL(xss4)).toEqual(res4);
        });
        
        it('the length of result is the length of the shortest element in supplied array', () => { 
            expect(rotateL([[1], [4,5], [7,8,9]])).toEqual([[1,4,7]]);
            expect(rotateL(['a', 'bc', 'def'])).toEqual(['abd']);
            expect(rotateL([[1, 2, 3]])).toEqual([[3], [2], [1]]);           
            expect(rotateL([[4]])).toEqual([[4]]);
            expect(rotateL(['abc'])).toEqual(['c','b','a']);           
            expect(rotateL(['a'])).toEqual(['a']);
        });
        
        it('returns empty array if there is an empty array/string in supplied array ', () => {
            expect(rotateL([[],[1,2,3]])).toEqual([]);
            expect(rotateL(['','abc'])).toEqual([]);
            expect(rotateL([[]])).toEqual([]);
            expect(rotateL([''])).toEqual([]);
        });
        
        it('returns empty array if the supplied array is empty', () => { 
            expect(rotateL([])).toEqual([]);
        });
    });

    describe('rotateR', () => {
        it('rotates the given array to the right', () => {
            const xss1 = [[1,2,3],[4,5,6],[7,8,9],[10,11,12]];
            const res1 = [[10,7,4,1],[11,8,5,2],[12,9,6,3]];
              
            const xss2 = [[1,2,3],[4,5,6],[7,8,9]];
            const res2 = [[7,4,1],[8,5,2],[9,6,3]];
            
            const xss3 = ['abc', 'def', 'ghj', 'klm'];
            const res3 = ['kgda','lheb','mjfc'];
            
            const xss4 = ['abc', 'def', 'ghj'];
            const res4 = ['gda','heb','jfc'];
                      
            expect(rotateR(xss1)).toEqual(res1);
            expect(rotateR(xss2)).toEqual(res2);          
            expect(rotateR(xss3)).toEqual(res3);
            expect(rotateR(xss4)).toEqual(res4);
        });
        
        it('the length of result is the length of the shortest element in supplied array', () => { 
            expect(rotateR([[1], [4,5], [7,8,9]])).toEqual([[7,4,1]]);
            expect(rotateR(['a', 'bc', 'def'])).toEqual(['dba']);
            expect(rotateR([[1, 2, 3]])).toEqual([[1], [2], [3]]);           
            expect(rotateR([[4]])).toEqual([[4]]);
            expect(rotateR(['abc'])).toEqual(['a','b','c']);           
            expect(rotateR(['a'])).toEqual(['a']);
        });
        
        it('returns empty array if there is an empty array/string in supplied array ', () => {
            expect(rotateR([[],[1,2,3]])).toEqual([]);
            expect(rotateR(['','abc'])).toEqual([]);
            expect(rotateR([[]])).toEqual([]);
            expect(rotateR([''])).toEqual([]);
        });
        
        it('returns empty array if the supplied array is empty', () => { 
            expect(rotateR([])).toEqual([]);
        });
    });
});
