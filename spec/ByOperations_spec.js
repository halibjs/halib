const { nubBy, minusBy, deleteAllBy, keepAllBy, intersectBy, differenceBy, unionBy, uniqBy, elemBy,
         groupBy, countBy, grouppBy, groupOBy, countOBy } = require('./halib.js');
const { id, toUpper, len, equal, equalBy } = require('./halib.js');




describe('the "By" operations:', () => {
    const age = p => p.age;
    const equalId = equalBy(id);
    const equalAge = equalBy(age);
    const myEqId = (a, b) => a === b;
    const myEqAge = (a, b) => a.age === b.age;

    describe('nubBy', () => {
        it('analogous to nub, with user supplied equality', () => {
            expect(nubBy(equal)([1,1,2,2])).toEqual([1,2]);
            expect(nubBy(equal)('aabb')).toEqual('ab');
            expect(nubBy(equalId)([1,1,2,2])).toEqual([1,2]);
            expect(nubBy(equalId)('aabb')).toEqual('ab');
            expect(nubBy(myEqId)([1,1,2,2])).toEqual([1,2]);
            expect(nubBy(myEqId)('aabb')).toEqual('ab');
            expect(nubBy(id)([1,1,2,2])).toEqual([1,2]);
            expect(nubBy(id)('aabb')).toEqual('ab');
        });
        
        it('with objects', () => {
            const personsWhole = [{age:3,id:1},{age:3,id:1},{age:3,id:1}];
            const personsAge = [{age:3,id:1},{age:3,id:2},{age:3,id:3}];
            expect(nubBy(equal)(personsWhole)).toEqual([{age:3,id:1}]);
            expect(nubBy(equalAge)(personsAge)).toEqual([{age:3,id:1}]);
            expect(nubBy(myEqAge)(personsAge)).toEqual([{age:3,id:1}]);
            expect(nubBy(age)(personsAge)).toEqual([{age:3,id:1}]);
        });
        
        it('returns an empty list when given an empty list', () => {
            expect(nubBy(equal)([])).toEqual([]);
            expect(nubBy(equal)('')).toEqual('');
            expect(nubBy(id)([])).toEqual([]);
            expect(nubBy(id)('')).toEqual('');
        });
    });
    
    describe('minusBy', () => {
        it('analogous to minus, with user supplied equality', () => {
            expect(minusBy(equal)([1,1,2,2])([2,3])).toEqual([1,1,2]);
            expect(minusBy(equal)('aabb')('bc')).toEqual('aab');
            expect(minusBy(equalId)([1,1,2,2])([2,3])).toEqual([1,1,2]);
            expect(minusBy(equalId)('aabb')('bc')).toEqual('aab');
            expect(minusBy(myEqId)([1,1,2,2])([2,3])).toEqual([1,1,2]);
            expect(minusBy(myEqId)('aabb')('bc')).toEqual('aab');
            expect(minusBy(id)([1,1,2,2])([2,3])).toEqual([1,1,2]);
            expect(minusBy(id)('aabb')('bc')).toEqual('aab');
        });
        
        it('with objects', () => {
            const personsWhole1 = [{age:1,id:1},{age:1,id:1},{age:2,id:1},{age:2,id:1}];
            const personsWhole2 = [{age:2,id:1}];
            const resWhole = [{age:1,id:1},{age:1,id:1},{age:2,id:1}];
            const personsAge1 = [{age:1,id:1},{age:1,id:2},{age:2,id:1},{age:2,id:2}];
            const personsAge2 = [{age:2,id:1}];
            const resAge = [{age:1,id:1},{age:1,id:2},{age:2,id:2}];
            expect(minusBy(equal)(personsWhole1)(personsWhole2)).toEqual(resWhole);
            expect(minusBy(equalAge)(personsAge1)(personsAge2)).toEqual(resAge);
            expect(minusBy(myEqAge)(personsAge1)(personsAge2)).toEqual(resAge);
            expect(minusBy(age)(personsAge1)(personsAge2)).toEqual(resAge);
        });
        
        it('any or both list-arg can be empty list', () => {
            expect(minusBy(equal)([1,1,2,2])([])).toEqual([1,1,2,2]);
            expect(minusBy(equal)([])([2,3])).toEqual([]);
            expect(minusBy(equal)([])([])).toEqual([]);
            expect(minusBy(equal)('aabb')('')).toEqual('aabb');
            expect(minusBy(equal)('')('bc')).toEqual('');
            expect(minusBy(equal)('')('')).toEqual('');
            expect(minusBy(id)([1,1,2,2])([])).toEqual([1,1,2,2]);
            expect(minusBy(id)([])([2,3])).toEqual([]);
            expect(minusBy(id)([])([])).toEqual([]);
            expect(minusBy(id)('aabb')('')).toEqual('aabb');
            expect(minusBy(id)('')('bc')).toEqual('');
            expect(minusBy(id)('')('')).toEqual('');
        });
    });
    
    describe('deleteAllBy', () => {
        it('analogous to deleteAll, with user supplied equality', () => {
            expect(deleteAllBy(equal)([2,3])([1,1,2,2])).toEqual([1,1]);
            expect(deleteAllBy(equal)('bc')('aabb')).toEqual('aa');
            expect(deleteAllBy(equalId)([2,3])([1,1,2,2])).toEqual([1,1]);
            expect(deleteAllBy(equalId)('bc')('aabb')).toEqual('aa');
            expect(deleteAllBy(myEqId)([2,3])([1,1,2,2])).toEqual([1,1]);
            expect(deleteAllBy(myEqId)('bc')('aabb')).toEqual('aa');
            expect(deleteAllBy(id)([2,3])([1,1,2,2])).toEqual([1,1]);
            expect(deleteAllBy(id)('bc')('aabb')).toEqual('aa');
        });
        
        it('with objects', () => {
            const personsWhole1 = [{age:1,id:1},{age:1,id:1},{age:2,id:1},{age:2,id:1}];
            const personsWhole2 = [{age:2,id:1}];
            const resWhole = [{age:1,id:1},{age:1,id:1}];
            const personsAge1 = [{age:1,id:1},{age:1,id:2},{age:2,id:1},{age:2,id:2}];
            const personsAge2 = [{age:2,id:1}];
            const resAge = [{age:1,id:1},{age:1,id:2}];
            expect(deleteAllBy(equal)(personsWhole2)(personsWhole1)).toEqual(resWhole);
            expect(deleteAllBy(equalAge)(personsAge2)(personsAge1)).toEqual(resAge);
            expect(deleteAllBy(myEqAge)(personsAge2)(personsAge1)).toEqual(resAge);
            expect(deleteAllBy(age)(personsAge2)(personsAge1)).toEqual(resAge);
        });
        
        it('any or both list-arg can be empty list', () => {
            expect(deleteAllBy(equal)([])([1,1,2,2])).toEqual([1,1,2,2]);
            expect(deleteAllBy(equal)([2,3])([])).toEqual([]);
            expect(deleteAllBy(equal)([])([])).toEqual([]);
            expect(deleteAllBy(equal)('')('aabb')).toEqual('aabb');
            expect(deleteAllBy(equal)('bc')('')).toEqual('');
            expect(deleteAllBy(equal)('')('')).toEqual('');
            expect(deleteAllBy(id)([])([1,1,2,2])).toEqual([1,1,2,2]);
            expect(deleteAllBy(id)([2,3])([])).toEqual([]);
            expect(deleteAllBy(id)([])([])).toEqual([]);
            expect(deleteAllBy(id)('')('aabb')).toEqual('aabb');
            expect(deleteAllBy(id)('bc')('')).toEqual('');
            expect(deleteAllBy(id)('')('')).toEqual('');
        });
    });

    describe('keepAllBy', () => {
        it('analogous to keepAll, with user supplied equality', () => {
            expect(keepAllBy(equal)([2,3])([1,1,2,2])).toEqual([2,2]);
            expect(keepAllBy(equal)('bc')('aabb')).toEqual('bb');
            expect(keepAllBy(equalId)([2,3])([1,1,2,2])).toEqual([2,2]);
            expect(keepAllBy(equalId)('bc')('aabb')).toEqual('bb');
            expect(keepAllBy(myEqId)([2,3])([1,1,2,2])).toEqual([2,2]);
            expect(keepAllBy(myEqId)('bc')('aabb')).toEqual('bb');
            expect(keepAllBy(id)([2,3])([1,1,2,2])).toEqual([2,2]);
            expect(keepAllBy(id)('bc')('aabb')).toEqual('bb');
        });
        
        it('with objects', () => {
            const personsWhole1 = [{age:1,id:1},{age:1,id:1},{age:2,id:1},{age:2,id:1}];
            const personsWhole2 = [{age:2,id:1}];
            const resWhole = [{age:2,id:1},{age:2,id:1}];
            const personsAge1 = [{age:1,id:1},{age:1,id:2},{age:2,id:1},{age:2,id:2}];
            const personsAge2 = [{age:2,id:1}];
            const resAge = [{age:2,id:1},{age:2,id:2}];
            expect(keepAllBy(equal)(personsWhole2)(personsWhole1)).toEqual(resWhole);
            expect(keepAllBy(equalAge)(personsAge2)(personsAge1)).toEqual(resAge);
            expect(keepAllBy(myEqAge)(personsAge2)(personsAge1)).toEqual(resAge);
            expect(keepAllBy(age)(personsAge2)(personsAge1)).toEqual(resAge);
        });
        
        it('any or both list-arg can be empty list', () => {
            expect(keepAllBy(equal)([])([1,1,2,2])).toEqual([]);
            expect(keepAllBy(equal)([2,3])([])).toEqual([]);
            expect(keepAllBy(equal)([])([])).toEqual([]);
            expect(keepAllBy(equal)('')('aabb')).toEqual('');
            expect(keepAllBy(equal)('bc')('')).toEqual('');
            expect(keepAllBy(equal)('')('')).toEqual('');
            expect(keepAllBy(id)([])([1,1,2,2])).toEqual([]);
            expect(keepAllBy(id)([2,3])([])).toEqual([]);
            expect(keepAllBy(id)([])([])).toEqual([]);
            expect(keepAllBy(id)('')('aabb')).toEqual('');
            expect(keepAllBy(id)('bc')('')).toEqual('');
            expect(keepAllBy(id)('')('')).toEqual('');
        });
    });

    describe('intersectBy', () => {
        it('analogous to intersect, with user supplied equality', () => {
            expect(intersectBy(equal)([1,1,2,2])([2,3])).toEqual([2]);
            expect(intersectBy(equal)('aabb')('bc')).toEqual('b');
            expect(intersectBy(equalId)([1,1,2,2])([2,3])).toEqual([2]);
            expect(intersectBy(equalId)('aabb')('bc')).toEqual('b');
            expect(intersectBy(myEqId)([1,1,2,2])([2,3])).toEqual([2]);
            expect(intersectBy(myEqId)('aabb')('bc')).toEqual('b');
            expect(intersectBy(id)([1,1,2,2])([2,3])).toEqual([2]);
            expect(intersectBy(id)('aabb')('bc')).toEqual('b');
        });
        
        it('with objects', () => {
            const personsWhole1 = [{age:1,id:1},{age:1,id:1},{age:2,id:1},{age:2,id:1}];
            const personsWhole2 = [{age:2,id:1}];
            const resWhole = [{age:2,id:1}];
            const personsAge1 = [{age:1,id:1},{age:1,id:2},{age:2,id:1},{age:2,id:2}];
            const personsAge2 = [{age:2,id:1}];
            const resAge = [{age:2,id:1}];
            expect(intersectBy(equal)(personsWhole1)(personsWhole2)).toEqual(resWhole);
            expect(intersectBy(equalAge)(personsAge1)(personsAge2)).toEqual(resAge);
            expect(intersectBy(myEqAge)(personsAge1)(personsAge2)).toEqual(resAge);
            expect(intersectBy(age)(personsAge1)(personsAge2)).toEqual(resAge);
        });
        
        it('any or both list-arg can be empty list', () => {
            expect(intersectBy(equal)([1,1,2,2])([])).toEqual([]);
            expect(intersectBy(equal)([])([2,3])).toEqual([]);
            expect(intersectBy(equal)([])([])).toEqual([]);
            expect(intersectBy(equal)('aabb')('')).toEqual('');
            expect(intersectBy(equal)('')('bc')).toEqual('');
            expect(intersectBy(equal)('')('')).toEqual('');
            expect(intersectBy(id)([1,1,2,2])([])).toEqual([]);
            expect(intersectBy(id)([])([2,3])).toEqual([]);
            expect(intersectBy(id)([])([])).toEqual([]);
            expect(intersectBy(id)('aabb')('')).toEqual('');
            expect(intersectBy(id)('')('bc')).toEqual('');
            expect(intersectBy(id)('')('')).toEqual('');
        });
    });
    
    describe('differenceBy', () => {
        it('analogous to difference, with user supplied equality', () => {
            expect(differenceBy(equal)([1,1,2,2])([2,3])).toEqual([1]);
            expect(differenceBy(equal)('aabb')('bc')).toEqual('a');
            expect(differenceBy(equalId)([1,1,2,2])([2,3])).toEqual([1]);
            expect(differenceBy(equalId)('aabb')('bc')).toEqual('a');
            expect(differenceBy(myEqId)([1,1,2,2])([2,3])).toEqual([1]);
            expect(differenceBy(myEqId)('aabb')('bc')).toEqual('a');
            expect(differenceBy(id)([1,1,2,2])([2,3])).toEqual([1]);
            expect(differenceBy(id)('aabb')('bc')).toEqual('a');
        });
        
        it('with objects', () => {
            const personsWhole1 = [{age:1,id:1},{age:1,id:1},{age:2,id:1},{age:2,id:1}];
            const personsWhole2 = [{age:2,id:1}];
            const resWhole = [{age:1,id:1}];
            const personsAge1 = [{age:1,id:1},{age:1,id:2},{age:2,id:1},{age:2,id:2}];
            const personsAge2 = [{age:2,id:1}];
            const resAge = [{age:1,id:1}];
            expect(differenceBy(equal)(personsWhole1)(personsWhole2)).toEqual(resWhole);
            expect(differenceBy(equalAge)(personsAge1)(personsAge2)).toEqual(resAge);
            expect(differenceBy(myEqAge)(personsAge1)(personsAge2)).toEqual(resAge);
            expect(differenceBy(age)(personsAge1)(personsAge2)).toEqual(resAge);
        });
        
        it('any or both list-arg can be empty list', () => {
            expect(differenceBy(equal)([1,1,2,2])([])).toEqual([1,2]);
            expect(differenceBy(equal)([])([2,3])).toEqual([]);
            expect(differenceBy(equal)([])([])).toEqual([]);
            expect(differenceBy(equal)('aabb')('')).toEqual('ab');
            expect(differenceBy(equal)('')('bc')).toEqual('');
            expect(differenceBy(equal)('')('')).toEqual('');
            expect(differenceBy(id)([1,1,2,2])([])).toEqual([1,2]);
            expect(differenceBy(id)([])([2,3])).toEqual([]);
            expect(differenceBy(id)([])([])).toEqual([]);
            expect(differenceBy(id)('aabb')('')).toEqual('ab');
            expect(differenceBy(id)('')('bc')).toEqual('');
            expect(differenceBy(id)('')('')).toEqual('');
        });
    });
    
    describe('unionBy', () => {
        it('analogous to union, with user supplied equality', () => {
            expect(unionBy(equal)([1,1,2,2])([2,3])).toEqual([1,2,3]);
            expect(unionBy(equal)('aabb')('bc')).toEqual('abc');
            expect(unionBy(equalId)([1,1,2,2])([2,3])).toEqual([1,2,3]);
            expect(unionBy(equalId)('aabb')('bc')).toEqual('abc');
            expect(unionBy(myEqId)([1,1,2,2])([2,3])).toEqual([1,2,3]);
            expect(unionBy(myEqId)('aabb')('bc')).toEqual('abc');
            expect(unionBy(id)([1,1,2,2])([2,3])).toEqual([1,2,3]);
            expect(unionBy(id)('aabb')('bc')).toEqual('abc');
        });
        
        it('with objects', () => {
            const personsWhole1 = [{age:1,id:1},{age:1,id:1},{age:2,id:1},{age:2,id:1}];
            const personsWhole2 = [{age:2,id:1},{age:3,id:1}];
            const resWhole = [{age:1,id:1},{age:2,id:1},{age:3,id:1}];
            const personsAge1 = [{age:1,id:1},{age:1,id:2},{age:2,id:1},{age:2,id:2}];
            const personsAge2 = [{age:2,id:1},{age:3,id:1}];
            const resAge = [{age:1,id:1},{age:2,id:1},{age:3,id:1}];
            expect(unionBy(equal)(personsWhole1)(personsWhole2)).toEqual(resWhole);
            expect(unionBy(equalAge)(personsAge1)(personsAge2)).toEqual(resAge);
            expect(unionBy(myEqAge)(personsAge1)(personsAge2)).toEqual(resAge);
            expect(unionBy(age)(personsAge1)(personsAge2)).toEqual(resAge);
        });
        
        it('any or both list-arg can be empty list', () => {
            expect(unionBy(equal)([1,1,2,2])([])).toEqual([1,2]);
            expect(unionBy(equal)([])([2,3])).toEqual([2,3]);
            expect(unionBy(equal)([])([])).toEqual([]);
            expect(unionBy(equal)('aabb')('')).toEqual('ab');
            expect(unionBy(equal)('')('bc')).toEqual('bc');
            expect(unionBy(equal)('')('')).toEqual('');
            expect(unionBy(id)([1,1,2,2])([])).toEqual([1,2]);
            expect(unionBy(id)([])([2,3])).toEqual([2,3]);
            expect(unionBy(id)([])([])).toEqual([]);
            expect(unionBy(id)('aabb')('')).toEqual('ab');
            expect(unionBy(id)('')('bc')).toEqual('bc');
            expect(unionBy(id)('')('')).toEqual('');
        });
    });

    describe('uniqBy', () => {
        it('returns true if the given list is uniq', () => {
            expect(uniqBy (equal) ([1,2,5,3])).toEqual(true);
            expect(uniqBy (equal) ('abcb')).toEqual(false);
            expect(uniqBy (equalId) ([1,2,5,3])).toEqual(true);
            expect(uniqBy (equalId) ('abcb')).toEqual(false);
            expect(uniqBy (myEqId) ([1,2,5,3])).toEqual(true);
            expect(uniqBy (myEqId) ('abcb')).toEqual(false);
            expect(uniqBy (id) ([1,2,5,3])).toEqual(true);
            expect(uniqBy (id) ('abcb')).toEqual(false);
        });

        it('with objects', () => {
            let personsWhole = [{age:1,id:1},{age:2,id:1},{age:3,id:1}];
            let personsAge = [{age:1,id:1},{age:2,id:2},{age:3,id:3}];
            expect(uniqBy(equal)(personsWhole)).toEqual(true);
            expect(uniqBy(equalAge)(personsAge)).toEqual(true);
            expect(uniqBy(myEqAge)(personsAge)).toEqual(true);
            expect(uniqBy(age)(personsAge)).toEqual(true);

            personsWhole = [{age:3,id:1},{age:3,id:1},{age:3,id:1}];
            personsAge = [{age:3,id:1},{age:3,id:2},{age:3,id:3}];
            expect(uniqBy(equal)(personsWhole)).toEqual(false);
            expect(uniqBy(equalAge)(personsAge)).toEqual(false);
            expect(uniqBy(myEqAge)(personsAge)).toEqual(false);
            expect(uniqBy(age)(personsAge)).toEqual(false);
        });
        
        it('returns true if given an empty list', () => {
            expect(uniqBy(equal) ([])).toEqual(true);
            expect(uniqBy(equal) ('')).toEqual(true);
            expect(uniqBy(id) ([])).toEqual(true);
            expect(uniqBy(id) ('')).toEqual(true);
        });
    });

    describe('elemBy', () => {
        it('analogous to elem but uses fn to check equality', () => {
            expect(elemBy(equal)(2)([2,3])).toEqual(true);
            expect(elemBy(equal)('a')('bc')).toEqual(false);
            expect(elemBy(equalId)(2)([2,3])).toEqual(true);
            expect(elemBy(equalId)('a')('bc')).toEqual(false);
            expect(elemBy(myEqId)(2)([2,3])).toEqual(true);
            expect(elemBy(myEqId)('a')('bc')).toEqual(false);
            expect(elemBy(id)(2)([2,3])).toEqual(true);
            expect(elemBy(id)('a')('bc')).toEqual(false);
        });
        
        it('with objects', () => {
            let personsWhole = [{age:1,id:1},{age:1,id:1},{age:2,id:1},{age:2,id:1}];
            let personsAge = [{age:1,id:1},{age:1,id:2},{age:2,id:1},{age:2,id:2}];
            expect(elemBy(equal)({age:1,id:1})(personsWhole)).toEqual(true);
            expect(elemBy(equalAge)({age:1,id:3})(personsAge)).toEqual(true);
            expect(elemBy(myEqAge)({age:1,id:3})(personsAge)).toEqual(true);
            expect(elemBy(age)({age:1,id:3})(personsAge)).toEqual(true);

            personsWhole = [{age:1,id:1},{age:1,id:1},{age:2,id:1},{age:2,id:1}];
            personsAge = [{age:1,id:1},{age:1,id:2},{age:2,id:1},{age:2,id:2}];
            expect(elemBy(equal)({age:1,id:2})(personsWhole)).toEqual(false);
            expect(elemBy(equalAge)({age:3,id:1})(personsAge)).toEqual(false);
            expect(elemBy(myEqAge)({age:3,id:1})(personsAge)).toEqual(false);
            expect(elemBy(age)({age:3,id:1})(personsAge)).toEqual(false);
        });
        
        it('any or both list-arg can be empty list', () => {
            expect(elemBy(equal)(1)([])).toEqual(false);
            expect(elemBy(equal)('')('bc')).toEqual(false);
            expect(elemBy(equal)('')('')).toEqual(false);
            expect(elemBy(id)(1)([])).toEqual(false);
            expect(elemBy(id)('')('bc')).toEqual(false);
            expect(elemBy(id)('')('')).toEqual(false);
        });
    });

    describe('groupBy', () => {
        it('applies the given function to the elements of the given array/string and' +
           'returns the results and the elements belonging to it wrapped in an array', () => {    
            expect(groupBy (equal) ([1,2,2,1])).toEqual([[1,1],[2,2]]);
            expect(groupBy (equal) ('abba')).toEqual(['aa','bb']);
            expect(groupBy (equalId) ([1,2,2,1])).toEqual([[1,1],[2,2]]);
            expect(groupBy (equalId) ('abba')).toEqual(['aa','bb']);
            expect(groupBy (myEqId) ([1,2,2,1])).toEqual([[1,1],[2,2]]);
            expect(groupBy (myEqId) ('abba')).toEqual(['aa','bb']);
            expect(groupBy (id) ([1,2,2,1])).toEqual([[1,1],[2,2]]);
            expect(groupBy (id) ('abba')).toEqual(['aa','bb']);
        });

        it('with objects', () => {
            const personsWhole = [{age:1,id:1},{age:2,id:2},{age:2,id:2},{age:1,id:1}];
            const resWhole = [[{age:1,id:1},{age:1,id:1}],[{age:2,id:2},{age:2,id:2}]];
            const personsAge = [{age:1,id:1},{age:2,id:1},{age:2,id:2},{age:1,id:2}];
            const resAge = [[{age:1,id:1},{age:1,id:2}],[{age:2,id:1},{age:2,id:2}]]
            expect(groupBy(equal)(personsWhole)).toEqual(resWhole);
            expect(groupBy(equalAge)(personsAge)).toEqual(resAge);
            expect(groupBy(myEqAge)(personsAge)).toEqual(resAge);
            expect(groupBy(age)(personsAge)).toEqual(resAge);
        });
    
        it('returns an empty array given an empty list', () => {
            expect(groupBy (equal)([])).toEqual([]);
            expect(groupBy (equal) ('')).toEqual([]);
            expect(groupBy (id)([])).toEqual([]);
            expect(groupBy (id) ('')).toEqual([]);
        });
    });
    
    describe('countBy', () => {
        it('applies the given function to the elements of the given list and' +
           'returns the results and the number of occurences belonging to it wrapped in an array', () => {
            expect(countBy (equal) ([1,2,2,1])).toEqual([[1,2],[2,2]]);
            expect(countBy (equal) ('abba')).toEqual([['a',2],['b',2]]);
            expect(countBy (equalId) ([1,2,2,1])).toEqual([[1,2],[2,2]]);
            expect(countBy (equalId) ('abba')).toEqual([['a',2],['b',2]]);
            expect(countBy (myEqId) ([1,2,2,1])).toEqual([[1,2],[2,2]]);
            expect(countBy (myEqId) ('abba')).toEqual([['a',2],['b',2]]);
            expect(countBy (id) ([1,2,2,1])).toEqual([[1,2],[2,2]]);
            expect(countBy (id) ('abba')).toEqual([['a',2],['b',2]]);
        });

        it('with objects', () => {
            const personsWhole = [{age:1,id:1},{age:2,id:2},{age:2,id:2},{age:1,id:1}];
            const resWhole = [[{age:1,id:1},2],[{age:2,id:2},2]];
            const personsAge = [{age:1,id:1},{age:2,id:1},{age:2,id:2},{age:1,id:2}];
            const resAge = [[{age:1,id:1},2],[{age:2,id:1},2]];
            expect(countBy(equal)(personsWhole)).toEqual(resWhole);
            expect(countBy(equalAge)(personsAge)).toEqual(resAge);
            expect(countBy(myEqAge)(personsAge)).toEqual(resAge);
            expect(countBy(age)(personsAge)).toEqual([[1,2],[2,2]]);
        });
    
        it('returns an empty array given an empty list', () => {
            expect(countBy (equal)([])).toEqual([]);
            expect(countBy (equal) ('')).toEqual([]);
            expect(countBy (id)([])).toEqual([]);
            expect(countBy (id) ('')).toEqual([]);
        });
    });

    describe('grouppBy', () => {
        it('applies the given function to the elements of the given array/string and' +
           'returns the results and the elements belonging to it wrapped in an array', () => {
            const res1 = [[1,[-1,1,1]],[2,[2,-2,2]]];
            const res2 = [['A','aAaaA'],['B','Bbb'],['C','ccC']];
            const res3 = [['A',['a','A','a','a','A']],['B',['B','b','b']],['C',['c','c','C']]];
            const res4 = [[2,[[1,2],[2,3],[3,4]]],[3,[[1,2,3],[4,5,6],[7,8,9]]],[1,[[1],[2],[3]]]];

            expect(grouppBy (Math.abs) ([-1,2,1,1,-2,2])).toEqual(res1);
            expect(grouppBy (toUpper) ('aAaBbbccCaA')).toEqual(res2);
            expect(grouppBy (toUpper) (['a','A','a','B','b','b','c','c','C','a','A'])).toEqual(res3);
            expect(grouppBy (len) ([[1,2],[1,2,3],[1],[2,3],[3,4],[4,5,6],[7,8,9],[2],[3]])).toEqual(res4);
        });

        it('returns an empty array given an empty list', () => {
            expect(grouppBy (Math.abs)([])).toEqual([]);
            expect(grouppBy (toUpper) ('')).toEqual([]);
        });
    });

    describe('groupOBy', () => {
        it('applies the given function to the elements of the given array/string and' +
           'returns the results and the elements belonging to it wrapped in an object', () => {
            const res1 = {1:[-1,1,1],2:[2,-2,2]};
            const res2 = {'A':'aAaaA','B':'Bbb','C':'ccC'};
            const res3 = {'A':['a','A','a','a','A'],'B':['B','b','b'],'C':['c','c','C']};
            const res4 = {2:[[1,2],[2,3],[3,4]],3:[[1,2,3],[4,5,6],[7,8,9]],1:[[1],[2],[3]]};

            expect(groupOBy (Math.abs) ([-1,2,1,1,-2,2])).toEqual(res1);
            expect(groupOBy (toUpper) ('aAaBbbccCaA')).toEqual(res2);
            expect(groupOBy (toUpper) (['a','A','a','B','b','b','c','c','C','a','A'])).toEqual(res3);
            expect(groupOBy (len) ([[1,2],[1,2,3],[1],[2,3],[3,4],[4,5,6],[7,8,9],[2],[3]])).toEqual(res4);
        });

        it('returns an empty object given an empty list', () => {
            expect(groupOBy (Math.abs)([])).toEqual({});
            expect(groupOBy (toUpper) ('')).toEqual({});
        });
    });
    
    describe('countOBy', () => {
        it('applies the given function to the elements of the given list and' +
           'returns the results and the number of occurences belonging to it wrapped in an onject', () => {
            expect(countOBy (id) ([1,2,2,1])).toEqual({1:2,2:2});
            expect(countOBy (id) ('abba')).toEqual({'a':2,'b':2});
        });
    
        it('returns an empty object given an empty list', () => {
            expect(countOBy (id)([])).toEqual({});
            expect(countOBy (id) ('')).toEqual({});
        });
    });

});