//const { subsequences, cartProd, combinations, combRep, permutations, permK, permRep,
//        bindL, returnL, guardL, liftM2L, foldM, bindR, returnR, liftM2R, divx } = require('./halib.js');
//const { id } = require('./halib.js');
        

describe('Combinatorics:', () => { 
    describe('subsequences', () => {
        it('Returns all subsets of the given array/string', () => {
            expect(subsequences([1,2,3])).toEqual([[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]);
            expect(subsequences('abc')).toEqual(['','a','b','ab','c','ac','bc','abc']);
        });
    });

    describe('cartProd', () => {
        it('Returns all the product sets from the member arrays/strings of an array', () => {
            expect(cartProd([[1,2],[3,4],[5,6]])).
                                  toEqual([[1,3,5],[1,3,6],[1,4,5],[1,4,6],[2,3,5],[2,3,6],[2,4,5],[2,4,6]]);
            expect(cartProd(['ab','cd','ef'])).toEqual(['ace','acf','ade','adf','bce','bcf','bde','bdf']);
        });
    });
    
    describe('combinations', () => {
        it(`returns all the choices (of given length) from a collection, without repetition,
            order does not matter`, () => {
            const a = [1, 2],
                  b = 'ab',
                  c = [1, 2, 3],
                  d = 'abcd',
                  e = [[1,2],[3,4]],
                  f = ['ab','cd'],
                  g = [[1,2],[3,4],[5,6]],
                  k = ['ab', 'cd', 'ef'];
                
            const ares0 = [[]];
            const bres0 = [''];
            const cres0 = [[]];
            const dres0 = [''];
            const eres0 = [[]];
            const fres0 = [[]];
            const gres0 = [[]];
            const kres0 = [[]];
            
            const ares1 = [[1], [2]];
            const bres1 = ['a','b'];
            const cres1 = [[1], [2], [3]];
            const dres1 = ['a','b','c','d'];
            const eres1 = [[[1,2]],[[3,4]]];
            const fres1 = [['ab'],['cd']];
            const gres1 = [[[1,2]],[[3,4]],[[5,6]]];
            const kres1 = [['ab'],['cd'],['ef']];
            
            const ares2 = [[1, 2]];
            const bres2 = ['ab'];
            const cres2 = [[1, 2], [1, 3], [2, 3]];
            const dres2 = ['ab','ac','ad','bc','bd','cd'];
            const eres2 = [[[1,2],[3,4]]];
            const fres2 = [['ab','cd']];
            const gres2 = [[[1,2],[3,4]],[[1,2],[5,6]],[[3,4],[5,6]]];
            const kres2 = [['ab','cd'],['ab','ef'],['cd','ef']];
            
            const ares3 = [[]];
            const bres3 = [''];
            const cres3 = [[1, 2, 3]];
            const dres3 = ['abc','abd','acd','bcd'];
            const eres3 = [[]];
            const fres3 = [[]];
            const gres3 = [[[1,2],[3,4],[5,6]]];
            const kres3 = [['ab','cd','ef']];
            
            const dres4 = ['abcd'];
            
            expect(combinations(0)(a)).toEqual(ares0);
            expect(combinations(0)(b)).toEqual(bres0);
            expect(combinations(0)(c)).toEqual(cres0);
            expect(combinations(0)(d)).toEqual(dres0);
            expect(combinations(0)(e)).toEqual(eres0);
            expect(combinations(0)(f)).toEqual(fres0);
            expect(combinations(0)(g)).toEqual(gres0);
            expect(combinations(0)(k)).toEqual(kres0);
            
            expect(combinations(1)(a)).toEqual(ares1);
            expect(combinations(1)(b)).toEqual(bres1);
            expect(combinations(1)(c)).toEqual(cres1);
            expect(combinations(1)(d)).toEqual(dres1);
            expect(combinations(1)(e)).toEqual(eres1);
            expect(combinations(1)(f)).toEqual(fres1);
            expect(combinations(1)(g)).toEqual(gres1);
            expect(combinations(1)(k)).toEqual(kres1);
            
            expect(combinations(2)(a)).toEqual(ares2);
            expect(combinations(2)(b)).toEqual(bres2);
            expect(combinations(2)(c)).toEqual(cres2);
            expect(combinations(2)(d)).toEqual(dres2);
            expect(combinations(2)(e)).toEqual(eres2);
            expect(combinations(2)(f)).toEqual(fres2);
            expect(combinations(2)(g)).toEqual(gres2);
            expect(combinations(2)(k)).toEqual(kres2);
            
            expect(combinations(3)(a)).toEqual(ares3);
            expect(combinations(3)(b)).toEqual(bres3);
            expect(combinations(3)(c)).toEqual(cres3);
            expect(combinations(3)(d)).toEqual(dres3);
            expect(combinations(3)(e)).toEqual(eres3);
            expect(combinations(3)(f)).toEqual(fres3);
            expect(combinations(3)(g)).toEqual(gres3);
            expect(combinations(3)(k)).toEqual(kres3);
            
            expect(combinations(4)(d)).toEqual(dres4);
        });
    });

    describe('combRep', () => {
        it('returns all the choices (of given length) from an array/string, with repetition, order does not matter', () => {
            expect(combRep (2) ([1,2,3])).toEqual([[1,1],[1,2],[1,3],[2,2],[2,3],[3,3]]);
            expect(combRep (2) ('abc')).toEqual(['aa','ab','ac','bb','bc','cc']);
        });
    });
    
    describe('permutations', () => {
        it('returns all the possible orderings of a given list without repetitions', () => { 
            const a = [1,2],
                  b = 'ab',
                  c = [1,2,3],
                  d = 'abc',
                  e = [[1,2],[3,4]],
                  f = ['ab', 'cd'],
                  g = [[1,2],[3,4],[5,6]],
                  k = ['ab', 'cd', 'ef'];
                
            const ares = [[1, 2], [2, 1]],
                  bres = ['ab', 'ba'],
                  cres = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
                  dres = ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'],
                  eres = [[[1,2],[3,4]],[[3,4],[1,2]]],
                  fres = [['ab', 'cd'], ['cd', 'ab']],
                  gres = [[[1,2],[3,4],[5,6]],[[1,2],[5,6],[3,4]],[[3,4],[1,2],[5,6]],
                          [[3,4],[5,6],[1,2]],[[5,6],[1,2],[3,4]],[[5,6],[3,4],[1,2]]],
                  kres = [['ab', 'cd', 'ef'],['ab','ef','cd'],['cd','ab','ef'],
                          ['cd', 'ef', 'ab'],['ef','ab','cd'],['ef','cd','ab']];
                
            expect(permutations(a)).toEqual(ares);
            expect(permutations(b)).toEqual(bres);            
            expect(permutations(c)).toEqual(cres);
            expect(permutations(d)).toEqual(dres);            
            expect(permutations(e)).toEqual(eres);
            expect(permutations(f)).toEqual(fres);            
            expect(permutations(g)).toEqual(gres);
            expect(permutations(k)).toEqual(kres);            
        });

            
        it('returns an array with initial value when given one element list', () => { 
            expect(permutations([1])).toEqual([[1]]);
            expect(permutations('a')).toEqual(['a']);
        });
        
        it('returns an empty list in array if empty list supplied', () => { 
            expect(permutations([])).toEqual([[]]);
            expect(permutations('')).toEqual(['']);
        });
    });

    describe('permK', () => {
        it('Returns all the choices (of given length) from an array/string, without repetition, order matters', () => {
            expect(permK (2) ([1,2,3])).toEqual([[1,2],[1,3],[2,1],[2,3],[3,1],[3,2]]);
            expect(permK (2) ('abc')).toEqual(['ab','ac','ba','bc','ca','cb']);
        });
    });

    describe('permRep', () => {
        it('returns all the choices (of given length) from an array/string, with repetition, order matters', () => {
            expect(permRep (2) ([1,2,3])).toEqual([[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]]);
            expect(permRep (2) ('abc')).toEqual(['aa','ab','ac','ba','bb','bc','ca','cb','cc']);
        });
    });
});




describe('Monads:', () => { 
    
    
        describe('bindL', () => {
            const nums = [1,2,3];
            
            const res1 = bindL (nums)
                   (a => returnL ([a]));
            const fn1 = x => [x];
            const res2 = bindL (nums)
                   (a => returnL (fn1 (a)));
            const arr1 = [[1], [2], [3]];
                   
            const res3 = bindL (nums)
                   (a => bindL (nums)
                   (b => returnL ([a, b])));
            const fn2 = (x, y) => [x, y];
            const res4 = bindL (nums)
                   (a => bindL (nums)
                   (b => returnL (fn2 (a, b))));
            const arr2 = [[1,1],[1,2],[1,3], [2,1],[2,2],[2,3],[3,1],[3,2],[3,3]];
                   
            const res5 = bindL (nums)
                   (a => bindL (nums)
                   (b => bindL (nums)
                   (c => returnL ([a, b, c]))));
            const fn3 = (x, y, z) => [x, y, z];
            const res6 = bindL (nums)
                   (a => bindL (nums)
                   (b => bindL (nums)
                   (c => returnL (fn3 (a, b, c)))));
            const arr3 = [[1,1,1],[1,1,2],[1,1,3],[1,2,1],[1,2,2],[1,2,3],[1,3,1],[1,3,2],[1,3,3],
                          [2,1,1],[2,1,2],[2,1,3],[2,2,1],[2,2,2],[2,2,3],[2,3,1],[2,3,2],[2,3,3],
                          [3,1,1],[3,1,2],[3,1,3],[3,2,1],[3,2,2],[3,2,3],[3,3,1],[3,3,2],[3,3,3]];
    
            const str = 'abc';
            
            const res1b = bindL (str)
                   (a => returnL (a));
            const fn1b = x => x;
            const res2b = bindL (str)
                   (a => returnL (fn1b (a)));
            const arr1b = ['a','b','c'];
                   
            const res3b = bindL (str)
                   (a => bindL (str)
                   (b => returnL (a + b)));
            const fn2b = (x, y) => x + y;
            const res4b = bindL (str)
                   (a => bindL (str)
                   (b => returnL (fn2b (a, b))));
            const arr2b = ['aa','ab','ac', 'ba','bb','bc','ca','cb','cc'];
                   
            const res5b = bindL (str)
                   (a => bindL (str)
                   (b => bindL (str)
                   (c => returnL (a + b + c))));
            const fn3b = (x, y, z) => x + y + z;
            const res6b = bindL (str)
                   (a => bindL (str)
                   (b => bindL (str)
                   (c => returnL (fn3b (a, b, c)))));
            const arr3b = ['aaa','aab','aac','aba','abb','abc','aca','acb','acc',
                          'baa','bab','bac','bba','bbb','bbc','bca','bcb','bcc',
                          'caa','cab','cac','cba','cbb','cbc','cca','ccb','ccc'];
    
                          
            it('list monad function', () => {  
                expect(res1).toEqual(arr1);
                expect(res2).toEqual(arr1);
                expect(res3).toEqual(arr2);
                expect(res4).toEqual(arr2);
                expect(res5).toEqual(arr3);
                expect(res6).toEqual(arr3);
    
                expect(res1b).toEqual(arr1b);
                expect(res2b).toEqual(arr1b);
                expect(res3b).toEqual(arr2b);
                expect(res4b).toEqual(arr2b);
                expect(res5b).toEqual(arr3b);
                expect(res6b).toEqual(arr3b);
            });
        });
        
        describe('returnL', () => {
            it('returns the given parameter wrapped in an array', () => {  
                expect(returnL(1)).toEqual([1]);
            });
        });
        
        describe('guardL', () => {
            const res1 = guardL (true)
                   (_ => returnL (['x']));
            const res2 = bindL ([0])
                   (_ => returnL (['x']));
            const res3 = guardL (false)
                   (_ => returnL (['x']));
            const res4 = bindL ([])
                   (_ => returnL (['x']));
            it('same as bindL called with an empty or one-member array depending on given boolean parameter', () => {
                expect(res1).toEqual(res2);
                expect(res1).toEqual([['x']]);
                expect(res3).toEqual(res4);
                expect(res3).toEqual([]);
            });
        });
            
        describe('liftM2L', () => {
            const nums = [1,2,3];
            const fn = (x, y) => [x, y];
            const res = bindL (nums)
                  (a => bindL (nums)
                  (b => returnL (fn (a, b))));
            const arr = [[1,1],[1,2],[1,3], [2,1],[2,2],[2,3],[3,1],[3,2],[3,3]];
            it('simplified list monad function with 2 array parameters', () => {  
                expect(liftM2L(fn)(nums)(nums)).toEqual(res);
                expect(liftM2L(fn)(nums)(nums)).toEqual(arr);
            });
    
            const str = 'abc';
            const fnb = (x, y) => x + y;
            const resb = bindL (str)
                  (a => bindL (str)
                  (b => returnL (fnb (a, b))));
            const arrb = ['aa','ab','ac','ba','bb','bc','ca','cb','cc'];
            it('simplified list monad function with 2 string parameters', () => {  
                expect(liftM2L(fnb)(str)(str)).toEqual(resb);
                expect(liftM2L(fnb)(str)(str)).toEqual(arrb);
            });
        });
    
        describe('foldM', () => {
            it('the same as foldl, but returns an array and takes a function which must return an array', () => {  
                expect(foldM ((a, b) => [a + b]) (0) ([1,2,3])).toEqual([6]);
                expect(foldM ((a, b) => [a - b, a + b]) (0) ([1,2,3])).toEqual([-6,0,-2,4,-4,2,0,6]);
            });
        });
    
            
        describe('bindR', () => {
            const plus = a => b => a + b;
            const mply = a => b => a * b;
            
            const rm1 = bindR (plus(2))
                   (x => returnR (x));
            const fn1 = id;
            const rm2 = bindR (plus(2))
                   (x => returnR (fn1(x)));
                   
            const rm3 = bindR (plus(2))
                  (x => bindR (mply(3))
                  (y => returnR (x + y)));
            const fn2 = x => y => x + y;
            const rm4 = bindR (plus(2))
                  (x => bindR (mply(3))
                  (y => returnR (fn2 (x) (y))));
                  
            const rm5 = bindR (plus(2))
                  (x => bindR (mply(3))
                  (y => bindR (plus(5))
                  (z => returnR (x + y + z))));
            const fn3 = x => y => z => x + y + z;
            const rm6 = bindR (plus(2))
                  (x => bindR (mply(3))
                  (y => bindR (plus(5))
                  (z => returnR (fn3(x)(y)(z)))));
                  
            it('reader monad function', () => {  
                expect(rm1(4)).toEqual(6);
                expect(rm2(4)).toEqual(6);
                expect(rm3(4)).toEqual(18);
                expect(rm4(4)).toEqual(18);
                expect(rm5(4)).toEqual(27);
                expect(rm6(4)).toEqual(27);
            });
        });
        
        describe('returnR', () => {
            it('when invoked with 1 returns a function that when invoked returns 1', () => {
                expect(returnR(1)()).toEqual(1);
            });
        });
            
        describe('liftM2R', () => {
            const plus = a => b => a + b;
            const mply = a => b => a * b;
            
            const fn = (x, y) => x + y;
            const rm1 = liftM2R (fn) (plus(2)) (mply(3));
            const rm2 = bindR (plus(2))
                  (x => bindR (mply(3))
                  (y => returnR (fn (x, y))));
            it('simplified reader monad function with 2 additional function parameters', () => {  
                expect(rm1(4)).toEqual(rm2(4));
                expect(rm1(4)).toEqual(18);
            });
        });
    
        describe('divx', () => {
            const add = x => x + 1;
            const subtract = x => x - 1;
            it(`applies the given functions to the third parameter and returns
                the results wrapped in an array`, () => {
                expect(divx (add) (subtract) (4)).toEqual([5, 3]);
            });
        });
    
    
    });
    




























































